import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute } from '../const';
import { dropToken, saveToken } from '../services/token';
import { saveUserEmail } from '../services/user-email';
import { AuthData } from '../types/auth-data';
import { CommentData } from '../types/comment-data';
import { Offer } from '../types/offer';
import { Review } from '../types/review';
import { AppDispatch, State } from '../types/state';
import { UserData } from '../types/user-data';
import { redirectToRoute } from './action';

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offer[]>(APIRoute.Offers);

    return data;
  },
);

export const fetchFavoriteOffersAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchFavoriteOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offer[]>(APIRoute.FavoriteOffers);

    return data;
  },
);

export const setOfferFavoriteStatusAction = createAsyncThunk<Offer, {
  id: number;
  favoriteStatus: string;
    },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'setOfferFavoriteStatus',
    async({id, favoriteStatus}, {dispatch, extra: api}) => {
      const {data} = await api.post<Offer>(APIRoute.FavoriteOffers + id.toString() + APIRoute.JustSlash + favoriteStatus);
      dispatch(fetchFavoriteOffersAction());

      return data;
    }
  );

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'checkAuth',
  async (_arg, { extra: api}) => {
    await api.get(APIRoute.Login);
  },
);

export const loginAction = createAsyncThunk<string, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Root));
    saveUserEmail(data.email);

    return data.email;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'logout',
  async (_arg, {extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);

export const fetchOfferInfoAction = createAsyncThunk<{offerData: Offer; nearbyOffersData: Offer[]; commentsData: Review[]}, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offerInfoInit',
  async(id, {extra: api}) => {
    const {data: offerData} = await api.get<Offer>(APIRoute.Offers + id);
    const {data: nearbyOffersData} = await api.get<Offer[]>(APIRoute.Offers + id + APIRoute.NearbyOffers);
    const {data: commentsData} = await api.get<Review[]>(APIRoute.Comment + id);

    return {offerData, nearbyOffersData, commentsData};
  },
);

export const sendOfferCommentAction = createAsyncThunk<Review[], {
  id: string;
  commentData: CommentData;
  resetFormData: () => void;
    },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'sendOfferComment',
    async({id, resetFormData, commentData}, {extra: api}) => {
      const {data} = await api.post<Review[]>(APIRoute.Comment + id, commentData);
      resetFormData();

      return data;
    }
    );
