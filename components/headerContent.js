import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '../actions/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

export function HeaderContent(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={()=>props.onPress()}
        style={{
          position: 'absolute', 
          right: 20,
          width: 30, 
          height: 30,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon name="plus" size={20} color={COLORS.PRIMARY} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    flexDirection: 'row',
  },
  title: {
    marginTop: 0,
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.PRIMARY,
  },
  logo: {
    height: 128,
    width: 128,
  },
});
