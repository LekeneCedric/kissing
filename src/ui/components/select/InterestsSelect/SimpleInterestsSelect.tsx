import {Interest} from '../../../../domain/Interest/Interest';
import {LoadingState} from '../../../../shared/enum/LoadingState';
import {useAppDispatch, useAppSelector} from '../../../../app/hook';
import {selectUserInterests} from '../../../../features/User/UserSelectors';
import React, {useEffect} from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import iconSize from '../../../constants/iconSize';
import colors from '../../../constants/colors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import fontSizes from '../../../constants/font-sizes';
import {selectInterestsLoading} from '../../../../features/Interests/InterestsSelectors';
import {GetAllInterestAsync} from '../../../../features/Interests/thunks/GetAll/GetAllInterestAsync';
import {selectFilterSelectedInterests} from '../../../../features/Recommendations/RecommendationsSelectors';
import {updateInterestsFilter} from '../../../../features/Recommendations/RecommendationsSlice';

interface props {
  data: Interest[];
}

const SimpleInterestsSelect = ({data}: props) => {
  const interests = data;
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectInterestsLoading);
  const filterSelectedInterests = useAppSelector(selectFilterSelectedInterests);

  useEffect(() => {
    dispatch(GetAllInterestAsync);
  }, []);
  return (
    <View style={{flexDirection: 'column'}}>
      <Text
        style={{
          color: colors.principal,
          fontSize: fontSizes.text,
          marginBottom: 5,
        }}>
        {' '}
        Ses centres d'intérêts
      </Text>
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
                const isSelected = filterSelectedInterests?.includes(
                  interest.id,
                );
                const backgroundColor = isSelected
                  ? colors.principal
                  : colors.light;
                const borderColor = isSelected ? colors.principal : colors.gray;
                const textColor = isSelected ? colors.light : colors.dark;
                const select = () => {
                  dispatch(updateInterestsFilter(interest.id));
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
                      justifyContent: 'center'
                    }}>
                    <Text style={{fontSize: fontSizes.text, color: textColor}}>
                      {interest.name}
                    </Text>
                  </TouchableOpacity>
                );
              })
            : []}
        </View>
      )}
    </View>
  );
};
export default SimpleInterestsSelect;
