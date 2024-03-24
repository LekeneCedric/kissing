import colors from '../../../constants/colors';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import iconSize from '../../../constants/iconSize';
import fontSizes from '../../../constants/font-sizes';
import React, {useEffect} from 'react';
import {ControllerRenderProps} from 'react-hook-form';
import styles from './interestsSelectStyle';
import {Interest} from '../../../../domain/Interest/Interest';
import {useAppDispatch, useAppSelector} from '../../../../app/hook';
import {selectUserInterests} from '../../../../features/User/UserSelectors';
import {addInterest} from '../../../../features/User/UserSlice';
import {LoadingState} from '../../../../shared/enum/LoadingState';

interface props {
  field: ControllerRenderProps<any, any>;
  errorMessage?: string;
  data: Interest[];
  notice: string;
  loading: LoadingState;
}

const interestsSelect = ({
  data,
  field,
  errorMessage,
  notice,
  loading,
}: props) => {
  const interests = data;
  const dispatch = useAppDispatch();
  const userInterests = useAppSelector(selectUserInterests);
  useEffect(() => {
    field.onChange([]);
  }, []);
  useEffect(() => {
    field.onChange(userInterests);
    //console.log(userInterests);
  }, [userInterests]);
  const selectInterest = (interest: Interest) => {
    dispatch(addInterest({id: interest.id}));
  };
  return (
    <View style={{flexDirection: 'column'}}>
      {loading == LoadingState.pending ? (
        <ActivityIndicator size={iconSize.normal} color={colors.principal} />
      ) : (
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
          }}>
          {interests.length > 0
            ? interests.map(interest => {
                const isSelected = userInterests?.includes(interest.id);
                const backgroundColor = isSelected
                  ? colors.principal
                  : colors.light;
                const borderColor = isSelected ? colors.principal : colors.gray;
                const textColor = isSelected ? colors.light : colors.dark;
                const select = () => {
                  selectInterest(interest);
                };
                return (
                  <TouchableOpacity
                    onPress={select}
                    style={{
                      width: wp('28%'),
                      backgroundColor: backgroundColor,
                      borderColor: borderColor,
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderWidth: 0.5,
                      borderRadius: 10,
                      margin: wp('1%'),
                      padding: wp('1%'),
                    }}>
                    <Icon
                      color={textColor}
                      name={interest.icon_name}
                      size={iconSize.normal}
                    />
                    <Text style={{fontSize: fontSizes.text, color: textColor}}>
                      {interest.name}
                    </Text>
                  </TouchableOpacity>
                );
              })
            : []}
        </View>
      )}
      {errorMessage ? (
        <Text style={[styles.info, {color: colors.red}]}>{errorMessage}</Text>
      ) : (
        <Text style={[styles.info, {color: colors.gray}]} />
      )}
    </View>
  );
};

export default interestsSelect;
