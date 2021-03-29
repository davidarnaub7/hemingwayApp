import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons'; //ICONS

const SearcherHeader = ({setModal, theme}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Ionicons
          name={'close'}
          style={{alignSelf: 'center', top: 2}}
          onPress={() => setModal(false)}
          size={30}
          color={theme.colors.text}
        />
        <Text style={[styles.header, {color: theme.colors.text}]}>
          Buscador
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.12,
    justifyContent: 'flex-end',
  },
  row: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  header: {
    fontFamily: 'System',
    fontSize: 30,
    fontWeight: '600',
    marginLeft: 10,
  },
});

export default SearcherHeader;
