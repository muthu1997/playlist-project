import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '../actions/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

export function VideoContent(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => props.videoHandler()}
        activeOpacity={0.8}
        elevation={3}
        style={styles.imageContainerRect}>
        <Image
          resizeMode="contain"
          source={{ uri: props.path }}
          style={styles.rectimage}
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
      </TouchableOpacity>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 10,
        }}>
        <Text style={styles.title}>{props.title}</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => props.removeHandler()}>
          <Icon name={props.icon} size={props.size} color={props.color} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 5,
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
    width: '100%',
    height: 150,
  },
  rectimage: {
    width: '100%',
    height: 150,
  },
  imagestyle: {
    width: 40,
    height: 40,
  },
});
