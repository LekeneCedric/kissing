import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "./LogoutModalStyles.tsx";
import Button from "../../button/button.tsx";
import colors from "../../../constants/colors.ts";

type LogoutModalBehaviour = {
  isVisible: boolean,
  onClose: () => void
  onValid: () => void
}
const LogoutModal = ({isVisible, onClose, onValid}: LogoutModalBehaviour) => {
  return (
    <Modal transparent={true} style={styles.modalContainer}  animationType={'slide'} visible={isVisible}>
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}> Vous êtes sur le point de vous deconnecter ! </Text>
          <Text style={styles.description}>
            Nous vous recommendons de vous déconnecter uniquement si vous souhaitez changer de compte !
          </Text>
          <Text style={styles.description}>Vous déconnecter entrainera la perte de votre historique de messagerie !</Text>
          <Text style={[styles.description, {fontWeight: 'bold'}]}>Voulez vous continuer ?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={styles.disableButton}>
              <Text style={styles.disableText}> Annuler </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onValid} style={styles.validateButton}>
              <Text style={styles.validateText}> Déconnexion </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  )
};
export default LogoutModal;
