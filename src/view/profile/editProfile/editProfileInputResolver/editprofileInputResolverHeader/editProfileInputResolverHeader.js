import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

//THIRD PARTY LIBARIES
import {UIActivityIndicator} from 'react-native-indicators';

//STYLING AND ICONS
import Entypo from 'react-native-vector-icons/Entypo';
import {COLORS} from '../../../../../constants/constants';

const EditProfileInputResolverHeader = ({
  updateProfileHandler,
  nav,
  theme,
  fetching,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.touchables}>
          <Entypo
            name={'chevron-left'}
            size={35}
            color={theme.colors.text}
            onPress={() => nav.goBack()}
            style={{alignSelf: 'center', marginLeft: 10}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchables}
          onPress={(event) => {
            updateProfileHandler(event);
          }}>
          {fetching ? (
            <UIActivityIndicator
              color={theme.colors.text}
              style={{alignSelf: 'center'}}
            />
          ) : (
            <Text style={[styles.edittext, {color: theme.colors.text}]}>
              Listo
            </Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={[styles.sticky, {borderColor: theme.colors.notification}]} />
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
    justifyContent: 'space-between',
    bottom: 5,
  },
  touchables: {justifyContent: 'center',},
  edittext: {
    fontSize: 18,
    fontFamily: 'System',
    fontWeight: '600',
    marginRight: 15,
    color: COLORS.primary,
    alignSelf: 'center',
  },
  //STICKY
  sticky: {
    width: Dimensions.get('window').width,
    alignSelf: 'center',
    borderWidth: 0.5,
  },
});

export default EditProfileInputResolverHeader;
