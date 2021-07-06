import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { View, Text, PixelRatio, StyleSheet, Button, Image, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import RNFS from 'react-native-fs';
import Video from 'react-native-video';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MatIcons from 'react-native-vector-icons/MaterialIcons';
import VideoPlayer from 'react-native-video-player';
import DateTimePickerModal from "react-native-modal-datetime-picker";
// import App from '../App';
import { Insert } from './Db/Insert';
import { openDatabase } from 'react-native-sqlite-storage';
import AddClip from './AddClip';
import NumericInput from 'react-native-numeric-input'
import { WriteMeta } from './Write/Main';
import { Check } from './Write/Check';
import { readMeta } from './Write/ReadMeta';
import { ObjectConv } from './Write/ObjectConv';

var db = openDatabase('SaadFyp.db');
const wWidth = Dimensions.get('window').width;
const wHeight = Dimensions.get('window').height;
const Tab = createBottomTabNavigator();
var pt;
var vNm
var vidname;
const TabTop = ({ navigation, route }) => {
  const { vPth } = route.params;
  const { vName } = route.params;
  pt = vPth;
  vNm = vName;
  return (
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
      <Tab.Navigator tabBarOptions={{ style: { height: 50, backgroundColor: 'transparent', } }}>

        <Tab.Screen name="VideoData" component={VidPlayer}
          options={{
            //   tabBarLabel: 'Test',
            tabBarIcon: ({ color, size }) => (
              <MatIcons name="video-settings" color={'white'} size={30} />
            )
          }} />
        <Tab.Screen name="ClipMeta"
          initialParams={{ vPat: pt }}
          component={AddClip}
          options={{
            //   tabBarLabel: 'Test',
            tabBarIcon: ({ color, size }) => (
              <MatIcons name="featured-video" color={'white'} size={30} />
            )
          }} />
      </Tab.Navigator>
    </LinearGradient>
  )
}
export default TabTop;

function VidPlayer({ navigation }) {
  const [vDate, setvDate] = useState('');
  const [vDura, setvDura] = useState('');
  const [vDay, setvDay] = useState(1);
  const [vMonth, setvMonth] = useState(1);
  const [vYear, setvYear] = useState(2020);
  const [videoName, setVideoName] = useState(vNm);
  const [vPeople, setvPeople] = useState('');
  const [vEvent, setvEvent] = useState('');
  const [vLocation, setvLocation] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [check, setCheck] = useState(true);

  
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        //  'DROP TABLE IF EXISTS Videometa', 
        'CREATE TABLE IF NOT EXISTS Videometa(vid INTEGER PRIMARY KEY AUTOINCREMENT,vpath TEXT,vname TEXT,vlocation TEXT,vday INTEGER,vmonth INTEGER,vyear INTEGER,vpeople TEXT,vevent TEXT,vduration TEXT)',
        [],
        (tx, results) => {
          console.log('createdD', results);
        }
        // 'DROP TABLE IF EXISTS Videometa', []
      );
      console.log('PT Vid', pt)
      //  AddClip(pt);

    });
  }, []);
  const showStudent = () => {

    db.transaction(function (tx) {
      console.log('helo andar');
      tx.executeSql(
        'select * from Videometa',
        [],
        (tx, results) => {

          for (let i = 0; i < results.rows.length; ++i)
            console.log('Results', results.rows.item(i));
        }
      );
    });
  }
  const writeData =()=>{
    let obj={Path:pt,vName:videoName,Loc:vLocation,Day:vDay,Month:vMonth,Year:vYear,People:vPeople,Event:vEvent,Dura:vDura}
    // ObjectConv(obj);
    // Check(obj,pt);
    Insert('Videometa', 'vpath,vname,vlocation,vday,vmonth,vyear,vpeople,vevent,vduration', [pt, videoName, vLocation,vDay,vMonth,vYear, vPeople, vEvent,vDura.toString()], '?,?,?,?,?,?,?,?,?')
    
  }
  const checkingExist = () => {
    db.transaction(function (txn) {
      txn.executeSql(
        'SELECT * FROM Videometa WHERE vpath=?',
        [pt],
        (txn, results) => {
          setCheck(false);
          for (let i = 0; i < results.rows.length; ++i)
            console.log('Checkkkk', results.rows.item(i)['vname']);
        }
      );
    })
  }
  const onLoadvid = (data) => {
    console.log('onLoad');
    setvDura(data.duration);
    console.log('DURATION:', vDura);
    console.log('Natural Size:', data.naturalSize);
  }
  const onProgressVid = (data) => {
    console.log('Clip onProgress');
    // console.log('on Progress',(data.currentTime / vDura));
  }
  let size = 56;
  // let obj = {id:1,name:'saad'};
  return (
    <View style={{ flex: 1, width: '100%' }}>
      <LinearGradient
        start={{ x: 1, y: 0 }} //here we are defined x as start position
        end={{ x: 0, y: 0 }} //here we can define axis but as end position
        colors={['black', 'midnightblue']}
        style={{
          height: '100%',
          width: '100%',
          // justifyContent: 'center',
          // alignItems: 'center',
          // borderRadius: 30,
        }}>
        <View style={{ flex: 1 }}>

          <View style={{
            // alignItems: 'center', justifyContent: 'center',
            position: 'relative', flex: 1,width:'95%',left:10
          }}>

               <VideoPlayer
                style={styles.backgroundVideo} 
                // ref={player}
                video={{ uri: pt }}
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
          <View style={{ flexDirection: 'row', top: 10, position: 'relative' }}>
            {/* <Text style={{fontSize:20,margin:5,color:'darkolivegreen'}}>DD-MM-YY{'\n'}</Text> */}
            <Text style={{ padding: 5, fontSize: 14, color: 'white',fontStyle:'italic' }}>     DATE{'\n'}(DD-MM-YY) </Text>
            <NumericInput type='up-down' totalWidth={90} rounded={true} totalHeight={50} value={vDay} borderColor={'red'} textColor={'white'} minValue={1} maxValue={31} onChange={value => { setvDay(value); console.log('Day', value) }} /><Text>  </Text>
            <NumericInput type='up-down' totalWidth={90} rounded={true} totalHeight={50} value={vMonth} borderColor={'red'} textColor={'white'} minValue={1} maxValue={12} onChange={value => { setvMonth(value); console.log('Month', value) }} /><Text>  </Text>
            <NumericInput type='up-down' totalWidth={90} rounded={true} totalHeight={50} value={vYear} borderColor={'red'} textColor={'white'} minValue={1999} maxValue={2021} onChange={value => { setvYear(value); console.log('Year', value) }} />

          </View>
          <View style={{ position: 'relative', top: 10 }}>
            <TextInput onChangeText={(t) => setVideoName(t)} value={videoName} placeholder='Name' style={styles.tex} placeholderTextColor='white' />
            <TextInput onChangeText={(t) => setvPeople(t)} value={vPeople} placeholder='People' style={styles.tex} placeholderTextColor='white' />
            <TextInput onChangeText={(t) => setvEvent(t)} value={vEvent} placeholder='Event' style={styles.tex} placeholderTextColor='white' />
            <TextInput onChangeText={(t) => setvLocation(t)} value={vLocation} placeholder='Location' style={styles.tex} placeholderTextColor='white' />
            {/* <TouchableOpacity style={{ backgroundColor: 'orange',width:180,height:30,left:200, justifyContent: 'center',  borderTopLeftRadius: 30, borderBottomRightRadius: 40 }}
            onPress={() => navigation.navigate('ClipMeta', {
              vPath: pt
            })}>
            <Text style={{ fontSize: 20 }}>   Add a Clip   </Text>
          </TouchableOpacity> */}
          </View>
          <View style={{ alignItems: 'center', flexDirection: 'row', position: 'relative', top: 10, left: 30 }}>
            {/* <TouchableOpacity
            onPress={() => Insert('Videometa', 'vpath,vname,vlocation,vday,vmonth,vyear,vpeople,vevent,vduration', [pt, videoName, vLocation,vDay,vMonth,vYear, vPeople, vEvent,vDura.toString()], '?,?,?,?,?,?,?,?,?')}
            style={{ backgroundColor: 'lightcoral', width: 140, height: 70, borderRadius: 50, alignItems: 'center' }}>
            <Text style={{ padding: 2, margin: 20, fontSize: 20, color: 'white' }}>Save</Text>
          </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => {
                //  showStudent();
                // Check('saad', pt);
                writeData();
              }}
              //checkingExist();
              style={{ left:10,width: 140, height: 70, alignItems: 'center' }}>
              <LinearGradient
                start={{ x: 1, y: 0 }} //here we are defined x as start position
                end={{ x: 0, y: 0 }} //here we can define axis but as end position
                colors={['#3393E4', '#715886']}
                style={{
                  height: '60%',
                  width: '80%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 30,
                }}>
                <Text style={{ padding: 2, fontSize: 20, color: 'white',fontStyle:'italic' }}>Write</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                //  showStudent();
                // Check('saad', pt);
                // readMeta(pt);
                navigation.navigate("All Edited Clips", {
                  vPthh:pt});
              }}
              //checkingExist();
              style={{ left:10,width: 160, height: 70, alignItems: 'center' }}>
              <LinearGradient
                start={{ x: 1, y: 0 }} //here we are defined x as start position
                end={{ x: 0, y: 0 }} //here we can define axis but as end position
                colors={['#3393E4', '#715886']}
                style={{
                  height: '60%',
                  width: '80%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 30,
                }}>
                <Text style={{ padding: 2, fontSize: 17, color: 'white',fontStyle:'italic' }}>This Video Clips</Text>
              </LinearGradient>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => {
                //  showStudent();
                readMeta(pt, size);
                //  WriteMeta('ad',pt) 
              }}
              //checkingExist();
              style={{ backgroundColor: 'lightcoral', width: 140, height: 70, borderRadius: 50, alignItems: 'center' }}>
              <Text style={{ padding: 2, margin: 20, fontSize: 20, color: 'white' }}>Read</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </LinearGradient>
      {/* <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 40 }}>hassan</Text>
          <NumericInput type='up-down' totalWidth={90} rounded={true} totalHeight={40} value={vDay} borderColor={'darkolivegreen'} minValue={1} maxValue={31} onChange={value => { setvDay(value); console.log('Day', value) }} /><Text>  </Text>
          <NumericInput type='up-down' totalWidth={90} rounded={true} totalHeight={40} value={vMonth} borderColor={'darkolivegreen'} minValue={1} maxValue={12} onChange={value => { setvMonth(value); console.log('Month', value) }} /><Text>  </Text>
          <NumericInput type='up-down' totalWidth={90} rounded={true} totalHeight={40} value={vYear} value={1999} borderColor={'darkolivegreen'} minValue={1999} maxValue={2021} onChange={value => { setvYear(value); console.log('Month', value) }} />
        </View> */}

    </View>


  )
}


const styles = StyleSheet.create({
  tex: {left:25,
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
  backgroundVideo: {
    position: 'relative',
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderColor: 'white'
  },
  backgroundImage: {
    width: wWidth,
    height: wHeight,
    position: 'absolute'
  },
  datePickerStyle: {
    margin: 30,
    width: 200,
    // marginTop: 20,
    //op:50,
    backgroundColor: 'white'
  },
});