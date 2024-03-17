import useNavigate from '../../../../Global/hooks/useNavigation';
import {useEffect} from 'react';
import cameroonCities from '../../../../../shared/constants/cameroonCities';
import {useToast} from 'react-native-toast-notifications';
import {useForm, UseFormReturn} from 'react-hook-form';
import {InputCompleteProfileForm} from '../../../../../infrastructure/validators/form/completeProfile/InputCompleteProfileForm';
import {yupResolver} from '@hookform/resolvers/yup';
import {InputCompleteProfileValidateSchema} from '../../../../../infrastructure/validators/form/completeProfile/InputCompleteProfileValidateSchema';
import {useAppDispatch, useAppSelector} from '../../../../../app/hook';
import {createProfileAsync} from '../../../../../features/User/Thunks/CreateProfile/CreateProfileAsync';
import {GetAllInterestAsync} from '../../../../../features/Interests/thunks/GetAll/GetAllInterestAsync';
import {
  selectInterests,
  selectInterestsLoading,
} from '../../../../../features/Interests/InterestsSelectors';
import {Interest} from '../../../../../domain/Interest/Interest';
import {LoadingState} from '../../../../../shared/enum/LoadingState';
import {
  cleanAuth,
  setProfileIsComplete,
} from '../../../../../features/auth/thunks/AuthenticationSlice';
import {searchTypes} from '../../../../../shared/constants/searchType';
import { CreateProfileCommand } from "../../../../../features/User/Thunks/CreateProfile/CreateProfileCommand.ts";

export interface UseCompleteProfileBehaviour {
  goBack: () => void;
  interests: Interest[];
  cameroonCitiesList: any[];
  searchTypeList: any[];
  form: UseFormReturn<InputCompleteProfileForm>;
  onSubmit: (data: InputCompleteProfileForm) => void;
  interestLoading: LoadingState;
}

const useCompleteProfileView = (): UseCompleteProfileBehaviour => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const navigation = useNavigate();
  const searchTypesList = searchTypes;
  const cameroonCitiesList = cameroonCities;
  const form = useForm<InputCompleteProfileForm>({
    resolver: yupResolver(InputCompleteProfileValidateSchema),
  });
  const onSubmit = async (data: InputCompleteProfileForm) => {
    const dat_: CreateProfileCommand = {
      city: data.city,
      birthday: data.birthday,
      about: data.about,
      sex: data.sex,
      search_type: data.search_type,
      interests: data.interests,
    }
    const response = await dispatch(createProfileAsync(dat_));
    if (createProfileAsync.rejected.match(response)) {
      toast.show(
        'Une erreur est survenue lors du traitement de votre requête, veuillez reessayer !',
        {
          type: 'danger',
          placement: 'top',
          duration: 3000,
          animationType: 'slide-in',
        },
      );
    }
    if (createProfileAsync.fulfilled.match(response)) {
      dispatch(setProfileIsComplete());
    }
  };
  const interestsLoading = useAppSelector(selectInterestsLoading);
  const interests = useAppSelector(selectInterests);
  useEffect(() => {
    dispatch(GetAllInterestAsync());
    console.log('interets', interests);
  }, []);
  return {
    goBack: () => {
      dispatch(cleanAuth());
    },
    interests: interests,
    cameroonCitiesList: cameroonCitiesList,
    searchTypeList: searchTypesList,
    form: form,
    onSubmit: onSubmit,
    interestLoading: interestsLoading,
  };
};

export default useCompleteProfileView;
