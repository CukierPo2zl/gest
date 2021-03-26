import { BehaviorSubject, Observable } from "rxjs";

abstract class BlocState {}

abstract class BlocEvent {}

abstract class Bloc<BlocEvent, BlocState> {
  
  private _events: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private _states: BehaviorSubject<BlocState>;
  protected currentState: BlocState;

  public subject: Observable<BlocState>;
  public initialState: BlocState;

  constructor(initialState: BlocState) {
    this.currentState = this.initialState = initialState;

    this._states = new BehaviorSubject<BlocState>(initialState);
    this.subject = this._states;

    this._events.subscribe((event) => {
      this.dispatchEvent(event);
    });
  }

  private async dispatchEvent(event: BlocEvent) {
    var stateIterator = this.mapEventToState(event);
    for await (let state of stateIterator) {
      this.currentState = state;
      this._states.next(state);
    }
  }

  public async add(event: BlocEvent) {
    this._events.next(event);
  }

  abstract mapEventToState(event: BlocEvent):any;

  public Dispose() {
    this._events.complete();
    this._states.complete();
  }
}

export { BlocState, BlocEvent, Bloc }