import {useTheme} from '@react-navigation/native';
import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Text,
} from 'react-native';
import {COLORS} from '../../../../../constants/constants';
import ActionSheetModalOption from './components/actionSheetModalOption';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height / 3.5;

const ActionSheetModal = ({
  options,
  setModal,
  setPexelModal,
  visible,
  showImageLibrary,
  removeMedia,
}) => {
  const theme = useTheme();

  const showPexels = () => {
    setPexelModal(true);
    setModal(undefined);
  };
  return (
    <Modal
      animated
      animationType="fadeInUp"
      transparent={true}
      useNativeDriver={true}
      onRequestClose={() => {
        setModal(undefined);
      }}
      visible={visible !== undefined}>
      <View style={{flex: 1}}>
        <View
          style={[
            styles.modalContainer,
            {backgroundColor: theme.colors.background},
          ]}>
          {options.map((opt) => {
            return (
              <ActionSheetModalOption
                option={opt}
                flag={visible}
                height={HEIGHT / 4.5}
                showImageLibrary={showImageLibrary}
                showPexels={showPexels}
                removeMedia={removeMedia}
              />
            );
          })}
          <TouchableOpacity
            style={styles.exitButtonContainer}
            onPress={() => setModal(undefined)}>
            <Text style={styles.exitButtonText}>Atrás</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  modalContainer: {
    width: WIDTH,
    height: HEIGHT,
    borderRadius: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    top: Dimensions.get('window').height / 1.5,
    alignSelf: 'center',
    shadowOffset: {width: 0, height: -5},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  //exitButtonContainer
  exitButtonContainer: {
    width: WIDTH / 1.1,
    height: 60,
    justifyContent: 'center',
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
  },
  exitButtonText: {
    fontFamily: 'System',
    fontSize: 16,
    alignSelf: 'center',
    color: 'white',
  },
});

export default ActionSheetModal;
