import {useAppDispatch, useAppSelector} from '../../../app/hook';
import {
  selectActivatedAccountStatus,
  selectAuth,
  selectProfileIsComplete,
  selectToken,
} from '../../../features/auth/thunks/AuthenticationSelectors';
import {
  AccountActivatedEnum,
  CompleteProfileEnum,
} from '../../../domain/Auth/AuthEnum';
import {useEffect} from 'react';
import {cleanAuth} from '../../../features/auth/thunks/AuthenticationSlice';

export interface AppViewBehaviour {
  accountIsPendingActivation: boolean;
  accountIsNotActivated: boolean;
  profileIsComplete: boolean;
  profileIsPendingComplete: boolean;
  accountIsActivated: boolean;
  isTokenPresent: boolean;
}

const UseAppView = (): AppViewBehaviour => {
  const auth = useAppSelector(selectAuth);
  const selectAccountStatus = useAppSelector(selectActivatedAccountStatus);
  const isCompleteProfile = useAppSelector(selectProfileIsComplete);
  const isTokenPresent = useAppSelector(selectToken) !== undefined;
  const profileIsComplete = isCompleteProfile === CompleteProfileEnum.FURFILLED;
  const profileIsPendingcomplete =
    isCompleteProfile === CompleteProfileEnum.PENDING;
  const accountIsPendingActivation =
    selectAccountStatus == AccountActivatedEnum.PENDING;
  const accountIsNotActivated =
    selectAccountStatus == AccountActivatedEnum.NOT_ACTIVATED ||
    selectAccountStatus == null;
  const accountIsActivated =
    selectAccountStatus == AccountActivatedEnum.ACTIVATED;
  useEffect(() => {
    console.log(
      accountIsNotActivated,
      accountIsPendingActivation,
      profileIsComplete,
    );
  }, []);
  return {
    accountIsPendingActivation: accountIsPendingActivation,
    accountIsNotActivated: accountIsNotActivated,
    profileIsComplete: profileIsComplete,
    profileIsPendingComplete: profileIsPendingcomplete,
    accountIsActivated: accountIsActivated,
    isTokenPresent: isTokenPresent,
  };
};

export default UseAppView;
