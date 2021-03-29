import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';


const AcknowledgementsHeader = (props) => {
  const navigation = useNavigation();
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Entypo
        name={'chevron-left'}
        size={30}
        color={theme.colors.text}
        onPress={() => navigation.pop(1)}
        style={styles.icon}
      />
      <Text style={[styles.text, {color: theme.colors.text}]}>Agradecimientos</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:40,
    flex: 0.1,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  icon: {alignSelf: 'center'},
  text: {
    fontFamily: 'System',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginLeft:10,
  },
});

export default AcknowledgementsHeader;
