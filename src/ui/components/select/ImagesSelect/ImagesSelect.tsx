import {
  ActivityIndicator,
  Image as ImageElement,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../../constants/colors';
import Colors from '../../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import icons from '../../../constants/icons';
import iconSize from '../../../constants/iconSize';
import fontSizes from '../../../constants/font-sizes';
import React from 'react';
import {ControllerRenderProps} from 'react-hook-form';
import styles from './ImagesSelectStyles';
import {Image} from '../../../../domain/User/User';
import {LoadingState} from '../../../../shared/enum/LoadingState';

type ImagesSelectProps = {
  images: Image[];
  field: ControllerRenderProps<any, any>;
  errorMessage?: string;
  notice: string;
  uploadImages: () => void;
  removeImage: (index: number) => void;
  loading?: LoadingState;
};
const ImagesSelect = ({
  images,
  field,
  errorMessage,
  notice,
  uploadImages,
  removeImage,
  loading,
}: ImagesSelectProps) => {
  const [firstImage, ...otherImages] = images;
  return (
    <View style={{flexDirection: 'column'}}>
      {errorMessage ? (
        <Text style={[styles.info, {color: colors.red}]}>{errorMessage}</Text>
      ) : (
        <Text style={[styles.info, {color: colors.gray}]}>{notice}</Text>
      )}
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: heightPercentageToDP('25%'),
        }}>
        <View style={{flex: 2.5, height: '100%', justifyContent: 'center'}}>
          {firstImage !== undefined && (
            <View
              style={{
                position: 'relative',
                width: '90%',
                height: '70%',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  removeImage(firstImage.id);
                }}
                style={{
                  position: 'absolute',
                  zIndex: 10000,
                  right: 5,
                  top: 5,
                  borderRadius: 10,
                  backgroundColor: colors.light,
                }}>
                <Icon
                  name={icons.delete}
                  size={iconSize.normal}
                  color={colors.red}
                />
              </TouchableOpacity>
              <ImageElement
                source={{uri: firstImage.image}}
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: colors.light,
                  height: '100%',
                  width: '100%',
                }}
              />
            </View>
          )}
        </View>
        <View
          style={{
            flex: 4,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
          {otherImages.map(image => {
            return (
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: colors.light,
                  height: '40%',
                  width: '40%',
                  marginBottom: '5%',
                  position: 'relative',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    removeImage(image.id);
                  }}
                  style={{
                    position: 'absolute',
                    zIndex: 10000,
                    right: 5,
                    top: 5,
                    borderRadius: 10,
                    backgroundColor: colors.light,
                  }}>
                  <Icon
                    name={icons.delete}
                    size={iconSize.normal}
                    color={colors.red}
                  />
                </TouchableOpacity>
                <ImageElement
                  source={{uri: image.image}}
                  style={{width: '100%', height: '100%', borderRadius: 10}}
                />
              </View>
            );
          })}
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        {images.length < 5 && (
          <TouchableOpacity
            style={{
              backgroundColor: colors.principal,
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: wp('1%'),
              width: '30%',
            }}
            onPress={() => {
              uploadImages();
              field.onChange(images.length);
            }}>
            {loading == LoadingState.pending ? (
              <ActivityIndicator size={iconSize.normal} color={colors.light} />
            ) : (
              <Icon
                name={icons.addCircle}
                color={Colors.light}
                size={iconSize.normal}
              />
            )}

            <Text
              style={{
                color: colors.light,
                marginLeft: wp('2%'),
                fontSize: fontSizes.text,
              }}>
              Ajouter
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ImagesSelect;
