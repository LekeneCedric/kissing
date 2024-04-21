import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import iconSize from '../../constants/iconSize';
import {Text, TouchableOpacity, View} from 'react-native';
import fontSizes from '../../constants/font-sizes';
import React from 'react';
import colors from '../../constants/colors';

type props = {
  iconName: string;
  interestName: string;
};
const Interest = ({iconName, interestName}: props) => {
  return (
    <View
      style={{
        width: wp('28%'),
        borderColor: colors.gray,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.5,
        borderRadius: 10,
        margin: wp('1%'),
        padding: wp('1%'),
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
      <Text style={{fontSize: fontSizes.text, color: colors.gray}}>
        {interestName.length > 10
          ? `${interestName.slice(1, 10)}...`
          : interestName}
      </Text>
    </View>
  );
};

export default Interest;
