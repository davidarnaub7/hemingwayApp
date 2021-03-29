import React from 'react';
import {View, StyleSheet} from 'react-native';

import EditProfileLabelsItem from './components/editProfileLabelsItem';

const EditProfileLabels = ({info}) => {
  return (
    <View style={styles.container}>
      {info.map((input) => {
        return <EditProfileLabelsItem info={input} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    marginTop: 30,
    justifyContent: 'flex-start',
  },
});

export default EditProfileLabels;
