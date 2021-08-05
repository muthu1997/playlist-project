import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Image,
  ScrollView,
  NativeModules,
  Button
} from 'react-native';
import { COLORS } from '../actions/colors';
import { DotIndicator } from 'react-native-indicators';
import { connect } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
// You can import from local files
import { HeaderContent, VideoContent } from '../components';
import { Video } from 'expo-av';
// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
import RNFS from 'react-native-fs';
import * as FileSystem from 'expo-file-system';
var Aes = NativeModules.Aes;
const generateKey = (password, salt, cost, length) => Aes.pbkdf2(password, salt, cost, length)

const encryptData = (text, key) => {
  return Aes.randomKey(16).then(iv => {
      return Aes.encrypt(text, key, iv).then(cipher => ({
          cipher,
          iv,
      }))
  })
}

const decryptData = (encryptedData, key) => Aes.decrypt(encryptedData.cipher, key, encryptedData.iv)

function PlaylistFunction(props) {
  const [getLoader, setLoader] = React.useState(false);
  const [filePath, setFilePath] = React.useState(null);
  const [getVideoStatus, setVideoStatus] = React.useState(false);
  const [getVideo, setVideo] = React.useState(null);
  const [getEncryptedData, setEncryptedData] = React.useState(null);
  const [getOutputData, setOutputData] = React.useState(null);
  const [getBase64Data, setBase64Data] = React.useState(null);
  const [getTempData, setTempData] = React.useState([]);
  const filter_hendler = props.playlist.filter(
    (x) => x.id == props.route.params.id
  );
  const dataHandler = filter_hendler[0];
  const data_changer = dataHandler.video;
  const data_result = data_changer.length > 0 ? data_changer : null;

  React.useEffect(() => {
    async () => {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    };
  }, []);

  const selectVideoFunction = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      base64: true,
      allowsEditing: false,
      quality: 1
    });

    if (!result.cancelled) {
      var finalresult = {
        path: result.uri,
        thumbnile: result.uri,
        pixel: result.width + '*' + result.height,
      };
      console.log(result)
      changer(result.uri)
      var id = props.route.params.id;
      setFilePath(result.uri);
      props.savePlaylist(finalresult, id);

      
    }
  };

  const changer = (data) => {
    RNFS.readFile( data, 'base64').then(res => { return encryptFunction(res) });
  }

  const uploadServer = async(datas, index) => {
    await fetch("https://encryptionweb.000webhostapp.com/api/storage.php",{
      method: "POST",
      header: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        title: "Somethings",
        data: datas,
        video_index: index
      })
    })
    .then(response => response.json())
    .then(res => {
      console.log(res)
    })
  }

  const encryptFunction = (data) => {
    generateKey('5c79ab8b36c4c0f8566cee2c8e47135f2536d4f715a22c99fa099a04edbbb6f2', 'salt', 5000, 256).then(key => {
      encryptData(data, key)
          .then(({ cipher, iv }) => {
              console.log('Encrypted:', cipher)
              var calculation = cipher.length / 20000;
              setEncryptedData(cipher);
              setBase64Data(data)
              var temp = [];
              temp.length = 0;
              let temp_slice_index = 0;
              // for(var i=0;i<calculation;i++) {
              //   temp.push({"id": i, "data": cipher.slice(temp_slice_index,((i+1) * 20000)) });
              //   temp_slice_index = temp_slice_index + 20000;
              // }
              //KVxkvkfhHMx8clnI6jy2GQ==
              setTempData(temp);
              // decryptData({ cipher, iv }, key)
              //     .then(text => {
              //         console.log('Decrypted:', text)
              //     })
              //     .catch(error => {
              //         console.log(error)
              //     })
          })
          .catch(error => {
              console.log(error)
          })
  })
  }

  if (getLoader) {
    return <DotIndicator size={10} color={COLORS.PRIMARY} />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        {getVideoStatus ? (
          <View style={{ flex: 1 }}>
           <Video
              source={{uri: getVideo}}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay 
              isLooping
              style={{ width: 300, height: 300, alignSelf: 'center' }}
            />  
            <View style={{justifyContent: 'center',alignItems: 'center'}}>
            <View style={{width:"80%"}}>
            <Button title="Close" style={{margin:5}} onPress={() => setVideoStatus(false)} />
            <Button title="Show base64 data" style={{margin:5}} onPress={() => setOutputData(getBase64Data.slice(0,50000))} />
            <Button title="Show encrypted data" style={{margin:5}} onPress={() => setOutputData(getEncryptedData.slice(0,50000))} />
            <Button title="Show compressed data" style={{margin:5}} onPress={() => setOutputData(getTempData.slice(0,10))} />
            </View>
            </View>
            <ScrollView style={{alignSelf:'center'}}>
              <View style={{width: Dimensions.get("screen").width / 100 * 90, height: 300, borderWidth:1}}>
                <Text>{JSON.stringify(getOutputData)}</Text>
              </View>
            </ScrollView>
          </View>
        ) : (
          <>
            <Card style={styles.header}>
              <HeaderContent
                onPress={() => selectVideoFunction()}
                title="Play List"
              />
            </Card>
            {data_result != null ? (
              <ScrollView>
                {data_result.length != null &&
                  data_result.map((item) => (
                    <Card elevation={5} key={item.id} style={styles.list}>
                      <VideoContent
                        videoHandler={() => {setVideo(item.path); setVideoStatus(true)}}
                        imageType="rectangle"
                        title={item.pixel + ' pixels'}
                        path={item.path}
                        icon="upload"
                        removeHandler={() => {
                          getTempData.map((item, index) => {
                            uploadServer(item.data, index);
                          },
                          alert("data stored"))
                        }}
                        color={COLORS.RED}
                        size={20}
                        playicon="play"
                      />
                    </Card>
                  ))}
              </ScrollView>
            ) : (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{ color: 'gray' }}>
                  No video found. Press + button to add new video.
                </Text>
              </View>
            )}
          </>
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToPrps = (state, props) => {
  return { playlist: state };
};

const mapDispatchToPrps = (dispatch) => {
  return {
    savePlaylist: (finalresult, id) =>
      dispatch({ type: 'ADD_VIDEO', video: finalresult, id: id }),
      removePlaylist: (data, path) =>
      dispatch({ type: 'REMOVE', id: data, path: path })
  };
};

export default connect(mapStateToPrps, mapDispatchToPrps)(PlaylistFunction);

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
