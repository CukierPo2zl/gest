import React, { Suspense, useContext, useEffect } from 'react';
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { red, deepPurple, green } from "@material-ui/core/colors";
import { WizardProvider } from './context/WizardContext';
import { Wizard } from './components/wizard/Wizard';
// import { useAuth } from './context/auth';
import { SplashScreen } from './components/loaders';
import BlocBuilder from './context/bloc/authBloc/blocBuilder';
import { AppStarted, AuthenticationAuthenticated, AuthenticationBloc, AuthenticationUninitialized } from './context/bloc/authBloc/authBloc';
import { AuthenticationContext, BlocProvider } from './context/bloc/authBloc/authBlocContext';
import 'react-datasheet/lib/react-datasheet.css';


const Public = React.lazy(() => import('./pages/landing'));
const Private = React.lazy(() => import('./pages/members'));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: deepPurple[800]
    },
    secondary: {
      main: red[400]
    },
    success: {
      main: green[800]
    }
  }
})

const ProvideAuthBloC = () => {
  // BLOC PATTERN WAY
  const bloc = useContext(AuthenticationContext);

  useEffect(() => {
    bloc.current.add(new AppStarted())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <ThemeProvider theme={theme}>
      <WizardProvider>
        <Wizard />
        <Suspense fallback={<SplashScreen />}>
          <BlocBuilder
            bloc={bloc.current.subject}
            builder={(snapshot) => {

              console.log(snapshot);

              if (snapshot.data instanceof AuthenticationAuthenticated) {
                return (<Private />)
              }
              // if(snapshot.data instanceof AuthenticationLoading){
              //   return (<SplashScreen />)
              // }
              else {
                return (<Public />)
              }
            }}
          />
        </Suspense>
      </WizardProvider>
    </ThemeProvider >
  )
}

function App() {
  var bloc = new AuthenticationBloc(new AuthenticationUninitialized())

  return (
    <BlocProvider bloc={bloc}>
      <ProvideAuthBloC />
    </BlocProvider>
  );
}

// REACT HOOKS WAY

// const { isAuthenticated } = useAuth();
// return (
// <ThemeProvider theme={theme}>
//   <WizardProvider>
//     <Wizard />
//     <Suspense fallback={<SplashScreen/>}>
//       {isAuthenticated ? <Private /> : <Public />}
//     </Suspense>
//   </WizardProvider>
// </ThemeProvider >
// )

export default App;


