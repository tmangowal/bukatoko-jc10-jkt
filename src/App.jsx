import React from 'react'
import {Switch, Route, withRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Login from './components/Login'


class App extends React.Component {
  render(){
    return(
      <div>
        <Switch>
          <Route component={Login} path='/' />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App)