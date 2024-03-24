/* eslint-disable react/react-in-jsx-scope */
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../constants/colors';
import icons from '../../../constants/icons';
import styles from './SignInStyle';
import InputPhone from '../../../components/inputs/inputPhone/inputPhone';
import {useEffect, useState} from 'react';
import InputPassword from '../../../components/inputs/inputPassword/inputPassword';
import Button from '../../../components/button/button';
import {Routes} from '../../../routes/Router';
import Input from '../../../components/inputs/input/input';
import useSignInView from './useSignInView';
import SignInForm from './signInForm/signInForm';
import useNavigate from '../../../Global/hooks/useNavigation';

// @ts-ignore
const SignInView = () => {
  const {goBack, goTo} = useNavigate();
  const signInViewBehavior = useSignInView();
  const {auth} = signInViewBehavior;
  useEffect(() => {
    // console.log(auth);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity onPress={goBack} style={styles.backIcon}>
            <Icon size={wp('10%')} name={icons.back} color={colors.principal} />
          </TouchableOpacity>
          <Text style={styles.title}> Bon retour ! {auth?.user?.username}</Text>
          <Text style={styles.description}>
            Entrez vos informations de connexion pour vous connecter à votre
            compte
          </Text>
          <View style={{alignItems: 'center'}}>
            <View style={{marginTop: heightPercentageToDP('5%')}} />
            <SignInForm signInViewBehaviours={signInViewBehavior} />
            <View style={{marginTop: heightPercentageToDP('3%')}} />

            <TouchableOpacity
              onPress={() => goTo(Routes.Auth.recoverPasswordEmail)}
            >
              <Text style={styles.forgetPasswordText}>
                Mot de passe oublié?
              </Text>
            </TouchableOpacity>
            <View style={{marginTop: heightPercentageToDP('3%')}} />

            <View style={styles.inlineRow}>
              <Text style={styles.createAccountDescription}>
                Nouveau sur la plateforme ?
              </Text>
              <TouchableOpacity onPress={() => goTo(Routes.Auth.register)}>
                <Text style={styles.createAccountText}>Créer un compte</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignInView;
