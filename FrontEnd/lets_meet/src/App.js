import React, { Component } from 'react';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { Provider, connect } from 'react-redux'
import { Route, Switch } from 'react-router'
import createHistory from 'history/createBrowserHistory'
import {ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'

import {reducer as progressIndicator} from './Components/ProgressIndicator';

import Home from './Home/Home';
import Create from './Create/Create';


import './App.css';


const composeEnhancers = process.env.NODE_ENV !== 'production' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;

const history = createHistory()
const store = createStore(
  combineReducers({
    routing: routerReducer,
    progressIndicator
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
