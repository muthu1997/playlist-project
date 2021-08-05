import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  NativeModules,
  Modal,
} from 'react-native';
import Constants from 'expo-constants';
import { COLORS } from '../actions/colors';
import { DotIndicator } from 'react-native-indicators';
// You can import from local files
import { HeaderContent, ListContent, AddPlaylist } from '../components';
// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
import { connect } from 'react-redux';

function Home(props) {
  const [getLoader, setLoader] = React.useState(false);
  const [getModelStatus, setModelStatus] = React.useState(false);
  const [getPlaylistName, setPaylistName] = React.useState(null);

  if (getLoader) {
    return <DotIndicator size={10} color={COLORS.PRIMARY} />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <Card style={styles.header}>
          <HeaderContent
            title="Video Player"
            onPress={() => setModelStatus(!getModelStatus)}
          />
        </Card>
        {props.playlist != [] &&
        props.playlist != null &&
        props.playlist.length > 0 ? (
          <>
            {props.playlist.map((item) => (
              <TouchableOpacity
              key={item.id}
                activeOpacity={0.9}
                onPress={() => props.navigation.navigate('PlayList',{id: item.id})}>
                <Card elevation={5} style={styles.list}>
                  <ListContent
                    title={item.title}
                    description={item.video.length+" videos"}
                    icon="play"
                    size={15}
                    color={COLORS.BLUE}
                  />
                </Card>
              </TouchableOpacity>
            ))}
          </>
        ) : (
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: 'gray' }}>
              No data found. Press + button to add new playlist.
            </Text>
          </View>
        )}

        <Modal visible={getModelStatus} transparent={true} animationType="fade">
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            <AddPlaylist
              onPress={() => setModelStatus(!getModelStatus)}
              onHandleClick={() => {
                if (getPlaylistName != null) {
                  props.savePlaylist(getPlaylistName);
                  setPaylistName(null);
                  setModelStatus(false)
                }else {
                  alert("Enter Playlist Name first");
                }
              }}
              value={getPlaylistName}
              placeholder="Enter title"
              onChangeText={(data) => setPaylistName(data)}
            />
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

const mapStateToPrps = (state) => {
  return {playlist: state}
}

const mapDispatchToPrps = (dispatch) => {
  return {
    savePlaylist: (data) => dispatch({ type: 'ADD', payload: data }),
  };
};

export default connect(mapStateToPrps, mapDispatchToPrps)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  header: {
    width: Dimensions.get('screen').width,
    height: 65,
    justifyContent: 'center',
  },
  list: {
    width: '95%',
    borderRadius: 5,
    padding: 8,
    alignSelf: 'center',
    marginVertical: 5,
  },
});
