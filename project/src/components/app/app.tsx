import {Route, Routes} from 'react-router-dom';
import {AppRoute, SPINNER_COLOR} from '../../const';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import MainScreen from '../../pages/main-screen/main-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import {Review} from '../../types/review';
import { useAppSelector } from '../../hooks';
import { HistoryRouter } from '../history-route/history-route';
import { browserHistory } from '../../browser-history';
import ClipLoader from 'react-spinners/ClipLoader';
import {CSSProperties } from 'react';

const override: CSSProperties = {
  display: 'block',
  margin: 'auto',
};

type AppScreenProps = {
  reviews: Review[];
}

export default function App({reviews}: AppScreenProps): JSX.Element {
  const offers = useAppSelector((state)=>state.filteredOffers);
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);

  if (isOffersDataLoading) {
    return (
      <ClipLoader
        color={SPINNER_COLOR}
        loading={isOffersDataLoading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
      />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Root}
          element = {<MainScreen offers={offers} />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <FavoritesScreen offers={offers}/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Login}
          element = {<LoginScreen />}
        />
        <Route path={AppRoute.Offer}>
          <Route path = ':id' element = {<OfferScreen offers={offers} reviews={reviews}/>} />
        </Route>
        <Route
          path='*'
          element={<NotFoundScreen />}
        />
      </Routes>
    </HistoryRouter>
  );
}
