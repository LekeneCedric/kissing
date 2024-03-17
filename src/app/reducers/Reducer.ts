import {combineReducers} from '@reduxjs/toolkit';
import AuthenticationSlice from '../../features/auth/thunks/AuthenticationSlice';
import UserSlice from '../../features/User/UserSlice';
import InterestsSlice from '../../features/Interests/InterestsSlice';
import RecommendationsSlice from '../../features/Recommendations/RecommendationsSlice';
import FavorisSlice from '../../features/Favoris/FavorisSlice';
import SubscriptionSlice  from "../../features/Subscription/SubscriptionSlice.ts";
import MessagesSlice from "../../features/Messages/MessagesSlice.ts";
import BlockedSlice from "../../features/Blocked/BlockedSlice.ts";

export const rootReducer = combineReducers({
  authReducer: AuthenticationSlice,
  userReducer: UserSlice,
  recommendationsReducer: RecommendationsSlice,
  interestsReducer: InterestsSlice,
  favorisReducer: FavorisSlice,
  subscriptionsReducter: SubscriptionSlice,
  messagesReducer: MessagesSlice,
  blockedReducer: BlockedSlice,
});
