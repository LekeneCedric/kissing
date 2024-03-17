import styles from './MatchesStyle';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import icons from '../../../constants/icons';
import iconSize from '../../../constants/iconSize';
import colors from '../../../constants/colors';
import Matche from './components/Matche/Matche';
import FilterMatchesModal from '../../../components/Modals/FilterMatches/FilterMatchesModal';
import {useState} from 'react';
import useMatchListView from './useMatchListView';
import {BASEURL} from '../../../routes/ApiRoutes';
import {LoadingState} from '../../../../shared/enum/LoadingState';
import fontSizes from '../../../constants/font-sizes';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {Recommendation} from '../../../../domain/User/User';

const MatchesList = () => {
  const [filterIsVisible, setFilterIsVisible] = useState<boolean>(false);
  const {
    loading,
    matches,
    refreshing,
    cameroonCitiesList,
    searchTypeList,
    interests,
    onRefresh,
    filterRecommendations,
    groupRecommendations,
    nextPage,
    next,
  } = useMatchListView();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {}}>
          <Icon name={icons.menu} size={iconSize.normal} />
        </TouchableOpacity>
        <Text style={styles.title}>Découverte</Text>
        <TouchableOpacity
          onPress={() => {
            setFilterIsVisible(true);
          }}>
          <Icon
            name={icons.filter}
            size={iconSize.normal}
            color={colors.principal}
          />
        </TouchableOpacity>
      </View>
      {
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <FlatList
            data={groupRecommendations(matches)}
            renderItem={({item}) => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                {item.map(match => {
                  return (
                    <Matche
                      id={match?.id}
                      image={BASEURL + '/' + match?.images[0]?.image}
                      username={match?.user.username}
                      age={match?.age}
                      isOnline={match?.user.is_online}
                    />
                  );
                })}
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={
              loading === LoadingState.pending ? (
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: heightPercentageToDP('30%'),
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: fontSizes.sectionTitle,
                      fontWeight: 'bold',
                    }}>
                    Recherche.....
                  </Text>
                  <ActivityIndicator size={'large'} color={colors.principal} />
                </View>
              ) : (
                <></>
              )
            }
          />
          {next !== null && (
            <TouchableOpacity onPress={nextPage}>
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: fontSizes.sectionTitle,
                  color: colors.principal,
                  marginTop: 15,
                }}>
                Voir plus...
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      }
      <FilterMatchesModal
        action={() => {
          filterRecommendations();
          setFilterIsVisible(false);
        }}
        closeModal={() => {
          setFilterIsVisible(false);
        }}
        isVisible={filterIsVisible}
        cameroonCitiesList={cameroonCitiesList}
        searchTypeList={searchTypeList}
        interests={interests}
      />
    </SafeAreaView>
  );
};

export default MatchesList;
