import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  TextInput
} from 'react-native';
import { COLORS } from '../actions/colors';

export function AddPlaylist(props) {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View
          style={styles.innerContainer}
          showsVerticalScrollIndicator={false}>
          <Text
            style={{ fontSize: 22, fontWeight: 'bold', marginVertical: 10 }}>
            New Playlist
          </Text>
          <Text style={{ marginBottom: 10, lineHeight: 22 }}>
            {'Enter playlist title here'}
          </Text>

          <TextInput placeholder={props.placeholder} style={styles.input} onChangeText={(data) => props.onChangeText(data)} value={props.value} />
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <View style={{ width: '50%', paddingHorizontal: 5 }}>
              <Button
                backgroundColor="#d3d3d3"
                color="#000"
                style={{ marginVertical: 10, borderRadius: 10 }}
                title="Cancel"
                onPress={() => props.onPress()} 
              />
            </View>
            <View style={{ width: '50%', paddingHorizontal: 5 }}>
              <Button
                style={{ marginVertical: 10, borderRadius: 10 }}
                title="Create"
                onPress={props.onHandleClick}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  cardContainer: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 20,
    paddingBottom: 10,
    alignSelf: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  innerContainer: {
    paddingHorizontal: '8%',
    paddingTop: 20,
  },
  input: {
    width: '100%',
    height: 35,
    borderBottomWidth: 2,
    borderColor: COLORS.BLACK
  }
});
