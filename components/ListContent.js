import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { COLORS } from '../actions/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

export function ListContent(props) {
  return (
    <View style={styles.container}>
      <View
        elevation={3}
        style={
          props.imageType == 'rectangle'
            ? styles.imageContainerRect
            : styles.imageContainer
        }>
        <Image
          resizeMode="contain"
          source={props.imageType == 'rectangle' ? {uri: props.path} : require('../assets/snack-icon.png')}
          style={
            props.imageType == 'rectangle'
              ? styles.rectimage
              : styles.imagestyle
          }
        />
        {props.playicon != null ? (
          <Icon
            name={props.playicon}
            size={15}
            style={{ opacity: 0.6 }}
            color={'#FFFF'}
            style={{ position: 'absolute' }}
          />
        ) : null}
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.title}>{props.title}</Text>
          <Icon name={props.icon} size={props.size} color={props.color} />
        </View>
        <Text style={styles.paragraph}>{props.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.TITLE,
  },
  imageContainer: {
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderRadius: 20,
    overflow: 'hidden',
    width: 45,
    height: 45,
  },
  imageContainerRect: {
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderRadius: 5,
    overflow: 'hidden',
    width: 100,
    height: 70,
  },
  rectimage: {
    width: 100,
    height: 70,
  },
  imagestyle: {
    width: 40,
    height: 40,
  },
});
