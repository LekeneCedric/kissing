import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import Matche from '../matches/components/Matche/Matche';
import styles from './ChatStyles';
import {useState} from 'react';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import Messages from './Tabs/Messages/Messages';
import Favorites from './Tabs/Favorites/Favorites';
import colors from '../../../constants/colors';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const renderScene = SceneMap({
  messages: Messages,
  favoris: Favorites,
});
const Chat = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'messages', title: 'Messages'},
    {key: 'favoris', title: 'Favoris'},
  ]);
  const renderTabBar = (props: any) => {
    return (
      <TabBar
        {...props}
        indicatorStyle={{backgroundColor: colors.principal}}
        style={{backgroundColor: colors.light}}
        labelStyle={{color: colors.dark}}
        activeColor={colors.principal}
        inactiveColor={colors.dark}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
          marginBottom: 10,
          marginTop: 0,
        }}>
        <Text style={styles.title}>Messages</Text>
      </View>
      {/*<View style={{height: heightPercentageToDP('28%')}}>*/}
      {/*  <FlatList*/}
      {/*    horizontal*/}
      {/*    showsHorizontalScrollIndicator={false}*/}
      {/*    data={[*/}
      {/*      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1,*/}
      {/*    ]}*/}
      {/*    keyExtractor={(item, index) => index.toString()}*/}
      {/*    renderItem={() => (*/}
      {/*      <Matche*/}
      {/*        image={*/}
      {/*          'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAlwMBIgACEQEDEQH/xAAaAAEBAAMBAQAAAAAAAAAAAAAABQECBAMH/8QALBABAAICAQMCBQIHAAAAAAAAAAECAxEEEjFRIUEFEyJhcTKhFDRSYnKBsf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD6iAAAAAAAANb5KY9ddojfmWK5KW7XrP4kG4AAAAAAAAAAAAAAPDl8j5FI1qb27QDbNnx4Y3efX2iO6fk5mbJaZrboj2iHja03t1WndvLUG17XyTu9ptPmWugBmLWr2tMf7e2DlZMMxEz1U/pmXgAuRaJrFo7TG2Y9Y3HZCm061MzMeNu7g8meuMWSfSY1WfAO8AAAAAAAAACErm36+TaPavpCqi5Z3lvP90g0AAAAAAbUma3rMd4nbUBd7+oxX9MfhkAAAAAAAABEyR05LxPeLStomX1y3336pBqAAAAAASM1jdojzILcekQyAAAAAAAAANcl4x0teY3FY2j57/NyzfpiNq+evXhvWO81nSLEaAAAAAAAevF6f4jH19t/u8ntw69XJpHj1BXAAAAAAAAAASOXTo5F4jtvcK7n5eCl8d76+uK6iQSgAAAAAHX8Mjea19do05aRN8laR7zpbrWK1iKxER7AyAAAAAAAAAAfaY3AAjZ8c4c009oncfeHmo/Eqx8qttevVracAAAADo4OKb8iLdor6yqp/wAMn68kfaFAAAAAAAAAAAAGmTLjxRvJeKg5/iX8vH+UJsOnmciM01rTfTHlzAAAAA6vhs6z2ifeqmiYck4ssXiN69lGnOw2nVt0/MegOoYraLRusxMeYZAAAAABrkvXHSbXnUQDZply0xV6r21H/U/NzcmSZ+XM0p7eZc1pm07tMzP3kHTm52TJOsf0R+7lnczuZ3PmTQAAAAAAAADfHkvindLTH4d2Dn1tqM0dM+Y7JxoFyLRaN1mJjzDKLjy3xTvHbX29pd2DnUt9OT6Z8+wOwO8bgAR+TktkyTNp/TuIgAeQAAAAAAAAAAAAABIA7Ph2S27Y5nddb/AAP//Z'              }*/}
      {/*        username={'John Doe'}*/}
      {/*        age={22}*/}
      {/*        isOnline={true}*/}
      {/*      />*/}
      {/*    )}*/}
      {/*  />*/}
      {/*</View>*/}

      <TabView
        onIndexChange={setIndex}
        navigationState={{index, routes}}
        renderTabBar={renderTabBar}
        renderScene={renderScene}
        initialLayout={{width: layout.width}}
      />
    </SafeAreaView>
  );
};

export default Chat;
