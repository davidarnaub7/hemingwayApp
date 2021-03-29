import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';

const LoginFooter = () => {
  const theme = useTheme();
  return (
    <View style={[styles.footer, {borderTopColor: theme.colors.card}]}>
      <Text style={[styles.footerText,{color: 'white'}]}>
        hemingway from{' '}
        <Text style={[styles.improveYourWorld, {color: 'white'}]}>
          enjoyourself
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  //FOOTER
  footer: {
    // borderTopWidth: 1,
    flex: 0.05,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 14,
    fontWeight: '600',
    alignSelf: 'center',
    left: 5,
    top: 10,
    opacity: 0.8,
  },
  improveYourWorld: {
    fontSize: 15,
    fontWeight:'800',
    fontFamily: 'System',
  },
});

export default LoginFooter;
