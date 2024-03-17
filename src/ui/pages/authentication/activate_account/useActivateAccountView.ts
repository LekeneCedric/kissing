import React, {useEffect, useMemo, useState} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../../../app/hook';
import {SendCodeVerificationAsync} from '../../../../features/auth/thunks/activateAccount/sendCodeVerification/SendCodeVerificationAsync';
import {SendCodeVerificationCommand} from '../../../../features/auth/thunks/activateAccount/sendCodeVerification/SendCodeVerificationCommand';
import {ActivateAccountCommand} from '../../../../features/auth/thunks/activateAccount/activateAccount/ActivateAccountCommand';
import {ActivateAccountAsync} from '../../../../features/auth/thunks/activateAccount/activateAccount/ActivateAccountAsync';
import {
  selectAuthLoading,
  selectUser,
} from '../../../../features/auth/thunks/AuthenticationSelectors';
import {LoadingState} from '../../../../shared/enum/LoadingState';
import {useToast} from 'react-native-toast-notifications';

export interface ActivateAccountViewBehaviours {
  digitsContainer: (string | number | null)[][];
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  code: any;
  setCode: React.Dispatch<React.SetStateAction<any>>;
  formatTimerToString: () => string;
  formatCodeToString: () => string;
  onSendVerificationEmail: (data: SendCodeVerificationCommand) => void;
  onActivateAccount: (data: ActivateAccountCommand) => void;
  email: string | undefined;
  isLoading: boolean;
}
export default function useActivateAccountView(): ActivateAccountViewBehaviours {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const email = useAppSelector(selectUser)!.email;
  const toast = useToast();
  const isLoading = useAppSelector(selectAuthLoading) == LoadingState.pending;
  const [timer, setTimer] = useState<number>(0);
  const digitsContainer = useMemo(
    () => [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [null, 0, 'del'],
    ],
    [],
  );
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [code, setCode] = useState<any[]>([null, null, null, null]);
  const formatCodeToString = () => {
    let code_ = '';
    code.map(c => (code_ += c));
    return code_;
  };
  const formatTimerToString = () => {
    let seconds = Math.floor(timer % 60);
    let minutes = Math.floor(timer / 60);

    if (seconds == 0 && minutes == 0) {
      return '';
    }
    return `${minutes < 10 ? `0${minutes}` : `${minutes}`} : ${
      seconds < 10 ? `0${seconds}` : `${seconds}`
    }`;
  };
  useEffect(() => {
    if (timer === 0) {
      navigation.goBack();
    }
    if (timer !== 0) {
      const intervalId = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timer]);
  // Just For debugging
  useEffect(() => {
    console.log(`index : ${currentIndex} code : ${code}`);
  }, [code, currentIndex]);

  const onSendVerificationEmail = async (data: SendCodeVerificationCommand) => {
    const response = await dispatch(SendCodeVerificationAsync(data));
    if (SendCodeVerificationAsync.fulfilled.match(response)) {
      toast.show(
        "Le code a été envoyé avec success a l'adresse " + data.email,
        {
          type: 'success',
          placement: 'top',
          duration: 4000,
          animationType: 'slide-in',
        },
      );
      setTimer(300);
    }
  };

  const onActivateAccount = async (data: ActivateAccountCommand) => {
    console.log(data);
    const response = await dispatch(ActivateAccountAsync(data));
    if (ActivateAccountAsync.fulfilled.match(response)) {
      console.warn('Account has been activated successfully !');
    }
  };
  return {
    digitsContainer: digitsContainer,
    currentIndex: currentIndex,
    setCurrentIndex: setCurrentIndex,
    code: code,
    setCode: setCode,
    formatTimerToString: formatTimerToString,
    formatCodeToString: formatCodeToString,
    onSendVerificationEmail: onSendVerificationEmail,
    onActivateAccount: onActivateAccount,
    email: email,
    isLoading: isLoading,
  };
}
