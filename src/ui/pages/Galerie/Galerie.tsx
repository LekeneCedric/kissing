import ImageView from 'react-native-image-viewing';
import {useGalerieView} from './useGalerieView';
import { Text, View } from "react-native";
import colors from "../../constants/colors.ts";
import fontSizes from "../../constants/font-sizes.ts";
import { useState } from "react";

const Galerie = () => {
  const {goBack, images} = useGalerieView();
  const [currentIndex, setCurrentIndex] = useState(1);
  return (
    <View>
      <ImageView
        images={images}
        imageIndex={0}
        visible={true}
        onRequestClose={goBack}
        onImageIndexChange={(index) => setCurrentIndex(index+1)}
        FooterComponent={(index) => (
          <View style={{ alignItems: 'center', marginTop: 10 }}>
            <Text style={{fontSize: fontSizes.sectionTitle, color: colors.light}}>{`${index.imageIndex + 1} / ${images.length}`}</Text>
          </View>
        )}
      />

    </View>

  );
};
export default Galerie;
