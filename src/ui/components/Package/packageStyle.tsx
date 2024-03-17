import {Platform, StyleSheet} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../constants/colors';
import fontSizes from '../../constants/font-sizes';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: heightPercentageToDP('2%'),
  },
  container2: {
    width: wp('80%'),
    marginBottom: 5,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: colors.light,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: fontSizes.title,
    color: colors.light,
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: heightPercentageToDP('1%'),
    flexWrap: 'wrap',
  },
  descriptionText: {
    fontSize: fontSizes.text,
  },
  descriptionPrice: {
    fontSize: fontSizes.text,
    fontWeight: 'bold',
  },
  button: {
    padding: 10,
    margin: 10,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    borderRadius: 5,
  },
});
export default styles;
