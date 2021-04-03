import {useTheme} from '@react-navigation/native';
import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';

const CreatorStudio = ({text, setText}) => {
  const ref = React.useRef();
  const theme = useTheme();
  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss}
      accessible={false}>
      <ScrollView style={styles.container} ref={ref}>
        <TextInput
          value={text}
          multiline={true}
          onChangeText={t => {
            setText(t);
            if (text.length > 350) {
              ref.current.scrollTo({x: 0, y: t.length / 4});
            }
          }}
          placeholder={
            'En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo corredor. Una olla de algo más vaca que carnero, salpicón las más noches, duelos y quebrantos los sábados, lentejas los viernes, algún palomino de añadidura los domingos, consumían las tres partes de su hacienda. El resto della concluían sayo de velarte, calzas de velludo para las fiestas con sus pantuflos de lo mismo, los días de entre semana se honraba con su vellori de lo más fino. Tenía en su casa una ama que pasaba de los cuarenta, y una sobrina que no llegaba a los veinte, y un mozo de campo y plaza, que así ensillaba el rocín como tomaba la podadera.'
          }
          placeholderTextColor={theme.colors.border}
          style={[styles.text, {color: theme.colors.text}]}
        />
        {text.length > 350 ? <View style={{height: 1200}} /> : <></>}
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.85,
    width: Dimensions.get('window').width / 1.05,
    alignSelf: 'center',
    // backgroundColor: 'white',
    borderRadius: 20,
  },
  text: {
    marginHorizontal: 10,
    fontFamily: 'courier',
    fontSize: 16,
    fontWeight: '400',
    alignSelf: 'center',
    opacity: 0.8,
    width: Dimensions.get('window').width / 1.1,
    lineHeight: 25,
    color: 'white',
  },
});

export default CreatorStudio;
