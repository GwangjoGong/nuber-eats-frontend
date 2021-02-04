import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { UserRole } from '../__generated__/globalTypes';
import { Restaurants } from '../pages/client/restaurants';
import { Header } from '../components/header';
import { useMe } from '../hooks/useMe';
import { NotFound } from '../pages/404';
import { ConfirmEmail } from '../pages/user/confirm-email';
import { LOCAL_STORAGE_TOKEN } from '../constants';
import { EditProfile } from '../pages/user/edit-profile';
import { SearchRestaurants } from '../pages/client/search-restaurants';
import { CategoryRestaurants } from '../pages/client/category-restaurants';
import { Restaurant } from '../pages/client/restaurant';

const ClientRoutes = [
  <Route path='/' key={1} exact>
    <Restaurants />
  </Route>,
  <Route path='/confirm' key={2}>
    <ConfirmEmail />
  </Route>,
  <Route path='/edit-profile' key={3}>
    <EditProfile />
  </Route>,
  <Route path='/search' key={4}>
    <SearchRestaurants />
  </Route>,
  <Route path='/category/:slug' key={5}>
    <CategoryRestaurants />
  </Route>,
  <Route path='/restaurant/:id' key={6}>
    <Restaurant />
  </Route>
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();

  if (error) {
    window.localStorage.removeItem(LOCAL_STORAGE_TOKEN);
    window.location.reload();
  }

  if (!data || loading) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <span className='font-medium text-xl tracking-wide'>Loading...</span>
      </div>
    );
  }

  const {
    me: { role }
  } = data;

  return (
    <Router>
      <Header />
      <Switch>
        {role === UserRole.Client && ClientRoutes}

        <Route path=''>
          <NotFound />
        </Route>

        {/* <Redirect to='/' /> */}
      </Switch>
    </Router>
  );
};
