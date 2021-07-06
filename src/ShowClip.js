import React, { useEffect, useState, useRef } from 'react';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, Dimensions, TextInput, RecyclerViewBackedScrollViewComponent } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import Video from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';
import NumericInput from 'react-native-numeric-input'
import { Update } from './Db/Update';
import { Check } from './Write/Check';
import VideoPlayer from 'react-native-video-player';
import { UpdateClip } from './Db/UpdateClip';

var db = openDatabase('SaadFyp.db');

const wWidth = Dimensions.get('window').width;
const wHeight = Dimensions.get('window').height;
export const ShowClip = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const { vPath } = route.params;
  const { vName } = route.params;
  const { cEvent } = route.params;
  const { cTitle } = route.params;
  // const { vDay } = route.params;
  // const { vMonth } = route.params;
  // const { vYear } = route.params;
  const { cLocation } = route.params;
  // const { vDuration } = route.params;
  const { cStDura } = route.params;
  const { cEdDura } = route.params;
  const { cPeople } = route.params;
  const [check, setCheck] = useState(true);
  const [cSt, setcSt] = useState('');
  // const [vDy, setvDay] = useState(vDay);
  // const [vMth, setvMonth] = useState(vMonth);
  // const [vYr, setvYear] = useState(vYear);
  const [videoNa, setVideoName] = useState(vName);
  const [cTitl, setcTitle] = useState(cTitle);
  const [cPeo, setcPeople] = useState(cPeople);
  const [cTimePick, setcTimePick] = useState(0);
  const [cEven, setcEvent] = useState(cEvent);
  const [cLoca, setcLocation] = useState(cLocation);
  const [cStart, setcStart] = useState(cStDura);
  const [cCon1, setcCon1] = useState('start');
  const [cRun, setcRun] = useState(false);
  const [cEnd, setcEnd] = useState(cEdDura);const player = useRef();
  useEffect(() => {
    let st = cStDura;
    console.log('chala', st * 2);
  }, [route])
  const updateData =()=>{
    if(cStart<cEnd ){
      setCheck(true);
  //     // 'Clipmeta', 'vname,vpath,ctitle,cpeople,cevent,clocation,cstartdura,cenddura
      UpdateClip(videoNa,vPath,cTitl,cPeo,cEven,cLoca,cStart,cEnd);
      navigation.navigate("All Edited Clips",{
        vPthh:vPath});}
        else console.warn('INVALID CLIP TIME');
  }
  const onLoadvid = (data) => {
    console.log('DURATION:', data.duration);
    // data.currentPosition =cStDura;
    console.log('Start',cStart);
    player.current.seek(cStart);
  }
  const onProgressVid = (p) => {
    if (p.currentTime > cEnd) {
      console.log('cEnd',cEdDura);
      console.log('yeeee');
      player.current.stop(cEdDura)
    }
  }
  const onSeekVid = (p) => {
    p.currentTime = 3
    console.log(p.cuurentTime);

  }
  
  const startPick = () =>{
    setcStart(cTimePick);
    setcCon1('end');
}
const endPick = () =>{
  setcEnd(cTimePick);
  setcCon1('cancel');
  setcRun(true);
}
const cancelPick = () =>{
  console.log('St:',cStart,' Ed:',cEnd);

setcStart(0);
setcEnd(0);
setcCon1('start');
}
const onProgressVid1 = (p) =>{
  console.log('Clip onProgress',p.currentTime);
  setcTimePick(p.currentTime)
}
const onLoadvid1=(data)=>{
  console.log('Clip onLoad');
  console.log('DURATION:',data.duration);
  data.currentPosition =0;
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

        {check ?
          <View style={{ flex: 1 }}>
            <View style={{ flex: 0.9, position: 'relative', top: 0, left: 5 }}>
              {/* <Video ref={player} style={styles.backgroundVideo}           
        //    onProgress={(p)=>onProgressVid(p)}
        // onSeek ={(t)=>onSeekVid(t)}
                    onLoad={(t) => {onLoadvid(t);}}
                    // {seek(cStdura)}
                     controls paused={false} volume={1} posterResizeMode='cover' repeat={false} source={{ uri: vPath }} /> */}
              <VideoPlayer
                style={styles.backgroundVideo} ref={player}
                video={{ uri: vPath }}
                // autoplay
                onLoad={(t) => onLoadvid(t)}
                onProgress={(p) => onProgressVid(p)}
                // controlsTimeout
                // duration={5}
                disableSeek={false}
                videoWidth={1600}
                videoHeight={900}
              />
            </View>
            <View style={{ top: 30, borderWidth: 2, borderColor: 'white', padding: 15, width: '95%', left: 10 }}>
              <View style={{ flexDirection: 'row', margin: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', fontStyle: 'italic' }}>Clip Duration :  </Text>
                <Text style={{ width: '50%', fontSize: 15, margin: 5, color: 'white', fontStyle: 'italic' }}>{cStDura} : {cEdDura}</Text>
              </View>
              <View style={{ flexDirection: 'row', margin: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', fontStyle: 'italic' }}>Title :  </Text>
                <Text style={{ width: '50%', fontSize: 15, margin: 5, color: 'white', fontStyle: 'italic' }}>{cTitle}</Text>
              </View>
              <View style={{ flexDirection: 'row', margin: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', fontStyle: 'italic' }}>Event :  </Text>
                <Text style={{ width: '50%', fontSize: 15, margin: 5, color: 'white', fontStyle: 'italic' }}>{cEvent}</Text>
              </View>
              <View style={{ flexDirection: 'row', margin: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', fontStyle: 'italic' }}>People :  </Text>
                <Text style={{ width: '50%', fontSize: 15, margin: 5, color: 'white', fontStyle: 'italic' }}>{cPeople}</Text>
              </View>
              <View style={{ flexDirection: 'row', margin: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', fontStyle: 'italic' }}>Location :  </Text>
                <Text style={{ width: '50%', fontSize: 15, margin: 5, color: 'white', fontStyle: 'italic' }}>{cLocation}</Text>
              </View>
              {/* <View style={{flexDirection:'row',margin:10}}>
          <Text style={{fontWeight:'bold',fontSize:20,color:'white',fontStyle:'italic'}}>Date :  </Text>
          <Text style={{width:'50%',fontSize:15,margin:5,color:'white',fontStyle:'italic'}}>{vDay} / {vMonth} / {vYear}</Text>
          </View> */}
            </View>
            <View style={{ top: 30, width: '80%', height: '10%', padding: 10, alignItems: 'center', justifyContent: 'center' }}>
              <LinearGradient
                start={{ x: 1, y: 0 }} //here we are defined x as start position
                end={{ x: 0, y: 0 }} //here we can define axis but as end position
                colors={['#3393E4', '#715886']}
                style={{
                  height: '100%',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 30,
                  left: 30
                }}>
                <TouchableOpacity style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={() => setCheck(false)}>
                  <Text style={{ padding: 5, fontSize: 18, color: 'white', fontStyle: 'italic' }}>UPDATE</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
          :
          <View style={{ flex: 0.4, position: 'relative', top: 0, left: 5 }}>
        {isFocused?
            <VideoPlayer style={styles.backgroundVideo}
            //  style={{
            //   position: 'relative',
            //   width: '95%', left: 10,
            //   height: '40%',
            //   borderWidth: 2,
            //   borderColor: 'white'
            // }}
              onLoad={(t) => {onLoadvid1(t);}}
               
              videoWidth={1600}
              videoHeight={900}
              onProgress={(p)=>onProgressVid1(p)}
                disableSeek={false}
                autoplay
              // posterResizeMode={'stretch'} controls
              repeat={true}
              paused={cRun} volume={1} video={{ uri: vPath }}           // Callback when video cannot be loaded *
            //  selectedTextTrack={{type:'resolution',value:480}}
            />
            
            :
            <Text>Khtam</Text> }
            {/* <View style={{ flexDirection: 'row', position: 'relative' }}> */}
            {/* <Text style={{fontSize:20,margin:5,color:'darkolivegreen'}}>DD-MM-YY{'\n'}</Text> */}
            {/* <Text style={{ fontSize: 15, left: 3, color: 'white', fontStyle: 'italic', padding: 2 }}>     DATE{'\n'}(DD-MM-YY) </Text>
              <NumericInput type='up-down' totalWidth={90} rounded={true} totalHeight={50} value={vDy} borderColor={'red'} textColor={'white'} minValue={1} maxValue={31} onChange={value => { setvDay(value); console.log('Day', value) }} /><Text>  </Text>
              <NumericInput type='up-down' totalWidth={90} rounded={true} totalHeight={50} value={vMth} borderColor={'red'} textColor={'white'} minValue={1} maxValue={12} onChange={value => { setvMonth(value); console.log('Month', value) }} /><Text>  </Text>
              <NumericInput type='up-down' totalWidth={90} rounded={true} totalHeight={50} value={vYr} borderColor={'red'} textColor={'white'} minValue={1999} maxValue={2021} onChange={value => { setvYear(value); console.log('Year', value) }} /> */}
            {/* <Text>saad</Text> */}
            {/* </View> */}
            <TextInput onChangeText={(t) => setcTitle(t)} placeholder={cTitle} style={styles.tex} placeholderTextColor={'white'} />
            <TextInput onChangeText={(t) => setcPeople(t)} placeholder={cPeople} style={styles.tex} placeholderTextColor='white' />
            <TextInput onChangeText={(t) => setcEvent(t)} placeholder={cEvent} style={styles.tex} placeholderTextColor='white' />
            <TextInput onChangeText={(t) => setcLocation(t)} placeholder={cLocation} style={styles.tex} placeholderTextColor='white' />
            <View style={{ flexDirection: 'row' }}>
              <LinearGradient
                start={{ x: 1, y: 0 }} //here we are defined x as start position
                end={{ x: 0, y: 0 }} //here we can define axis but as end p osition
                colors={['#3393E4', '#715886']}
                style={{
                  left:10,
                  height: '50%',
                  width: '23%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 9,
                  // left: 30
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
                  height: '50%',
                  width: '20%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 9,
                  left: 20
                }}>
                <TouchableOpacity onPress={() => setCheck(true)} style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ padding: 5, fontSize: 18, color: 'white', fontStyle: 'italic' }}>Cancel</Text>
                </TouchableOpacity>
              </LinearGradient>
              <LinearGradient
              start={{ x: 1, y: 0 }} //here we are defined x as start position
              end={{ x: 0, y: 0 }} //here we can define axis but as end position
              colors={['#3393E4', '#715886']}
              style={{
                left:40,
                height: '60%',
                width:'40%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 9,
              }}>
            {cCon1=='start'&&
            <TouchableOpacity style={styles.pick} onPress={()=> startPick()}>
          <Text style={{padding:5,fontSize:18,color:'white',fontStyle:'italic'}}>
            {`Click to Pick\n Start Time`}
            </Text>
          </TouchableOpacity>}
          {
          cCon1=='end'&&
          <TouchableOpacity style={styles.pick} onPress={()=> endPick()}>
          <Text style={{padding:5,fontSize:18,color:'white',fontStyle:'italic'}}>Click to Pick End Time</Text>
          </TouchableOpacity>
          }
          {
            cCon1=='cancel'&&
          <TouchableOpacity style={styles.pick} onPress={()=> cancelPick()}>
          <Text style={{padding:5,fontSize:18,color:'white',fontStyle:'italic'}}>Cancel</Text>
          </TouchableOpacity>
              }
              </LinearGradient>
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

    // position: 'relative',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: wWidth - 10,
    // //  aspectRatio:1.5,
    height: '100%',
    borderWidth: 2,
    borderColor: 'white'
    // backgroundColor:'red'
  }
});