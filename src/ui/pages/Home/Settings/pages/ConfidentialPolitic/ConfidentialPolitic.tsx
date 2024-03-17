import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import colors from "../../../../../constants/colors.ts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import icons from "../../../../../constants/icons.ts";
import iconSize from "../../../../../constants/iconSize.ts";
import fontSizes from "../../../../../constants/font-sizes.ts";
import { useNavigation } from "@react-navigation/native";
import { confidentiality_politics } from "../../../../../constants/extra.js";

const ConfidentialPolitic = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            borderRadius: 10,
            borderWidth: 1,
            borderColor: colors.principal,
            position: 'absolute',
            left: 10,
            zIndex: 100000,
          }}
          onPress={() => {
            navigation.goBack();
          }}>
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
          Politique de confidentialité
        </Text>
      </View>
      <ScrollView style={{marginLeft: 15, marginRight: 15, marginBottom: 30}}>
        {
          Object.entries(confidentiality_politics).map(([k,v]) => {
            return <View style={{flexDirection: 'column'}}>
              <Text style={{fontSize: fontSizes.sectionTitle, fontWeight: 'bold', marginTop: 10}}>{k}</Text>
              <Text style={{flexWrap: 'wrap'}}>{v}</Text>
            </View>
          })
        }
      </ScrollView>
    </SafeAreaView>
  )
}
export default ConfidentialPolitic;
