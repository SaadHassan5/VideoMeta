import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, Dimensions, TextInput } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import Video from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';
import NumericInput from 'react-native-numeric-input'
import { Update } from './Db/Update';
import { Check } from './Write/Check';
import VideoPlayer from 'react-native-video-player';


var db = openDatabase('SaadFyp.db');

const wWidth = Dimensions.get('window').width;
const wHeight = Dimensions.get('window').height;
export const ShowVideo = ({ navigation, route }) => {
  const { vId } = route.params;
  const { vPath } = route.params;
  const { vName } = route.params;
  const { vEvent } = route.params;
  const { vDay } = route.params;
  const { vMonth } = route.params;
  const { vYear } = route.params;
  const { vLocation } = route.params;
  const { vDuration } = route.params;
  const { vPeople } = route.params;
  const [check, setCheck] = useState(true);
  const [vDur, setvDura] = useState('');
  const [vDy, setvDay] = useState(vDay);
  const [vMth, setvMonth] = useState(vMonth);
  const [vYr, setvYear] = useState(vYear);
  const [videoNa, setVideoName] = useState(vName);
  const [vPeo, setvPeople] = useState(vPeople);
  const [vEven, setvEvent] = useState(vEvent);
  const [vLoca, setvLocation] = useState(vLocation);
  const player = useRef();
  useEffect(() => {
    // const player = videojs(playerRef.current, { autoplay: true, muted: true }, () => {
    //     player.src(vPath);});
  }, [])
  const updateData = () => {
    console.log('Vid', vDuration);
    setCheck(true);
    // tableName,name,location,day,month,year,people,event,path
    let obj = { Path: vPath, vName: vName, Loc: vLoca, Day: vDy, Month: vMth, Year: vYr, People: vPeo, Event: vEven, Dura: vDur }
    // Check(obj,vPath);
    Update(videoNa, vLoca, vDy, vMth, vYr, vPeo, vEven, vId);
    navigation.navigate("All Edited Videos");
  }
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        start={{ x: 1, y: 0 }} //here we are defined x as start position
        end={{ x: 0, y: 0 }} //here we can define axis but as end position
        colors={['black', 'navy']}
        style={{
          height: '100%',
          width: '100%',
          // justifyContent: 'center',
          // alignItems: 'center',
          // borderRadius: 30,
        }}>
        <View style={{ flex: 0.8, position: 'relative', width: '95%', height: '100%', top: 20, left: 8 }}>
          <VideoPlayer
            style={styles.backgroundVideo}
            // ref={player}
            video={{ uri: vPath }}
            // autoplay
            // onLoad={(t) => onLoadvid(t)}
            // onProgress={(p) => onProgressVid(p)}
            // controlsTimeout
            // duration={5}
            disableSeek={false}
            videoWidth={1600}
            videoHeight={900}
          />
        </View>
        {check ?
          <View>
            <View style={{ top: 50, borderWidth: 2, borderColor: 'white', padding: 15, width: '95%', left: 10 }}>
              <View style={{ flexDirection: 'row', margin: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', fontStyle: 'italic' }}>Video Name :  </Text>
                <Text style={{ width: '50%', fontSize: 15, margin: 5, color: 'white', fontStyle: 'italic' }}>{vName}</Text>
              </View>
              <View style={{ flexDirection: 'row', margin: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', fontStyle: 'italic' }}>Event :  </Text>
                <Text style={{ width: '50%', fontSize: 15, margin: 5, color: 'white', fontStyle: 'italic' }}>{vEvent}</Text>
              </View>
              <View style={{ flexDirection: 'row', margin: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', fontStyle: 'italic' }}>People :  </Text>
                <Text style={{ width: '50%', fontSize: 15, margin: 5, color: 'white', fontStyle: 'italic' }}>{vPeople}</Text>
              </View>
              <View style={{ flexDirection: 'row', margin: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', fontStyle: 'italic' }}>Location :  </Text>
                <Text style={{ width: '50%', fontSize: 15, margin: 5, color: 'white', fontStyle: 'italic' }}>{vLocation}</Text>
              </View>
              <View style={{ flexDirection: 'row', margin: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', fontStyle: 'italic' }}>Date :  </Text>
                <Text style={{ width: '50%', fontSize: 15, margin: 5, color: 'white', fontStyle: 'italic' }}>{vDay} / {vMonth} / {vYear}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', right: 30, top: 50, width: '80%', height: '16%', padding: 10, alignItems: 'center', justifyContent: 'center' }}>
              <LinearGradient
                start={{ x: 1, y: 0 }} //here we are defined x as start position
                end={{ x: 0, y: 0 }} //here we can define axis but as end position
                colors={['#3393E4', '#715886']}
                style={{
                  height: '100%',
                  width: '60%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 30, left: 70
                }}>
                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => setCheck(false)}>
                  <Text style={{ padding: 5, fontSize: 18, color: 'white', fontStyle: 'italic' }}>UPDATE</Text>
                </TouchableOpacity>
              </LinearGradient>
              <LinearGradient
                start={{ x: 1, y: 0 }} //here we are defined x as start position
                end={{ x: 0, y: 0 }} //here we can define axis but as end position
                colors={['#3393E4', '#715886']}
                style={{
                  height: '100%',
                  width: '60%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 30, left: 80
                }}>
                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() =>
                  navigation.navigate("All Edited Clips", {
                    vPthh: vPath
                  })}>
                <Text style={{ padding: 5, fontSize: 18, color: 'white', fontStyle: 'italic' }}>This Video Clips</Text>
              </TouchableOpacity>
              </LinearGradient>

          </View>
          </View>
      :
      <View style={{ top: 40, flex: 1.7 }}>
        <View style={{ flexDirection: 'row', position: 'relative' }}>
          {/* <Text style={{fontSize:20,margin:5,color:'darkolivegreen'}}>DD-MM-YY{'\n'}</Text> */}
          <Text style={{ fontSize: 15, left: 3, color: 'white', fontStyle: 'italic', padding: 2 }}>     DATE{'\n'}(DD-MM-YY) </Text>
          <NumericInput type='up-down' totalWidth={90} rounded={true} totalHeight={50} value={vDy} borderColor={'red'} textColor={'white'} minValue={1} maxValue={31} onChange={value => { setvDay(value); console.log('Day', value) }} /><Text>  </Text>
          <NumericInput type='up-down' totalWidth={90} rounded={true} totalHeight={50} value={vMth} borderColor={'red'} textColor={'white'} minValue={1} maxValue={12} onChange={value => { setvMonth(value); console.log('Month', value) }} /><Text>  </Text>
          <NumericInput type='up-down' totalWidth={90} rounded={true} totalHeight={50} value={vYr} borderColor={'red'} textColor={'white'} minValue={1999} maxValue={2021} onChange={value => { setvYear(value); console.log('Year', value) }} />

        </View>
        <View>
          <TextInput onChangeText={(t) => setVideoName(t)} placeholder={vName} style={styles.tex} placeholderTextColor={'white'} />
          <TextInput onChangeText={(t) => setvPeople(t)} placeholder={vPeople} style={styles.tex} placeholderTextColor='white' />
          <TextInput onChangeText={(t) => setvEvent(t)} placeholder={vEvent} style={styles.tex} placeholderTextColor='white' />
          <TextInput onChangeText={(t) => setvLocation(t)} placeholder={vLocation} style={styles.tex} placeholderTextColor='white' />
          <View style={{ flexDirection: 'row' }}>
            <LinearGradient
              start={{ x: 1, y: 0 }} //here we are defined x as start position
              end={{ x: 0, y: 0 }} //here we can define axis but as end position
              colors={['#3393E4', '#715886']}
              style={{
                height: '40%',
                width: '30%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 30,
                left: 30
              }}>
              <TouchableOpacity style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={() => updateData()}>
                <Text style={{ padding: 5, fontSize: 18, color: 'white', fontStyle: 'italic' }}>Done</Text>
              </TouchableOpacity>
            </LinearGradient>
            <LinearGradient
              start={{ x: 1, y: 0 }} //here we are defined x as start position
              end={{ x: 0, y: 0 }} //here we can define axis but as end position
              colors={['#3393E4', '#715886']}
              style={{
                height: '40%',
                width: '30%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 30,
                left: 50
              }}>
              <TouchableOpacity onPress={() => setCheck(true)} style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ padding: 5, fontSize: 18, color: 'white', fontStyle: 'italic' }}>Cancel</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </View>
          }
      </LinearGradient>
      </View >
  )
}
const styles = StyleSheet.create({
  tex: {
    left: 25,
    borderTopLeftRadius: 35,
    borderBottomRightRadius: 35,
    padding: 15,
    color: 'white',
    margin: 15,
    width: 300,
    height: 45,
    borderColor: 'white',
    borderWidth: 2,
    backgroundColor: 'transparent',
    position: 'relative',
    fontStyle: 'italic'
  },
  backgroundVideo: {
    position: 'relative',
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderColor: 'white'
  }
});