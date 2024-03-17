export const API_BASEURL = 'http://192.168.0.101:8000/api';
export const BASEURL = 'http://192.168.0.101:8000';
export const SOCKET_SERVER_URL = '192.168.0.101:8000';

export const AuthApiRoutes = {
  signUp: '/users/',
  signIn: '/auth/jwt/create/',
  sendCodeVerification: '/users/resend_activation/',
  activateAccount: '/users/activation/',
  recoverPasswordSendEmail: '/users/reset_password/',
  recoverPasswordConfirmation: '/users/reset_password_confirmation/',
};

export const UserApiRoutes = {
  createProfile: '/users/profile/',
  uploadImageProfile: '/users/images/',
  deleteImageProfile: '/users/images/',
  getUserProfile: '/users/profile',
  getRecommandation: '/recommendations',
  getMyUserProfile: '/users/profile/me/',
  uploadProfilePhoto: '/users/profile/upload_profile_photo/',
  updateProfile: '/users/profile',
  block: {
    get: 'users/profile/get_blocked_users/',
    add: 'users/profile/add_blocked_user/',
    remove: 'users/profile/remove_blocked_user/',
  }
};

export const InterestApiRoutes = {
  getAll: '/users/interests/',
};

export const FavorisApiRoutes = {
  add: '/users/profile/add_favorite_user/',
  getAll: '/users/profile/get_favorite_users/',
  remove: '/users/profile/remove_favorite_user/'
};

export const SubscriptionsApiRoutes = {
  getAll: '/subscriptions/all/',
  subscribe: '/subscriptions/'
}