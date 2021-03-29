import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Dimensions} from 'react-native';

const SearcherElement = ({theme}) => {
  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.searcherBarContainer,
          {
            borderColor: theme.colors.card,
            backgroundColor: theme.colors.card,
          },
        ]}>
        <TextInput
          style={[
            styles.textInput,
            {
              color: theme.colors.text,
            },
          ]}
          onChangeText={(t) => setSearch(t)}
          onEndEditing={() => {
            setSearch('');
          }}
          placeholder={'Buscar'}
          placeholderTextColor={theme.colors.notification}
        />
      </View>
    </View>
  );
};

const WIDTH = Dimensions.get('window').width / 1.05;
const HEIGHT = Dimensions.get('window').height / 16;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 0.1,
  },
  activity: {
    flex: 1,
    justifyContent: 'center',
  },
  searcherBarContainer: {
    width: WIDTH,
    height: HEIGHT,
    borderRadius: 20,
    borderWidth: 1,
    alignSelf: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: WIDTH,
    height: HEIGHT,
    marginLeft: 20,
    borderRadius: 2,
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default SearcherElement;
