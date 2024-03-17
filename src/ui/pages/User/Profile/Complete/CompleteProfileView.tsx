import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './CompleteProfileStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import icons from '../../../../constants/icons';
import colors from '../../../../constants/colors';
import useCompleteProfileView from './useCompleteProfileView';
import SelectOption from '../../../../components/select/SelectOptions/SelectOption';
import InputArea from '../../../../components/inputs/inputArea/inputArea';
import Button from '../../../../components/button/button';
import useUploadImageProfile from './useUploadImageProfile';
import {Controller} from 'react-hook-form';
import InterestsSelect from '../../../../components/select/InterestsSelect/interestsSelect';
import ImagesSelect from '../../../../components/select/ImagesSelect/ImagesSelect';
import InputDate from '../../../../components/inputs/inputDate/inputDate';
import SelectComponent from '../../../../components/select/SelectComponent/selectComponent';
import {LoadingState} from '../../../../../shared/enum/LoadingState';

const CompleteProfileView = () => {
  const {
    goBack,
    interests,
    cameroonCitiesList,
    searchTypeList,
    form,
    interestLoading,
    onSubmit,
  } = useCompleteProfileView();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = form;
  const {images, uploadImages, removeImages, loading} = useUploadImageProfile();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.scroolView}>
          <TouchableOpacity onPress={goBack} style={styles.backIcon}>
            <Icon size={wp('10%')} name={icons.back} color={colors.principal} />
          </TouchableOpacity>
          <Text
            style={[
              styles.title,
              {
                textAlign: 'left',
                alignSelf: 'flex-start',
                marginLeft: wp('2%'),
              },
            ]}>
            Compléter votre profil{' '}
          </Text>
          <View style={{alignItems: 'center', marginTop: 10}}>
            <Controller
              name={'sex'}
              control={control}
              render={({field}) => {
                return (
                  <SelectOption
                    options={[
                      {icon: icons.boy, value: 'boy', label: 'Garçon'},
                      {icon: icons.girl, value: 'girl', label: 'Fille'},
                    ]}
                    label={'Genre'}
                    placeholder={'Orientation'}
                    field={field}
                    errorMessage={errors.sex?.message}
                    notice={'Votre orientation sexuelle'}
                  />
                );
              }}
            />
            <Controller
              name={'about'}
              control={control}
              render={({field}) => {
                return (
                  <InputArea
                    label={'A propos de moi'}
                    placeholder={'Ecrivez ici....'}
                    field={field}
                    errorMessage={errors.about?.message}
                  />
                );
              }}
            />
            <Controller
              name={'birthday'}
              control={control}
              render={({field}) => {
                return (
                  <InputDate
                    field={field}
                    errorMessage={errors.birthday?.message}
                    label={'Date de naissance'}
                    notice={'Votre date de naissance'}
                  />
                );
              }}
            />
            <Controller
              name={'city'}
              control={control}
              render={({field}) => {
                return (
                  <SelectComponent
                    field={field}
                    errorMessage={errors.city?.message}
                    items={cameroonCitiesList}
                    description={'Je réside à'}
                    label={'Ville'}
                    notice={'Votre ville de résidence'}
                  />
                );
              }}
            />

            <View style={{marginTop: wp('2%')}} />
            <Controller
              name={'search_type'}
              control={control}
              render={({field}) => {
                return (
                  <SelectComponent
                    field={field}
                    items={searchTypeList}
                    label={'Ce que je recherche'}
                    description={'Je suis ici pour'}
                    errorMessage={errors.search_type?.message}
                    notice={'Ce que vous recherchez'}
                  />
                );
              }}
            />
          </View>

          <Text style={[styles.sectionTitle, {marginLeft: wp('2%')}]}>
            Ajouter des médias et définissez votre photo de profil
          </Text>
          <View style={{marginTop: wp('2%')}} />
          <View style={{marginTop: wp('2%')}} />
          <Controller
            name={'images'}
            control={control}
            render={({field}) => {
              return (
                <ImagesSelect
                  loading={loading}
                  images={images!}
                  uploadImages={uploadImages}
                  removeImage={removeImages}
                  field={field}
                  errorMessage={errors.images?.message}
                  notice={'Vos différentes photos'}
                />
              );
            }}
          />
          <Text style={[styles.sectionTitle, {marginLeft: wp('2%')}]}>
            Mes intérêts
          </Text>
          <View style={{marginTop: wp('2%')}} />
          <Controller
            name={'interests'}
            control={control}
            render={({field}) => {
              return (
                <InterestsSelect
                  loading={interestLoading}
                  data={interests}
                  field={field}
                  errorMessage={errors.interests?.message}
                  notice={"Vos différents centres d'intérêts"}
                />
              );
            }}
          />
          <View style={{marginTop: hp('4%')}} />
          <View style={{alignItems: 'center'}}>
            <Button
              label={'Terminer'}
              handleClick={handleSubmit(onSubmit)}
              customStyle={{
                isOutline: false,
                backgroundColor: colors.principal,
                textColor: colors.light,
              }}
              isLoading={loading == LoadingState.pending}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CompleteProfileView;
