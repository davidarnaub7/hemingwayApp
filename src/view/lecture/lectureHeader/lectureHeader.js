import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const LectureHeader = ({lecture}) => {
  const theme = useTheme();

  const getDifferenceDay = () => {
    const date1 = new Date();
    const diffTime = Math.abs(new Date(parseInt(lecture.createdOn)) - date1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  return (
    <View style={styles.container}>
      <Text style={[styles.text]}>{getDifferenceDay() + ' días'} </Text>
      <Text style={[styles.text]}>{lecture.content.length + ' pag'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.2,
    marginTop: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 8,
  },
  text: {
    fontFamily: 'System',
    fontSize: 10,
    fontWeight: '600',
    opacity: 0.6,
    color: 'white',
  },
});

export default LectureHeader;
