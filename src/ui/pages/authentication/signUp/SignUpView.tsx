import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  heightPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import styles from './SignUpStyle';
import icons from '../../../constants/icons';
import colors from '../../../constants/colors';
import SelectOption from '../../../components/select/SelectOptions/SelectOption';
import {useState} from 'react';
import Input from '../../../components/inputs/input/input';
import InputPassword from '../../../components/inputs/inputPassword/inputPassword';
import InputPhone from '../../../components/inputs/inputPhone/inputPhone';
import Button from '../../../components/button/button';
import {Routes} from '../../../routes/Router';
import useSignUpView from './useSignUpView';
import SignUpForm from './signUpForm/SignUpForm';
import useNavigate from '../../../Global/hooks/useNavigation';

// @ts-ignore
const SignUpView = ({navigation}) => {
  const signUpViewBehavior = useSignUpView();
  const {goBack} = useNavigate();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity onPress={goBack} style={styles.backIcon}>
            <Icon size={wp('10%')} name={icons.back} color={colors.principal} />
          </TouchableOpacity>
          <ScrollView style={{marginTop: wp('5%'), flex: 1}}>
            <SignUpForm signUpViewBehavior={signUpViewBehavior} />
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpView;
