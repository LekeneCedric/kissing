import { Image, SafeAreaView, TouchableOpacity, View } from "react-native";
import styles from "./PaymentStyles.tsx";
import Button from "../../../../components/button/button.tsx";
import colors from "../../../../constants/colors.ts";
import InputPaymentMethod from "./Component/InputPaymentMethod/InputPaymentMethod.tsx";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import icons from "../../../../constants/icons.ts";
import { useNavigation, useRoute } from "@react-navigation/native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import React, { useEffect, useState } from "react";
import { PaymentTypeEnum } from "../../../../../domain/Payment/PaymentTypeEnum.ts";
import { useAppDispatch, useAppSelector } from "../../../../../app/hook.ts";
import { useToast } from "react-native-toast-notifications";
import { SubscribeAsync } from "../../../../../features/Subscription/thunks/Subscribe/SubscribeAsync.ts";
import { selectSubscriptionLoading } from "../../../../../features/Subscription/SubscriptionsSelectors.ts";
import { LoadingState } from "../../../../../shared/enum/LoadingState.ts";

const Payment = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const toast = useToast();
  const route = useRoute();
  const paymentLoading = useAppSelector(selectSubscriptionLoading);
  const [paymentType, setPaymentType] = useState<PaymentTypeEnum>(PaymentTypeEnum.ORANGE_MONEY);
  const [subscriptionId, setSubscriptionId] = useState<number>(0);
  const makeSubscription = async() => {
    const response = await dispatch(SubscribeAsync({
      subscription: subscriptionId
    }))

    if(SubscribeAsync.fulfilled.match(response)) {
      toast.show(
        'Payement éffectué avec succès !',
        {
          type: 'success',
          placement: 'top',
          duration: 3000,
          animationType: 'slide-in',
        },
      );
    }
    if (SubscribeAsync.rejected.match(response)) {
      toast.show(
        'Une erreur est survenue lors du traitement de votre payement, veuillez reessayer !',
        {
          type: 'danger',
          placement: 'top',
          duration: 3000,
          animationType: 'slide-in',
        },
      );
    }

  }
  useEffect(() => {
    //@ts-ignore
    const {id} = route.params
    setSubscriptionId(id);
  },[route])
  return (
    <SafeAreaView style={[styles.container]}>
      <View>
        <TouchableOpacity
          onPress={()=>{navigation.goBack();}}
          style={[
            styles.backIcon,
            {
              position: 'absolute',
              borderRadius: 20,
              zIndex: 10000,
              marginTop: 10,
            },
          ]}>
          <Icon size={wp('10%')} name={icons.back} color={colors.principal} />
        </TouchableOpacity>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
        <View style={{flexDirection: 'row', width: '100%', marginBottom: hp('5%'), justifyContent: 'space-evenly'}}>
          <TouchableOpacity
            onPress={() => {
              setPaymentType(PaymentTypeEnum.ORANGE_MONEY)
            }}
            style={{position: 'relative'}}
          >
            <Image
              source={require('../../../../../assets/logo/orange-money.png')}
              style={{width: wp('30%'), height: hp('15%')}}
            />
            <View style={{
              position: 'absolute',
              bottom: 5,
              right: 5,
              width: 20,
              height: 20,
              borderRadius: 100,
              zIndex: 100000,
              borderWidth: 3,
              backgroundColor: colors.light,
              borderColor: paymentType === PaymentTypeEnum.ORANGE_MONEY ? colors.principal : colors.light,
            }} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setPaymentType(PaymentTypeEnum.MTN_MONEY)
            }}
            style={{position: 'relative'}}
          >
            <Image
              source={require('../../../../../assets/logo/mtn-money.png')}
              style={{width: wp('30%'), height: hp('15%')}}
            />
            <View style={{
              position: 'absolute',
              bottom: 5,
              right: 5,
              width: 20,
              height: 20,
              borderRadius: 100,
              zIndex: 100000,
              borderWidth: 3,
              backgroundColor: colors.light,
              borderColor: paymentType === PaymentTypeEnum.MTN_MONEY ? colors.principal : colors.light,
            }} />
          </TouchableOpacity>
        </View>
        <InputPaymentMethod paymentType={paymentType} />
        <View style={{marginTop: 20}}/>
        <Button
          label={'Valider le payment'}
          handleClick={()=>{makeSubscription()}}
          customStyle={{
            isOutline: false,
            backgroundColor: colors.principal,
            textColor: colors.light,
          }}
          isLoading={paymentLoading === LoadingState.pending}
        />
        <Image
          source={require('../../../../../assets/logo/logo.png')}
          style={styles.logo}
        />
      </View>

    </SafeAreaView>
  )
};

export default Payment;
