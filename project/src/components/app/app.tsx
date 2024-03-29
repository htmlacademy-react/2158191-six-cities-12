import {Route, Routes} from 'react-router-dom';
import {AppRoute, SPINNER_COLOR} from '../../const';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import MainScreen from '../../pages/main-screen/main-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import { useAppSelector } from '../../hooks';
import { HistoryRouter } from '../history-route/history-route';
import { browserHistory } from '../../browser-history';
import ClipLoader from 'react-spinners/ClipLoader';
import { CSSProperties } from 'react';
import { getOffersDataLoadingStatus } from '../../store/offers-data/selectors';
import { getCurrentOfferDataLoadingStatus } from '../../store/current-offer-data/selectors';

const override: CSSProperties = {
  display: 'block',
  margin: 'auto',
};

export default function App(): JSX.Element {
  const isOffersDataLoading = useAppSelector(getOffersDataLoadingStatus);
  const isCurrenOfferDataLoading = useAppSelector(getCurrentOfferDataLoadingStatus);

  if (isOffersDataLoading || isCurrenOfferDataLoading) {
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
          element = {<MainScreen />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <FavoritesScreen />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Login}
          element = {<LoginScreen />}
        />
        <Route path={AppRoute.Offer}>
          <Route path = ':id' element = {<OfferScreen />} />
        </Route>
        <Route
          path='*'
          element={<NotFoundScreen />}
        />
      </Routes>
    </HistoryRouter>
  );
}
