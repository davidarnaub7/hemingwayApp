import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';

const CreatorHeader = ({navigateToLauncher, title, setTitle}) => {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TextInput
          value={title}
          onChangeText={t => {
            setTitle(t);
          }}
          style={[styles.tittle, {color: theme.colors.text}]}
          placeholder={'Título'}
          placeholderTextColor={'#D0D0D0'}
        />
        <TouchableOpacity onPress={() => navigateToLauncher()}>
          <Text style={[styles.text, {color: theme.colors.text}]}>
            Guardar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.085,
    marginTop: 40,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  tittle: {
    fontFamily: 'System',
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
    marginLeft: 15,
  },
  text: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});

export default CreatorHeader;
