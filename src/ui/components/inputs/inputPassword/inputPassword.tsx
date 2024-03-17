import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import icons from '../../../constants/icons';
import iconSize from '../../../constants/iconSize';
import styles from './inputPasswordStyle';
import colors from '../../../constants/colors';
import fontSizes from '../../../constants/font-sizes';
import {ControllerRenderProps} from 'react-hook-form';
type inputPasswordProps = {
  label: string;
  errorMessage?: string;
  field: ControllerRenderProps<any, any>;
};
const InputPassword = ({label, errorMessage, field}: inputPasswordProps) => {
  const [canSee, setCanSee] = useState<boolean>(false);
  return (
    <View style={styles.inputGlobalContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputHeader}>{label}</Text>
        <Icon
          style={{width: '10%'}}
          color={colors.dark}
          name={icons.lock}
          size={iconSize.normal}
        />
        <TextInput
          secureTextEntry={!canSee}
          placeholder="Entrez le mot de passe"
          placeholderTextColor={colors.gray}
          cursorColor={colors.principal}
          onChangeText={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
          style={{
            width: '80%',
            color: colors.dark,
            fontSize: fontSizes.inputLabel,
          }}
        />
        <TouchableOpacity
          onPress={() => {
            setCanSee(!canSee);
          }}>
          <Icon
            color={colors.dark}
            name={canSee ? icons.eye : icons.eyeOff}
            size={iconSize.normal}
          />
        </TouchableOpacity>
      </View>
      {errorMessage ? (
        <Text style={[styles.info, {color: colors.red}]}>{errorMessage}</Text>
      ) : (
        <Text style={[styles.info, {color: colors.gray}]} />
      )}
    </View>
  );
};

export default InputPassword;
