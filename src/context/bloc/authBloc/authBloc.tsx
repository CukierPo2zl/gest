import { User } from "../../../models/User";
import { Bloc, BlocEvent, BlocState } from "../bloc";
import * as auth from '../../../services';

// Auth events
class AuthenticationEvent extends BlocEvent {}

export class AppStarted extends AuthenticationEvent{}

export class Logout extends AuthenticationEvent{}

export class Login extends AuthenticationEvent{
    public email: string;
    public password: string;

    constructor(email:string, password:string){
        super();
        this.email = email;
        this.password = password;
    }
}



// Auth states
class AuthenticationState extends BlocState {}

export class AuthenticationUninitialized extends AuthenticationState {}

export class AuthenticationUnauthenticated extends AuthenticationState {}

export class AuthenticationLoading extends AuthenticationState {}

export class AuthenticationAuthenticated extends AuthenticationState {
    public user: User;

    public constructor(user:User){
       super();
       this.user = user;
    }
}
// Auth bloc
export class AuthenticationBloc extends Bloc<AuthenticationEvent, AuthenticationState> {

    async *mapEventToState(event: AuthenticationState): AsyncGenerator<AuthenticationState> {
        if (event instanceof AppStarted) {
            const token = await auth.getToken();
            if (token) {
                try {
                    var user = await auth.getCurrentUser();
                    this.currentState = new AuthenticationAuthenticated(user) 
                    yield this.currentState
                } catch (e) {
                    console.log(e);
                }
            }else{
                this.currentState = new AuthenticationUnauthenticated()
                yield this.currentState
            }
        }

        if (event instanceof Login) {
            await auth.login(event.email, event.password);
            try {
                var currentUser = await auth.getCurrentUser();
                this.currentState = new AuthenticationAuthenticated(currentUser) 
            } catch (e) {
                console.log(e);
            }
            yield this.currentState
        }

        if (event instanceof Logout) {
            await auth.logout()
            this.currentState = new AuthenticationUnauthenticated()
            yield this.currentState
        }
      
    }
}