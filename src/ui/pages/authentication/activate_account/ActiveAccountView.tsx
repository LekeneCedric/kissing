import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import styles from './ActiveAccountStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import icons from '../../../constants/icons';
import colors from '../../../constants/colors';
import {useEffect, useMemo, useState} from 'react';
import iconSize from '../../../constants/iconSize';
import Button from '../../../components/button/button';
import useActivateAccountView from './useActivateAccountView';
import fontSizes from '../../../constants/font-sizes';

// @ts-ignore
const ActiveAccountView = () => {
  const activeAccountViewBehavior = useActivateAccountView();

  const {
    digitsContainer,
    currentIndex,
    setCurrentIndex,
    code,
    setCode,
    formatTimerToString,
    formatCodeToString,
    email,
    onSendVerificationEmail,
    onActivateAccount,
    isLoading,
  } = activeAccountViewBehavior;

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'column', alignItems: 'center'}}>
        <Text style={styles.timer}>{formatTimerToString()}</Text>

        <View style={{marginTop: hp('2%')}} />

        <Text style={styles.textDescription}>
          {' '}
          Entrez le code à 4 chiffres que nous vous avons envoyés.
        </Text>

        <View style={{marginTop: hp('2%')}} />

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {code.map((code: null) => {
            const codeIsNull = code === null;
            const backgroundColor: string = codeIsNull
              ? colors.light
              : colors.principal;
            const codeValueColor: string = codeIsNull
              ? colors.principal
              : colors.light;
            const codeValue = codeIsNull ? '-' : `${code}`;
            return (
              <View
                key={Math.floor(
                  (((Math.random() * 2500) / Math.random()) * 200) /
                    Math.random(),
                )}
                style={[styles.codeCell, {backgroundColor: backgroundColor}]}>
                <Text style={[styles.codeCellValue, {color: codeValueColor}]}>
                  {codeValue}
                </Text>
              </View>
            );
          })}
        </View>

        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}>
          {digitsContainer.map(digitContainer => {
            return (
              <View style={styles.digitsRow}>
                {digitContainer.map(value => {
                  const isNull = value === null;
                  const isErase = value === 'del';
                  const isDigit = !isNull && !isErase;
                  const updateCode = (
                    codeValue: any,
                    type: 'add' | 'remove',
                  ) => {
                    const currentIndexIsNull = code[currentIndex] === null;
                    const newCurrentIndex =
                      type == 'add' ? currentIndex + 1 : currentIndex - 1;

                    const indexInHisMaxSize = currentIndex == 3;
                    const indexInHisMinSize = currentIndex == 0;
                    setCode((prevCodes: any) => {
                      const newCodes = [...prevCodes];
                      newCodes[currentIndex] = codeValue;
                      return newCodes;
                    });

                    switch (type) {
                      case 'add':
                        if (!indexInHisMaxSize) {
                          setCurrentIndex(newCurrentIndex);
                        }
                        break;
                      case 'remove':
                        if (!indexInHisMinSize) {
                          if (currentIndexIsNull) {
                            setCode((prevCodes: any) => {
                              const newCodes = [...prevCodes];
                              newCodes[newCurrentIndex] = codeValue;
                              return newCodes;
                            });
                          }
                          setCurrentIndex(newCurrentIndex);
                        }
                        break;
                    }
                  };
                  const addCode = () => {
                    updateCode(value, 'add');
                  };
                  const erase = () => {
                    updateCode(null, 'remove');
                  };
                  return (
                    <TouchableOpacity
                      key={value}
                      onPress={() => {
                        isDigit ? addCode() : isErase ? erase() : null;
                      }}
                      style={styles.digitCell}>
                      {isDigit ? (
                        <Text style={styles.digitCellValue}> {value} </Text>
                      ) : isNull ? (
                        <Text style={styles.digitCellValue}> </Text>
                      ) : (
                        <Icon
                          name={icons.erase}
                          size={iconSize.normal}
                          color={colors.dark}
                        />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })}
        </View>

        <View style={{marginTop: hp('1%')}} />

        <Button
          isLoading={isLoading}
          label={'Valider'}
          handleClick={() => {
            onActivateAccount({email: email!, code: formatCodeToString()});
          }}
          customStyle={{
            textColor: colors.light,
            backgroundColor: colors.principal,
            isOutline: false,
          }}
        />

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginTop: hp('2%'),
            width: '90%',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomWidth: 2,
            borderRadius: 20,
            borderColor: colors.principal,
            paddingBottom: hp('1%'),
          }}
          onPress={() => onSendVerificationEmail({email: email!})}
          disabled={formatTimerToString().length > 0}>
          <Icon
            name={icons.message}
            size={iconSize.normal}
            color={colors.principal}
          />
          <Text
            style={{
              fontSize: fontSizes.text,
              color:
                formatTimerToString().length > 0 ? colors.gray : colors.dark,
              marginLeft: wp('2%'),
            }}>
            Renvoyer moi le code de confirmation
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ActiveAccountView;
