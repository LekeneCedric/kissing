/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {Image, SafeAreaView, Text, View} from 'react-native';
import ButtonView from '../../../components/button/button';
import colors from '../../../constants/colors';
import styles from './WelcomeStyle';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Routes} from '../../../routes/Router';
import SelectComponent from '../../../components/select/SelectComponent/selectComponent';

// @ts-ignore
const WelcomeView = ({navigation}) => {
  const goToLogin = () => {
    // @ts-ignore
    navigation.push(Routes.Auth.login);
  };
  const goToRegister = () => {
    // @ts-ignore
    navigation.push(Routes.Auth.register);
  };
  const handleChangeLanguage = (lang: string) => {
    console.warn(`set ${lang} as current language !`);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../../../assets/logo/logo.png')}
      />
      <Text style={styles.title}>
        Connectez vous ou inscrivez vous pour continuer
      </Text>

      <View style={{marginTop: wp('5%')}} />

      <SelectComponent
        items={[
          {key: '1', value: 'en', label: 'anglais'},
          {key: '2', value: 'fr', label: 'français'},
        ]}
        label={'langue'}
        description={'selection de la langue'}
        notice={'selection de la langue'}
      />
      <ButtonView
        isLoading={false}
        label="Se Connecter"
        handleClick={goToLogin}
        customStyle={{
          textColor: colors.light,
          backgroundColor: colors.principal,
          isOutline: false,
        }}
      />
      <View style={{marginTop: wp('5%')}} />
      <ButtonView
        isLoading={false}
        label="S'inscrire"
        handleClick={goToRegister}
        customStyle={{
          textColor: colors.light,
          backgroundColor: colors.principal,
          isOutline: true,
        }}
      />
    </SafeAreaView>
  );
};

export default WelcomeView;
