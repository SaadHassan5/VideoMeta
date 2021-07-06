import React, { useEffect, useState } from 'react'
import { NavigationContainer,useIsFocused } from '@react-navigation/native';
import { Dimensions } from 'react-native';
// import RNFS from 'react-native-fs';
import Video from 'react-native-video';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, TextInput } from 'react-native'
import { Insert } from './Db/Insert';
const wWidth = Dimensions.get('window').width;
const wHeight = Dimensions.get('window').height;
import { openDatabase } from 'react-native-sqlite-storage';
import LinearGradient from 'react-native-linear-gradient';
import VideoPlayer from 'react-native-video-player';

// import { VideoPlayer, Trimmer } from 'react-native-video-processing';
var db = openDatabase('SaadFyp.db');

const AddClip = ({ navigation
  , route
}) => {
  const isFocused = useIsFocused();
  const [videoName, setVideoName] = useState('');
  const [cTitle, setcTitle] = useState('');
  const [cPeople, setcPeople] = useState('');
  const [cEvent, setcEvent] = useState('');
  const [cRun, setcRun] = useState(false);
  const [cStart, setcStart] = useState(0);
  const [cEnd, setcEnd] = useState(0);
  const [cTimePick, setcTimePick] = useState(0);
  const [checker, setChecker] = useState(true);
  const [vDura, setvDura] = useState('');
  const [cCon1, setcCon1] = useState('start');
  const [cLocation, setcLocation] = useState('');
  const Changer = () => {
    setChecker(true)
  }
  useEffect(() => {
    db.transaction(function (txn) {

      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS Clipmeta(vname VARCHAR(40),vpath VARCHAR(40),cid INTEGER PRIMARY KEY AUTOINCREMENT,ctitle VARCHAR(40),cpeople VARCHAR(40),cevent VARCHAR(40),clocation VARCHAR(40),cstartdura INTEGER,cenddura INTEGER)',
        []
        // 'DROP TABLE IF EXISTS Clipmeta', []
      );
      console.log('Prop',route.params?.vPat)
      // console.log('VPaath', vPath);

    });
  }, [route.params?.vPat]);
  const showClip = () => {
    console.log('START TIME:',cStart);
    console.log('END TIME:',cEnd);
    db.transaction(function (tx) {
      console.log('helo andar');
      tx.executeSql(
        'select * from Clipmeta',
        [],
        (tx, results) => {

          for (let i = 0; i < results.rows.length; ++i)
            console.log('Results', results.rows.item(i));
        }
      );
    });
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
  setcStart(0);
  setcEnd(0);
  setcCon1('start');
}
  const manageData = () => {
    const splitArray = route.params?.vPat
    // vPath;
    const splittedArray = splitArray.split('/')
    const vidNm = splittedArray[splittedArray.length - 1]
    //  console.log('Staaaaaart',cStartDura);
    //  console.log('Enddddd',cEndDura);
    if(cStart < cEnd){
    Insert('Clipmeta', 'vname,vpath,ctitle,cpeople,cevent,clocation,cstartdura,cenddura', [vidNm, route.params?.vPat, cTitle, cPeople, cEvent,cLocation, cStart, cEnd], '?,?,?,?,?,?,?,?')
    }
    else{
      console.log(cStart,'  ',cEnd);
    console.warn('Invalid Clip Time');}
  }
  const onProgressVid = (p) =>{
    console.log('Clip onProgress',p.currentTime);
    setcTimePick(p.currentTime)
    // if(p.currentTime > 5){
    //  p.currentTime=0;
    // }
    // console.log('on Progress',(data.currentTime / vDura));
  }
  const onLoadvid=(data)=>{
    console.log('Clip onLoad');
    setvDura(data.duration);
    console.log('DURATION:',vDura);
    data.currentPosition =0;
  }
  return (
    <View style={{flex:1}}>
      <LinearGradient
              start={{ x: 1, y: 0 }} //here we are defined x as start position
              end={{ x: 0, y: 0 }} //here we can define axis but as end position
              colors={['black', 'navy']}
              style={{
                height: '100%',
                width:'100%',
                // justifyContent: 'center',
                // alignItems: 'center',
                // borderRadius: 30,
              }}>
      <View style={{position:'relative'}}>
        {isFocused?
      <VideoPlayer
      style={styles.backgroundVideo} 
      video={{ uri: route.params?.vPat }}
      // autoplay
      onLoad={(t) => onLoadvid(t)}
      onProgress={(p) => onProgressVid(p)}
      // controlsTimeout
      // duration={5}
      disableSeek={false}
      videoWidth={1600}
      videoHeight={900}
    />
          :
          <Text>Paused</Text>
        }
      </View>
      <View style={{alignItems:'center',top:10,position:'relative'}}>
          <LinearGradient
              start={{ x: 1, y: 0 }} //here we are defined x as start position
              end={{ x: 0, y: 0 }} //here we can define axis but as end position
              colors={['#3393E4', '#715886']}
              style={{
                height: '30%',
                width:'40%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 9,
              }}>
            {cCon1=='start'&&
            <TouchableOpacity style={styles.pick} onPress={()=> startPick()}>
          <Text style={{padding:5,fontSize:18,color:'white',fontStyle:'italic'}}>Click to Pick Start Time</Text>
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
      <View style={{ bottom:50,position:'absolute' }}>
        <TextInput onChangeText={(t) => setcTitle(t)} placeholder='Title' style={styles.tex} placeholderTextColor='white' />
        <TextInput onChangeText={(t) => setcPeople(t)} placeholder='People' style={styles.tex} placeholderTextColor='white' />
        <TextInput onChangeText={(t) => setcEvent(t)} placeholder='Event' style={styles.tex} placeholderTextColor='white' />
        <TextInput onChangeText={(t) => setcLocation(t)} placeholder='Location' style={styles.tex} placeholderTextColor='white' />
      </View>
      <View style={{ flexDirection: 'row',top:175,left:90 }}>
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
                  left:30
                }}>
        <TouchableOpacity onPress={() => { manageData(); }} >
          <Text style={{ padding: 5, fontSize: 20, color: 'white',fontStyle:'italic' }}>Save</Text>
        </TouchableOpacity>
        </LinearGradient>
        {/* <TouchableOpacity onPress={() => showClip()} style={{ marginLeft: 20, top: 30, backgroundColor: 'lightcoral', width: 140, height: 70, borderRadius: 50, alignItems: 'center' }}>
          <Text style={{ padding: 2, margin: 20, fontSize: 20, color: 'white' }}>Show</Text>
        </TouchableOpacity> */}
      </View>
      </LinearGradient>
    </View>
    // <View style={{backgroundColor:'white',flex:1}}>
    //   <TouchableOpacity onPress={()=>setChecker(!checker)}>
    //       <Text style={{fontSize:30}}>change</Text>
    //   </TouchableOpacity>

    //   {checker?<Text> YE wala</Text>
    //   :
    //   <Text>Ni YE wala</Text>

    //   }
    //   </View>
    //   setChecker(false)
  )
}
export default AddClip;
const styles = StyleSheet.create({
  tex: {
    left:25,
    borderTopLeftRadius: 35,
    borderBottomRightRadius: 35,
    padding: 15,
    color: 'white',
    margin: 15,
    width: 300,
    height: 45,
    borderColor:'white',
    borderWidth: 2,
    backgroundColor: 'transparent',
    position: 'relative',
    fontStyle:'italic'
  },
  pick:{
    // backgroundColor:'palegoldenrod',
    paddingLeft:10,paddingRight:10,paddingBottom:5,
    // borderTopRightRadius:35,borderBottomLeftRadius:35,
  },
  backgroundImage: {
    width: wWidth,
    height: wHeight,
    position: 'absolute'
  },
  backgroundVideo: {

    // backgroundColor: 'honeydew',
    position: 'relative',
    top: 0,
    left: 4,
    bottom: 0,
    right: 0,
    width: wWidth-10,
    // //  aspectRatio:1.5,
    height: 200,
    borderWidth:2,
    borderColor:'white'
    // backgroundColor: 'cyan'
  }
});
