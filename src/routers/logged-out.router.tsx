import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { NotFound } from '../pages/404'
import Login from '../pages/login'
import Register from '../pages/register'

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <Login></Login>
        </Route>
        <Route path='/register'>
          <Register />
        </Route>
        <Route path=''>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  )
}
