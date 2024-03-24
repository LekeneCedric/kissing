import {Modal, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import {Text, View} from 'react-native';
import fontSizes from '../../../constants/font-sizes';
import Button from '../../button/button';
import colors from '../../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import icons from '../../../constants/icons';
import iconSize from '../../../constants/iconSize';
import {useNavigation} from '@react-navigation/native';
import {Interest} from '../../../../domain/Interest/Interest';
import SimpleSelectComponent, {
  items,
} from '../../select/SelectComponent/SimpleSelectComponent';
import useFilterMatchesModalView from './useFilterMatchesModalView';
import SimpleInterestsSelect from '../../select/InterestsSelect/SimpleInterestsSelect';
import Slider from '@react-native-community/slider';

type props = {
  isVisible: boolean;
  action: () => void;
  closeModal: () => void;
  cameroonCitiesList: any[];
  searchTypeList: any[];
  interests: Interest[];
};
const FilterMatchesModal = ({
  isVisible,
  action,
  closeModal,
  cameroonCitiesList,
  searchTypeList,
  interests,
}: props) => {
  const {
    updateCityFilterParam,
    updateSearchTypeFilterParam,
    updateMinOldFilterParam,
    updateMaxOldFilterParam,
    cityFilterParam,
    searchTypeFilterParam,
    minOldFilterParam,
    maxOldFilterParam,
    cleanFilterParams,
  } = useFilterMatchesModalView();
  const navigation = useNavigation();
  return (
    <Modal animationType={'slide'} visible={isVisible}>
      <SafeAreaView
        style={{justifyContent: 'center', alignItems: 'center', margin: 10}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
            width: '100%',
            position: 'relative',
          }}>
          <TouchableOpacity
            style={{
              borderRadius: 10,
              borderWidth: 1,
              borderColor: colors.principal,
              position: 'absolute',
              left: 10,
              zIndex: 100000,
            }}
            onPress={closeModal}>
            <Icon
              name={icons.back}
              color={colors.principal}
              size={iconSize.normal}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: fontSizes.title,
              width: '100%',
              textAlign: 'center',
            }}>
            {' '}
            Filtrer les mathes
          </Text>
        </View>
        <ScrollView>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <SimpleSelectComponent
              items={cameroonCitiesList}
              label={'Sa ville de résidence'}
              description={'Selectionner la ville de résidence'}
              onChange={(city: items) => {
                updateCityFilterParam(city.value);
              }}
              value_={cityFilterParam}
            />
            <View style={{marginTop: 20}} />
            <SimpleSelectComponent
              items={searchTypeList}
              label={'Ce qu(il/elle) recherche'}
              description={"Que recherche t'(il/elle)"}
              onChange={(search: items) => {
                updateSearchTypeFilterParam(search.value);
              }}
              value_={searchTypeFilterParam}
            />
            <View style={{marginTop: 20}} />
            <SimpleInterestsSelect data={interests} />
            <View style={{marginTop: 20}} />
            <View style={{width: '95%'}}>
              <Text
                style={{
                  color: colors.principal,
                  fontSize: fontSizes.inputLabel,
                }}>
                Tranche d'age minimale
              </Text>
              <Slider
                style={{width: '100%', height: 20, marginTop: 15}}
                minimumValue={18}
                maximumValue={60}
                thumbTintColor={colors.principal}
                minimumTrackTintColor={colors.principal}
                maximumTrackTintColor={colors.gray}
                onValueChange={(value: number) => {
                  updateMinOldFilterParam(Math.floor(value));
                }}
              />
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: 0,
                }}>
                <Text
                  style={{
                    color: colors.dark,
                    fontSize: fontSizes.inputLabel,
                    margin: 0,
                  }}>
                  {' '}
                  {minOldFilterParam}
                </Text>
              </View>
            </View>
            <View style={{width: '95%'}}>
              <Text
                style={{
                  color: colors.principal,
                  fontSize: fontSizes.inputLabel,
                }}>
                Tranche d'age maximale
              </Text>
              <Slider
                style={{width: '100%', height: 20, marginTop: 15}}
                minimumValue={18}
                maximumValue={60}
                thumbTintColor={colors.principal}
                minimumTrackTintColor={colors.principal}
                maximumTrackTintColor={colors.gray}
                onValueChange={(value: number) => {
                  updateMaxOldFilterParam(Math.floor(value));
                }}
              />
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: 0,
                }}>
                <Text
                  style={{
                    color: colors.dark,
                    fontSize: fontSizes.inputLabel,
                    margin: 0,
                  }}>
                  {' '}
                  {maxOldFilterParam}
                </Text>
              </View>
            </View>

          </View>
        </ScrollView>
        <View style={{marginTop: 50}} />
        <Button
          label={'Vider le filtre'}
          handleClick={() => {
            cleanFilterParams();
          }}
          customStyle={{
            isOutline: false,
            backgroundColor: colors.gray,
            textColor: colors.principal,
          }}
          isLoading={false}
        />
        <View style={{marginTop: 20}} />
        <Button
          label={'Valider'}
          handleClick={() => {
            action();
          }}
          customStyle={{
            isOutline: false,
            backgroundColor: colors.principal,
            textColor: colors.light,
          }}
          isLoading={false}
        />
      </SafeAreaView>
    </Modal>
  );
};

export default FilterMatchesModal;
