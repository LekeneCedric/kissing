import { Image, Text, View } from "react-native";
import colors from "../../../constants/colors.ts";
import fontSizes from "../../../constants/font-sizes.ts";


type GalerieItemProps = {
  imageUri: string
  hide?: boolean,
  plus?: number
}
const GalerieItem = ({imageUri, hide, plus}:GalerieItemProps) => {
  return <View style={{position: 'relative'}}>
    {hide && <View style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: colors.dark,  zIndex: 100000, opacity: 0.4}}/>}
    {hide && <Text style={{
      position: 'absolute',
      color: colors.light,
      fontSize: fontSizes.sectionTitle,
      zIndex: 1000000,
      textAlign: 'center',
      alignSelf: 'center',
      top: '40%'
    }}> + {plus} photos</Text>}
    <Image source={{ uri: imageUri}} style={{height: 150, width: 150, margin: 1}} />
  </View>
};

export default GalerieItem;
