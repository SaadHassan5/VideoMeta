import React, { useEffect, useState, useRef } from 'react';
import { Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { openDatabase } from 'react-native-sqlite-storage';
import SearchBar from "react-native-dynamic-search-bar";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, FlatList, ScrollView, SafeAreaView } from 'react-native'
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import CameraRoll from "@react-native-community/cameraroll";
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/dist/Fontisto';
import Iconn from 'react-native-vector-icons/dist/FontAwesome5';
import Iconnn from 'react-native-vector-icons/dist/Entypo';
import Iconnnn from 'react-native-vector-icons/dist/MaterialCommunityIcons';

// import { SearchMeta } from './Db/SearchMeta';
var db = openDatabase('SaadFyp.db');
var allPaths = "";
// import AddClip from './AddClip';
const wWidth = Dimensions.get('window').width;
const wHeight = Dimensions.get('window').height;
// const Stack = createStackNavigator();


const FsTest = ({ navigation }) => {
  const [AllData, setAllData] = useState([]);
  const [allVid, setAllVid] = useState([]);
  const [check, setCheck] = useState(true);
  const [search, setSearch] = useState('');
  const [cSearched, setcSearched] = useState([]);
  const [vSearched, setvSearched] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [vclicked, setvClicked] = useState(false);
  const [notclicked, setnotClicked] = useState(true);
  let fl = useRef();
  const getVideos = () => {
    CameraRoll.getPhotos({
      first: 60,
      assetType: 'Videos',
    })
      .then(r => {
        // conFunc(r.edges)
        setAllVid(r.edges);
        // console.log(r.edges.node.group_name);
      })
      .catch((err) => {
        //Error Loading Images
      });
  };
  const conFunc = (i) => {
    db.transaction(function (tx) {
      // console.log('helo andar');
      tx.executeSql(
        'select * from Videometa where vpath=?',
        [i],

        (tx, results) => {
          if (results.rows.length > 0) {
            console.log('Aa gai aan');
            setCheck(false);
          }
          else
            console.log('Kiu nai');
        })
    })
  }
  useEffect(function () {
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

    });
    getVideos();
  }, []);
  const getVidName = (i) => {
    const splitArray = vclicked ? i?.vpath : i?.node?.image?.uri;
    const splittedArray = splitArray.split('/')
    const vidNm = splittedArray[splittedArray.length - 1]
    // console.log('spAray',splitArray)

    // console.log('sppppAray',splittedArray)
    //   console.log('GroupName',i.node.image.uri)
    db.transaction(function (tx) {
      // console.log('helo andar');
      tx.executeSql(
        'select * from Videometa where vpath=?',
        [splitArray],

        (tx, results) => {
          var temp;
          if (results.rows.length > 0) {
            temp = results.rows.item(0);
            // setAllData(temp);
            // console.log('ye wala ',temp.vname);
            navigation.navigate("ShowVideo", {
              vId: temp.vid,
              vPath: temp.vpath,
              vName: temp.vname,
              vEvent: temp.vevent,
              vDay: temp.vday,
              vMonth: temp.vmonth,
              vYear: temp.vyear,
              vPeople: temp.vpeople,
              vLocation: temp.vlocation,
              vDuration: temp.vduration
            })
            console.log('Exist');
          }
          else {
            navigation.navigate('MetaData', {
              vPth: i.node.image.uri,
              vName: vidNm
            })
          }
        })
    })

    console.log('Name', vidNm)
  }
  const getClipName = (i) => {
    const splitArray = i?.vpath
    const splittedArray = splitArray.split('/')
    const vidNm = splittedArray[splittedArray.length - 1]
    db.transaction(function (tx) {
      console.log('helo andar');
      tx.executeSql(
        'select * from Clipmeta where cid=?',
        [i.cid],

        (tx, results) => {
          var temp;
          if (results.rows.length > 0) {
            temp = results.rows.item(0);
            console.log(temp);
            // setAllData(temp);
            // console.log('ye wala ',temp.vname);
            navigation.navigate("ShowClip", {
              // vPath: temp.vid,
              cid: temp.cid,
              vPath: temp.vpath,
              vName: temp.vname,
              cEvent: temp.cevent,
              cTitle: temp.ctitle,
              cStDura: temp.cstartdura,
              cEdDura: temp.cenddura,
              // vDay: temp.vday,
              // vMonth: temp.vmonth,
              // vYear: temp.vyear,
              cPeople: temp.cpeople,
              cLocation: temp.clocation,
              // vDuration: temp.vduration
            })
            console.log('Exist');
          }

        })
    })

    console.log('Name', vidNm)
  }
  const SearchMeta = (srch) => {
    if (srch != '') {
      var cStr = ""
      console.log('helo  ', srch);
      db.transaction((tx) => {

        tx.executeSql(
          // 'vpath,vname,vlocation,vday,vmonth,vyear,vpeople,vevent,vduration'
          'Select * from Videometa where vlocation like ? OR vname LIKE ? or vevent LIKE ?',
          [`%${srch}%`, `%${srch}%`, `%${srch}%`],
          (tx, results) => {
            var vtemp = [];
            setvClicked(true)
            for (let i = 0; i < results.rows.length; ++i) {
              // console.log('andr temp:',ctemp);

              vtemp.push(results.rows.item(i));
              // console.log('CSTR  :',cStr);
              console.log('Video Results', results.rows.item(i)['vpath']);
              setvClicked(true)
              // setnotClicked(false);
              // setSearch('');

            }
            setvSearched(vtemp);
          })
        // console.log('Select * from Clipmeta where clocation like ? or cevent like ? or cpeople ? or ctitle like ?');
        tx.executeSql(
          // 'Clipmeta', 'vname,vpath,ctitle,cpeople,cevent,clocation,cstartdura,cenddura
          'Select * from Clipmeta where clocation like ?  or cevent like ? or cpeople like ? or ctitle like ?'
          ,
          [`%${srch}%`, `%${srch}%`, `%${srch}%`, `%${srch}%`]
          ,
          (tx, results) => {
            console.log('Vich');
            var ctemp = [];
            for (let i = 0; i < results.rows.length; ++i) {
              // ctemp.push(results.rows.item(i)['vpath']);
              ctemp.push(results.rows.item(i));
              console.log('Clip Results', results.rows.item(i)['vpath']);
              setClicked(true);
              // setnotClicked(false);
              // setSearch('');
            }
            setcSearched(ctemp);

          })

      })
    }
    else {
      console.warn('Enter Text To Search');
      setClicked(false);
      setvClicked(false);
    }
    // navigation.navigate('ShowSearch',{
    //   clipM : cSearched,
    //   videoM : vSearched
    // });
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
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
        <View style={{ flex: 0.08, top: 5 }}>
          <TextInput ref={fl} onChangeText={(t) => setSearch(t)} placeholder={'Search Videos'} style={{ position: 'absolute', paddingLeft: 75, fontStyle: 'italic', fontSize: 20, borderRadius: 50, backgroundColor: 'white', left: 5, width: '98%', top: 5, height: '100%' }} />
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => { SearchMeta(search); }} style={{ left: 5, top: 5, width: 50, height: 50, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
              <Icon name="search" size={30} color="#111" style={{ backgroundColor: 'transparent', borderRadius: 20 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { fl.current.clear(); setvClicked(false); setClicked(false); setSearch('') }} style={{ left: 235, top: 5, width: 50, height: 50, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
              <Iconnn name="cross" size={40} color="#111" style={{ backgroundColor: 'transparent', left: 8, borderRadius: 20 }} />

            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('ShowSearch') }} style={{ left: 230, top: 5, width: 50, height: 50, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
              <Iconnnn name="filter-variant" size={40} color="#111" style={{ backgroundColor: 'transparent', left: 8, borderRadius: 20 }} />

            </TouchableOpacity>
          </View>

          {/* <TouchableOpacity onPress={()=>dealSearch()}>
          <Text style={{fontSize:15,color:'white'}}>Check</Text>
        </TouchableOpacity> */}
        </View>
        <View style={{ flex: 1, top: 0 }}>
          {vclicked &&
            <LinearGradient
              start={{ x: 0, y: 0 }} //here we are defined x as start position
              end={{ x: 0, y: 1 }} //here we can define axis but as end position
              colors={['red', 'black']}
              style={{
                height: '6%',
                width: '55%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 9,
                // justifyContent: 'center',
                // alignItems: 'center',
                // borderRadius: 30,
                top: 25, left: 65,
              }}>
              <Text style={{ position: 'relative', fontSize: 30, color: 'white', fontWeight: 'bold', fontStyle: 'italic' }}>Videos </Text>
            </LinearGradient>
          }
          <FlatList
            data={vclicked ? vSearched : allVid}
            // ref={fl}

            numColumns={4}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) =>
            (
              //  {conFunc()}

              <TouchableOpacity
                onPress={() =>
                  getVidName(item)
                  // fl.current.scrollToIndex({animated:true,index:7,viewOffset:1,viewPosition:0.5})
                }>
                <Iconn name="play-circle" size={50} color="white" style={{ top: 90, left: 25, zIndex: 1001, backgroundColor: 'transparent', borderRadius: 20 }} />
                {/* <Image style={{width:100,height:120}} source={require('E:/ReactNative/MyProject/B612_20200729_192612_094.jpg')} />   */}
                <Image style={{ width: 89, height: 110, margin: 5, borderWidth: 1, borderColor: 'white' }} resizeMode={'stretch'} source={{ uri: vclicked ? item.vpath : item?.node?.image?.uri }} />
                {/* <Video style={{width:100,height:120}} source={{uri: item.node.image.uri}} paused={false}/>  */}

              </TouchableOpacity>
            )
            }
          />
          {clicked &&
            <View style={{ bottom: 190, left: 15, top: 24 }}>
              <LinearGradient
                start={{ x: 0, y: 0 }} //here we are defined x as start position
                end={{ x: 0, y: 1 }} //here we can define axis but as end position
                colors={['red', 'black']}
                style={{
                  height: '15%',
                  width: '55%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 9,
                  // justifyContent: 'center',
                  // alignItems: 'center',
                  // borderRadius: 30,
                  top: 25, left: 65,
                }}>
                <Text style={{ paddingLeft: 40, width: 180, fontSize: 30, color: 'white', fontWeight: 'bold', fontStyle: 'italic' }}>Clips </Text>
              </LinearGradient>
              <FlatList
                data={cSearched}
                // ref={fl}

                numColumns={4}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) =>
                (
                  //  {conFunc()}

                  <TouchableOpacity
                    onPress={() =>
                      getClipName(item)
                      // fl.current.scrollToIndex({animated:true,index:7,viewOffset:1,viewPosition:0.5})
                    }>
                    <Iconn name="play-circle" size={50} color="white" style={{ top: 90, left: 30, zIndex: 1001, backgroundColor: 'transparent', borderRadius: 20 }} />
                    {/* <Image style={{width:100,height:120}} source={require('E:/ReactNative/MyProject/B612_20200729_192612_094.jpg')} />   */}
                    <Image style={{ width: 89, height: 110, margin: 5, borderWidth: 1, borderColor: 'white' }} resizeMode={'stretch'} source={{ uri: item.vpath }} />
                    {/* <Video style={{width:100,height:120}} source={{uri: item.node.image.uri}} paused={false}/>  */}

                  </TouchableOpacity>
                )
                }

              />
            </View>
          }

          {/* <Image source={require('E:/ReactNative/MyProject/B612_20200729_192612_094.jpg')} />   */}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};
export default FsTest;
const styles = StyleSheet.create({
  backgroundImage: {
    width: wWidth,
    height: wHeight,
    position: 'absolute'
  }

})