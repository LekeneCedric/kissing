import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import styles from './DetailsStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import icons from '../../../../../../constants/icons';
import colors from '../../../../../../constants/colors';
import useMyProfileDetails from './useMyProfileDetails.ts';
import iconSize from '../../../../../../constants/iconSize';
import fontSizes from '../../../../../../constants/font-sizes';
import Avatar from '../../../../../../components/avatar/avatar';
import Interest from '../../../../../../components/interest/interest';
import {BASEURL} from '../../../../../../routes/ApiRoutes';
import {LoadingState} from '../../../../../../../shared/enum/LoadingState';
import { useNavigation } from "@react-navigation/native";
import GalerieItem from "../../../../../../components/Galerie/Item/GalerieItem.tsx";
import { images as sharedImages } from "../../../../../../constants/images.ts";
import { SearchType } from "../../../../../../../domain/User/User.ts";
// @ts-ignore
const Details = () => {
  const {
    goBack,
    userDetails,
    favoris_loading,
    in_favoris_list,
    addFavoris,
    navigateToGalerie,
    navigateToRoom,
    removeToFavoris,
    addToBlocked,
    removeToBlocked,
    in_blocked_list,
    blocked_loading,
  } = useMyProfileDetails();

  const name = userDetails?.user?.username;
  const age = userDetails?.user?.age;
  const city = userDetails?.city;
  const about = userDetails?.about;
  const birthDay = userDetails?.birthday;
  const search = userDetails?.search_type;
  const images = userDetails?.images;
  const interests = userDetails?.interests;

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={goBack}
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
        <TouchableOpacity
          style={[
            styles.detailsIcon,
            {
              position: 'absolute',
              borderRadius: 20,
              zIndex: 10000,
              marginTop: 10,
            },
          ]}>
          <Icon
            size={wp('10%')}
            name={icons.details}
            color={colors.principal}
          />
        </TouchableOpacity>
      </View>
      {!userDetails && (
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: hp('30%'),
          }}>
          <ActivityIndicator size={'large'} color={colors.principal} />
          <Text style={{fontSize: fontSizes.sectionTitle, textAlign: 'center'}}>
            Chargement des informations du profil....
          </Text>
        </View>
      )}
      {userDetails && (
        <ScrollView>
          <View style={{position: 'relative', width: '100%'}}>
            <View style={{width: '100%', height: hp('35%')}}>
              <TouchableWithoutFeedback
                onPress={() => {
                  images?.find(i => i.is_main_photo == true) ?
                  navigateToGalerie(images![0]) : null;
                }}>
                <Image
                  style={{width: '100%', height: '100%'}}
                  source={{uri: images?.find(i => i.is_main_photo == true) ? BASEURL + images?.find(i => i.is_main_photo == true)!.image : sharedImages.default_image}}
                />
              </TouchableWithoutFeedback>
            </View>
            <TouchableOpacity
              style={[
                styles.favButton,
                {
                  backgroundColor: in_favoris_list
                    ? colors.principal
                    : colors.light,
                },
              ]}
              onPress={() => {
                if (!in_favoris_list) {
                  addFavoris();
                } else {
                  removeToFavoris();
                }
              }}>
              {favoris_loading === LoadingState.pending ? (
                <ActivityIndicator size={'small'} color={colors.principal} />
              ) : (
                <Icon
                  name={icons.star_outline}
                  size={iconSize.medium}
                  color={in_favoris_list ? colors.light : colors.principal}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={navigateToRoom} style={styles.messageButton}>
              <Icon
                name={icons.message}
                size={iconSize.medium}
                color={colors.principal}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              if (!in_blocked_list) {
                addToBlocked();
              } else {
                removeToBlocked();
              }
            }} style={[styles.blockButton, {backgroundColor: in_blocked_list ? colors.principal : colors.light}]}>
              {
                blocked_loading === LoadingState.pending ? (
                  <ActivityIndicator size={'small'} color={colors.principal} />
                ): (
                  <Icon
                    name={icons.blocked_user}
                    size={iconSize.medium}
                    color={in_blocked_list ? colors.light : colors.principal}
                  />
                )
              }
            </TouchableOpacity>
          </View>
          <View style={{padding: 15}}>
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.username}>
                {name} , {age}
              </Text>
            </View>

            <View style={{flexDirection: 'column', marginTop: hp('2%')}}>
              <Text style={styles.subTitle}>Ville</Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{
                    fontWeight: '600',
                    color: colors.gray,
                    fontSize: fontSizes.text,
                  }}>
                  {city}
                </Text>
                <Text
                  style={{
                    fontWeight: '600',
                    color: colors.gray,
                    fontSize: fontSizes.text,
                  }}>
                  {' '}

                </Text>
              </View>
            </View>

            <View style={{flexDirection: 'column', marginTop: hp('2%')}}>
              <Text style={styles.subTitle}>A Propos</Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{
                    fontWeight: '600',
                    color: colors.gray,
                    fontSize: fontSizes.text,
                  }}>
                  {about}
                </Text>
              </View>
            </View>

            <View style={{flexDirection: 'column', marginTop: hp('2%')}}>
              <Text style={styles.subTitle}>Ce qui l'amène ici</Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{
                    fontWeight: '600',
                    color: colors.gray,
                    fontSize: fontSizes.text,
                  }}>
                  {SearchType.getValue(search!)}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text style={styles.subTitle}>Galerie</Text>
              <TouchableOpacity
                onPress={() => {
                  navigateToGalerie();
                }}
                style={{alignItems: 'center', justifyContent: 'center'}}>
                <Icon
                  name={icons.next}
                  size={iconSize.medium}
                  color={colors.principal}
                />
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'column', marginTop: hp('2%')}}>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-evenly',
                  marginTop: hp('2%'),
                  marginBottom: hp('2%'),
                }}>
                {images!.filter(i => !i.is_main_photo).map((image, index) => {
                  if (index < 4) {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          navigateToGalerie(image);
                        }}>
                        <GalerieItem
                          imageUri={BASEURL + image.image}
                        />
                      </TouchableOpacity>
                    );
                  }
                  if (index == 4) {
                    return <TouchableOpacity
                      onPress={() => {
                          navigateToGalerie();
                      }}
                    >
                      <GalerieItem
                        imageUri={BASEURL + image.image}
                        hide={( images?.length! - 5 ) > 0}
                        plus={images?.length! - 5}
                      />
                    </TouchableOpacity>
                  }
                })}
              </View>
            </View>

            <View style={{flexDirection: 'column', marginTop: hp('2%')}}>
              <Text style={styles.subTitle}>Ses intérets</Text>
              <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {interests!.map(interest => (
                  <Interest
                    iconName={interest.icon_name}
                    interestName={interest.name}
                  />
                ))}
              </View>
            </View>
          </View>
          <Image
            source={require('../../../../../../../assets/logo/logo.png')}
            style={styles.logo}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Details;
