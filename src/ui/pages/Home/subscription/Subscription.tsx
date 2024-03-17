import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './SubScriptionStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import icons from '../../../constants/icons';
import React, {useEffect, useState} from 'react';
import iconSize from '../../../constants/iconSize';
import Package from '../../../components/Package/package';
import fontSizes from '../../../constants/font-sizes';
import colors from '../../../constants/colors';
import { useNavigation } from "@react-navigation/native";
import { useSubscriptionView } from "./useSubscriptionView.ts";

const Subscription = () => {
  const navigation = useNavigation();
  const [showDetails, setShowDetails] = useState(false);
  const {
    subscriptions
  } = useSubscriptionView();
  const activateShowDetails = () => {
    setShowDetails(!showDetails);
  };
  useEffect(() => {
    setTimeout(() => {
      if (showDetails) {
        setShowDetails(false);
      }
    }, 30000);
  }, [showDetails]);
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.title}>Abonnements</Text>
        <TouchableOpacity onPress={activateShowDetails}>
          <Icon
            name={icons.info}
            size={iconSize.normal}
            color={colors.principal}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.titleDescription}>
        Choisissez un abonnement ci-dessous pour accéder à Kissing Pro
      </Text>

      <ScrollView>
        {
          subscriptions.map((subscription, index) => {
            return <Package
              theme={index == 0 ? colors.principal : index == 1 ? colors.primary : colors.green}
              title={subscription.name}
              icon={icons.subscription}
              description={'Forfait journalier valable 24h'}
              price={`${subscription.price} XAF`}
              items={[
                {isCheck: subscription.media_access, value: 'Accès aux médias (photos et vidéos)'},
                {isCheck: true, value: 'Accès aux chats ( discussions )'},
                {value: `Nombre de discussions par jours : ${subscription.max_total_discussions_day}`},
                {isCheck: subscription.block_ads, value: 'Bloquer les annonces'},
              ]}
              action={() => {
                //@ts-ignore
                navigation.navigate('payment', {id: subscription.id})}
            }
            />
          })
        }
      </ScrollView>
      {showDetails && (
        <View style={{width: '100%', padding: 10}}>
          <Text style={{fontSize: fontSizes.description, color: colors.gray}}>
            En souscrivant a l'un des forfaits Kissing Pro , vous bénéficiez de
            tous les avantages liées à la plateforme :
          </Text>
          <Text style={{fontSize: fontSizes.description, fontWeight: 'bold'}}>
            {' '}
            Un maximum de conversations que vous pouvez entamer en un jours
          </Text>
          <Text style={{fontSize: fontSizes.description, fontWeight: 'bold'}}>
            {' '}
            Vous avez accès aux profils les plus populaires de la plateforme
          </Text>
          <Text style={{fontSize: fontSizes.description, fontWeight: 'bold'}}>
            {' '}
            Votre profil est mis en avant et de nombreux utilisateurs viendront
            le visiter
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Subscription;
