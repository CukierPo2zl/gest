import { Container, makeStyles } from '@material-ui/core';
import React from 'react';
import Navigator from '../../components/Navigator';
import Sidebar from '../../components/Sidebar';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Dashboard } from './dashboard/Dashboard';
import { SheetPage } from './sheet/Sheet'
import { CachedSheetsProvider } from '../../context/CachedSheetsContext';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    content: {
      height: '100vh',
      overflow: 'auto',
      width: '100%',
    },
    container: {
      paddingTop: theme.spacing(2),
      width: '100%',
    },
    routes: {
      paddingTop: theme.spacing(4),
      width: '100%',
    }
  }));
  
export const Members = () => {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
  
        <Sidebar />
        <main className={classes.content}>
          <Container maxWidth="lg" className={classes.container}>
            <Navigator></Navigator>
            <div className={classes.routes}>
              <Switch>
                <Route exact path='/dashboard' component={Dashboard} />
                <Route path='/dashboard/:sheetName' component={SheetPage} />
              </Switch>
            </div>
          </Container>
        </main>
      </div>
    );
  }
  
export const Private = () => {
    return (
      <CachedSheetsProvider>
        <Route path='/dashboard' component={Members} />
        <Redirect to='/dashboard' />
      </CachedSheetsProvider>
    )
  }
  
  