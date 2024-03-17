import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from './reducers/Reducer';
import {AuthApiGatewayHttp} from '../infrastructure/auth/gateways/AuthApiGatewayHttp';
import {listenerMiddleware} from './listenerMiddleware';
import {setupListeners} from '@reduxjs/toolkit/query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import {UserApiGatewayHttp} from '../infrastructure/user/gateways/UserApiGatewayHttp';
import {InterestApiGatewayHttp} from '../infrastructure/interest/gateways/InterestApiGatewayHttp';
import {FavorisApiGatewayHttp} from '../infrastructure/Favoris/gateways/FavorisApiGatewayHttp';
import { SubscriptionApiGatewayHttp } from "../infrastructure/Subscription/gateways/SubscriptionApiGatewayHttp.ts";
import { BlockeApiGatewayHttp } from "../infrastructure/Blocked/gateways/BlockeApiGatewayHttp.ts";

const persistConfig = {
  key: 'kis_+',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          authApiGatewayHttp: new AuthApiGatewayHttp(),
          userApiGatewayHttp: new UserApiGatewayHttp(),
          interestsApiGatewayHttp: new InterestApiGatewayHttp(),
          favorisApiGatewayHttp: new FavorisApiGatewayHttp(),
          subscriptionApiGatewayHttp: new SubscriptionApiGatewayHttp(),
          blockedApiGatewayHttp: new BlockeApiGatewayHttp(),
        },
      },
    }).prepend(listenerMiddleware.middleware),
});

const persistor = persistStore(store);

setupListeners(store.dispatch);
export default persistor;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
