import React, { Component } from 'react';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { Provider, connect } from 'react-redux'
import { Route, Switch } from 'react-router'
import createHistory from 'history/createBrowserHistory'
import {ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'

import { withManagedEvent } from './Components/helpers'

import {reducer as progressIndicator} from './Components/ProgressIndicator';
import {reducer as createEvent} from './Create/reducers';
import { dates, popup } from './reducers'

import Home from './Home/Home';
import Create from './Create/Create';
import Event from './Event/Event';
import EventManagement from './Event/EventManagement';
import RSVP from './Event/RSVP';
import Results from './Event/Results';

import './App.css';


const composeEnhancers = process.env.NODE_ENV !== 'production' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;

const history = createHistory()
const store = createStore(
  combineReducers({
    routing: routerReducer,
    progressIndicator,
    createEvent,
    dates,
    popup,
  }),   
  composeEnhancers(applyMiddleware(thunk, routerMiddleware(history)))
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <AppContent/>
        </Provider>        
      </div>
    );
  }
}

class AppContent extends Component{
  render(){
    return (
      <ConnectedRouter history={history}>        
        <Switch>
          <Route name="home" exact path="/" component={Home}/>
          <Route name="create" exact path="/create" component={Create}/>
          <Route name="event" exact path="/event" component={Event}/>
          <Route name="event-management" exact path="/event/:id" component={withManagedEvent(EventManagement)}/> 
          <Route name="rsvp" path="/event/:id/rsvp" component={withManagedEvent(RSVP)} />
          <Route name="results" path="/event/:id/results" component={withManagedEvent(Results)} />
        </Switch>        
      </ConnectedRouter>
    )
  }
}
const mapStateToPropsAC = (state,ownProps) =>({    
  location: state.routing.location
})
AppContent = connect(mapStateToPropsAC)(AppContent);

export default App;
