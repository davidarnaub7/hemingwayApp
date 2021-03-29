import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Text,
  Animated,
} from 'react-native';

import {COLORS} from '../../../../../constants/constants'; //STYLING
import {useTheme} from '@react-navigation/native'; //THEME
import Ionicons from 'react-native-vector-icons/Ionicons'; //ICON
import FlashMessage from 'react-native-flash-message';
//PARTS
import PoliciesModalSelector from './policiesModalSelector/policiesModalSelector';
import TermsAndConditions from './TermsAndConditions/termsAndConditions';
import Policy from './Politica/policy';

const TouchableAnimated = Animated.createAnimatedComponent(TouchableOpacity);
const PoliciesModal = ({setModal, modal, createUserHandler}) => {
  const theme = useTheme();
  const [checked, setChecked] = useState(false); //CHECK UI
  const [selectedOption, setSelectedOption] = useState(
    'Términos y condiciones',
  ); //SELECTOR OPTION

  const [error, setError] = useState(''); //UI HANDLER

  const [opacity, _] = useState(new Animated.Value(0.6)); //ANIMATED OPACITY HANDLER

  const ref = React.useRef(); //REF USED BY FLASHMESSAGE IN CASE OF ERROR.

  React.useEffect(() => {
    let subscribe = true;
    if (error !== '' && subscribe) {
      ref.current.showMessage({
        message: error,
        type: 'info',
        duration: 2500,
        floating: true,
        backgroundColor: COLORS.socialButton,
        titleStyle: {
          fontFamily: 'System',
          fontWeight: 'bold',
          fontSize: 16,
        },
        style: {
          top: 20,
        },
      });
      setError('');
    }
    return () => {
      subscribe = false;
    };
  }, [error]);

  React.useEffect(() => {
    Animated.timing(opacity, {
      toValue: checked ? 1 : 0.6,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [checked, opacity]);

  //INLINE
  const checkInline = {
    borderColor: checked ? theme.colors.primary : theme.colors.notification,
    backgroundColor: checked ? COLORS.primary : 'transparent',
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
      visible={modal}>
      <View
        style={[styles.container, {backgroundColor: theme.colors.background}]}>
        <ScrollView stickyHeaderIndices={[0]}>
          <PoliciesModalSelector
            setModal={setModal}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
          {selectedOption === 'Términos y condiciones' ? (
            <TermsAndConditions />
          ) : (
            <Policy />
          )}

          <View style={styles.checker}>
            <TouchableOpacity
              onPress={() => setChecked(!checked)}
              style={[styles.check, checkInline]}>
              {checked && (
                <Ionicons
                  name={'checkmark-sharp'}
                  size={20}
                  color={'white'}
                  style={{alignSelf: 'center'}}
                />
              )}
            </TouchableOpacity>
            <Text style={[styles.little, {color: theme.colors.text}]}>
              Acepto los términos y condiciones y la política de datos de Beyu.{' '}
            </Text>
          </View>
          <TouchableAnimated
            onPress={(event) => {
              if (checked) {
                createUserHandler(event);
              } else {
                setError('Tienes que aceptar las condiciones para continuar');
              }
            }}
            style={[styles.button, {opacity}]}>
            <Text style={styles.buttonLabel}>Accept</Text>
          </TouchableAnimated>
        </ScrollView>
        <FlashMessage position="top" ref={ref} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  checker: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  check: {
    alignSelf: 'center',
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    justifyContent: 'center',
  },
  little: {
    fontSize: 16,
    alignSelf: 'center',
    fontFamily: 'System',
    fontWeight: '700',
    width: Dimensions.get('window').width / 1.3,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 12,
    marginBottom: 20,
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#999',
    borderRadius: 5,
    padding: 10,
  },
  buttonLabel: {
    fontSize: 16,
    color: '#FFF',
    alignSelf: 'center',
    fontFamily: 'System',
    fontWeight: '700',
    top: Dimensions.get('window').height / 35,
  },
});

export default PoliciesModal;
