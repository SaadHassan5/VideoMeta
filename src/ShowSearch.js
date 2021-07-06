import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, Dimensions, TextInput } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import Video from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';
import NumericInput from 'react-native-numeric-input'
import { Update } from './Db/Update';
import { Check } from './Write/Check';
import RadioButtonRN from 'radio-buttons-react-native';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/Fontisto';
import Iconn from 'react-native-vector-icons/dist/FontAwesome5';
import Iconnn from 'react-native-vector-icons/dist/Entypo';
import Iconnnn from 'react-native-vector-icons/dist/MaterialCommunityIcons';

var db = openDatabase('SaadFyp.db');

const wWidth = Dimensions.get('window').width;
const wHeight = Dimensions.get('window').height;
export const ShowSearch = ({ navigation }) => {
    const [nam, setNam] = useState('');
    const [even, setEven] = useState('');
    const [loc, setLoc] = useState('');
    const [peop, setPeop] = useState('');
    const [dat, setDat] = useState('');

    const [search, setSearch] = useState('');
    const [vChecked, setvChecked] = useState('include');
    const [checked, setChecked] = useState('exclude');
    const [evchecked, setevChecked] = useState('exclude');
    const [lochecked, setloChecked] = useState('exclude');
    const [pchecked, setpChecked] = useState('exclude');
    const [dchecked, setdChecked] = useState('exclude');
    const [cSearched, setcSearched] = useState([]);
    const [vSearched, setvSearched] = useState([]);
    const [clicked, setClicked] = useState(false);
    const [vclicked, setvClicked] = useState(false);
    const [cClicked, setcClicked] = useState(false);


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
    }, []);
    const readForSearch = () => {
        var query = "Select * from Videometa where 1=1";
        var queryC = "Select * from Clipmeta where 1=1";

        // var queryC="Sele"
        // const quesMarks="";
        if (vChecked == 'include') {
            if (checked == 'include') {
                query = query + " AND vname LIKE '%" + nam + "%'"
            }
            if (evchecked == 'include') {
                query = query + " AND vevent LIKE '%" + even + "%'"
            }
            if (lochecked == 'include') {
                query = query + " AND vlocation LIKE '%" + loc + "%'"
            }
            if (pchecked == 'include') {
                query = query + " AND vpeople LIKE '%" + peop + "%'"
            }
            console.log('Query', query);
            searchingVid(query, true);
        }
        else {
            if (checked == 'include') {
                queryC = queryC + " AND ctitle LIKE '%" + nam + "%'"
            }
            if (evchecked == 'include') {
                queryC = queryC + " AND cevent LIKE '%" + even + "%'"
            }
            if (lochecked == 'include') {
                queryC = queryC + " AND clocation LIKE '%" + loc + "%'"
            }
            if (pchecked == 'include') {
                queryC = queryC + " AND cpeople LIKE '%" + peop + "%'"
            }
            console.log('Query', queryC);
            searchingVid(queryC, false);
        }
    }
    const searchingVid = (query, con) => {
        if (con) {
            db.transaction((tx) => {

                tx.executeSql(
                    // 'vpath,vname,vlocation,vday,vmonth,vyear,vpeople,vevent,vduration'
                    query,
                    [],
                    (tx, results) => {
                        var flag = 0;
                        var vtemp = [];
                        for (let i = 0; i < results.rows.length; i++) {
                            // console.log('andr temp:',ctemp);

                            vtemp.push(results.rows.item(i));
                            // console.log('CSTR  :',cStr);
                            console.log('Video Results', results.rows.item(i)['vpath']);
                            // setnotClicked(false);
                            // setSearch('');
                            flag = 1;

                        }
                        if (flag == 1) {
                            setvClicked(true)
                            setvSearched(vtemp);
                            setClicked(true);
                        }
                    })
            })
        }
        else {
            console.log('clipppppppppppppp');
            db.transaction((tx) => {

                tx.executeSql(
                    // 'vpath,vname,vlocation,vday,vmonth,vyear,vpeople,vevent,vduration'
                    query,
                    [],
                    (tx, results) => {
                        var vtemp = [];
                        let flag = 0;
                        console.log(results.rows.length);
                        for (let i = 0; i < results.rows.length; i++) {
                            // console.log('andr temp:',ctemp);

                            vtemp.push(results.rows.item(i));
                            // console.log('CSTR  :',cStr);
                            console.log('Clip Results', i, results.rows.item(i)['vpath']);
                            flag = 1;
                            // setnotClicked(false);
                            // setSearch('');

                        }
                        if (flag == 1) {
                            setcClicked(true);
                        }
                        setcSearched(vtemp);
                        setClicked(true);
                        setcClicked(true);
                        console.log(vtemp);
                    })
            })

        }
    }
    const getVidName = (i) => {
        const splitArray = i?.vpath;
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
    return (
        <View style={{ flex: 1 }}>

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
                {clicked ?
                    <View style={{ flex: 1 }}>
                        {vclicked &&
                            <View style={{ flex: 1 }}>
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
                                <FlatList
                                    data={vSearched}
                                    // ref={fl}

                                    numColumns={4}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) =>
                                    (
                                        //  {conFunc()}

                                        <TouchableOpacity
                                        onPress={
                                            () =>
                                            getVidName(item)
                                        }
                                        >
                                            <Iconn name="play-circle" size={50} color="white" style={{ top: 90, left: 25, zIndex: 1001, backgroundColor: 'transparent', borderRadius: 20 }} />
                                            {/* <Image style={{width:100,height:120}} source={require('E:/ReactNative/MyProject/B612_20200729_192612_094.jpg')} />   */}
                                            <Image style={{ width: 89, height: 110, margin: 5, borderWidth: 1, borderColor: 'white' }} resizeMode={'stretch'} source={{ uri: item.vpath }} />
                                            {/* <Video style={{width:100,height:120}} source={{uri: item.node.image.uri}} paused={false}/>  */}

                                        </TouchableOpacity>
                                    )
                                    }
                                />
                            </View>

                        }
                        {cClicked &&
                            <View style={{ flex: 1 }}>
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
                                    <Text style={{ position: 'relative', fontSize: 30, color: 'white', fontWeight: 'bold', fontStyle: 'italic' }}>Clips </Text>
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
                                        onPress={
                                            () =>
                                            getClipName(item)
                                        }
                                        >
                                            <Iconn name="play-circle" size={50} color="white" style={{ top: 90, left: 25, zIndex: 1001, backgroundColor: 'transparent', borderRadius: 20 }} />
                                            {/* <Image style={{width:100,height:120}} source={require('E:/ReactNative/MyProject/B612_20200729_192612_094.jpg')} />   */}
                                            <Image style={{ width: 89, height: 110, margin: 5, borderWidth: 1, borderColor: 'white' }} resizeMode={'stretch'} source={{ uri: item.vpath }} />
                                            {/* <Video style={{width:100,height:120}} source={{uri: item.node.image.uri}} paused={false}/>  */}

                                        </TouchableOpacity>
                                    )
                                    }
                                />
                            </View>

                        }

                    </View>
                    :
                    <View style={{ flex: 1 }}>

                        <View style={{ flexDirection: 'row', left: 35, top: 20 }}>
                            <Text style={{ fontWeight: 'bold', color: 'white', fontStyle: 'italic', fontSize: 20, padding: 0, top: 3 }}>Search Video</Text>
                            <RadioButton

                                value="Include"
                                status={vChecked === 'include' ? 'checked' : 'unchecked'}
                                onPress={() => setvChecked('include')}
                                color={"orange"}

                                uncheckedColor={'white'}
                            // style={{color:'red'}}
                            />
                            <Text style={{ color: 'white', fontStyle: 'italic', left: 30, fontSize: 20, padding: 0, top: 3, position: 'relative' }}>Search Clip</Text>
                            <View style={{ left: 30 }}>
                                <RadioButton
                                    value="Exclude"
                                    status={vChecked === 'exclude' ? 'checked' : 'unchecked'}
                                    onPress={() => setvChecked('exclude')}
                                    color={"orange"}
                                    uncheckedColor={'white'}
                                />
                            </View>
                        </View>
                        {/* {vChecked==='include' */}

                        <View style={{ flexDirection: 'row', top: 60, left: 90 }}>
                            <Text style={{ color: 'white', fontStyle: 'italic', fontSize: 22, fontWeight: 'bold', right: 70 }}>Name</Text>
                            <Text style={{ color: 'white', fontStyle: 'italic', fontSize: 16, padding: 3, top: 3 }}>Include</Text>
                            <RadioButton

                                value="Include"
                                status={checked === 'include' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('include')}
                                color={"red"}

                                uncheckedColor={'white'}
                            // style={{color:'red'}}
                            />
                            <Text style={{ color: 'white', fontStyle: 'italic', fontSize: 16, padding: 3, top: 3 }}>Exclude</Text>
                            <RadioButton
                                value="Exclude"
                                status={checked === 'exclude' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('exclude')}
                                color={"red"}
                                uncheckedColor={'white'}
                            />
                        </View>
                        <View style={{ flex: 0.08 }}>
                            {checked === 'include' &&
                                <TextInput onChangeText={(t) => setNam(t)} placeholder='Search with Name'
                                    style={{ paddingLeft: 15, color: 'black', fontStyle: 'italic', fontSize: 12, borderRadius: 50, backgroundColor: 'white', left: 45, width: '65%', top: 55, height: '100%' }} placeholderTextColor='black' />}
                        </View>
                        <View style={{ flexDirection: 'row', top: 60, left: 93 }}>
                            <Text style={{ color: 'white', fontStyle: 'italic', fontSize: 22, fontWeight: 'bold', right: 70 }}>Event</Text>
                            <Text style={{ color: 'white', fontStyle: 'italic', fontSize: 16, padding: 3, top: 3 }}>Include</Text>
                            <RadioButton

                                value="Include"
                                status={evchecked === 'include' ? 'checked' : 'unchecked'}
                                onPress={() => setevChecked('include')}
                                color={"red"}

                                uncheckedColor={'white'}
                            // style={{color:'red'}}
                            />
                            <Text style={{ color: 'white', fontStyle: 'italic', fontSize: 16, padding: 3, top: 3 }}>Exclude</Text>
                            <RadioButton
                                value="Exclude"
                                status={evchecked === 'exclude' ? 'checked' : 'unchecked'}
                                onPress={() => setevChecked('exclude')}
                                color={"red"}
                                uncheckedColor={'white'}
                            />
                        </View>
                        <View style={{ flex: 0.08 }}>
                            {evchecked === 'include' &&
                                <TextInput onChangeText={(t) => setEven(t)} placeholder='Search with Event' style={{ paddingLeft: 15, color: 'black', fontStyle: 'italic', fontSize: 12, borderRadius: 50, backgroundColor: 'white', left: 45, width: '65%', top: 63, height: '100%' }} placeholderTextColor='black' />}
                        </View>
                        <View style={{ flexDirection: 'row', top: 65, left: 62 }}>
                            <Text style={{ color: 'white', fontStyle: 'italic', fontSize: 22, fontWeight: 'bold', right: 45 }}>Location</Text>
                            <Text style={{ color: 'white', fontStyle: 'italic', fontSize: 16, padding: 3, top: 3 }}>Include</Text>
                            <RadioButton

                                value="Include"
                                status={lochecked === 'include' ? 'checked' : 'unchecked'}
                                onPress={() => setloChecked('include')}
                                color={"red"}

                                uncheckedColor={'white'}
                            // style={{color:'red'}}
                            />
                            <Text style={{ color: 'white', fontStyle: 'italic', fontSize: 16, padding: 3, top: 3 }}>Exclude</Text>
                            <RadioButton
                                value="Exclude"
                                status={lochecked === 'exclude' ? 'checked' : 'unchecked'}
                                onPress={() => setloChecked('exclude')}
                                color={"red"}
                                uncheckedColor={'white'}
                            />
                        </View>
                        <View style={{ flex: 0.08 }}>
                            {lochecked === 'include' &&
                                <TextInput onChangeText={(t) => setLoc(t)} placeholder='Search with Location' style={{ paddingLeft: 15, color: 'black', fontStyle: 'italic', fontSize: 12, borderRadius: 50, backgroundColor: 'white', left: 45, width: '65%', top: 65, height: '100%' }} placeholderTextColor='black' />}
                        </View>
                        <View style={{ flexDirection: 'row', top: 70, left: 78 }}>
                            <Text style={{ color: 'white', fontStyle: 'italic', fontSize: 22, fontWeight: 'bold', right: 55 }}>People</Text>
                            <Text style={{ color: 'white', fontStyle: 'italic', fontSize: 16, padding: 3, top: 3 }}>Include</Text>
                            <RadioButton

                                value="Include"
                                status={pchecked === 'include' ? 'checked' : 'unchecked'}
                                onPress={() => setpChecked('include')}
                                color={"red"}

                                uncheckedColor={'white'}
                            // style={{color:'red'}}
                            />
                            <Text style={{ color: 'white', fontStyle: 'italic', fontSize: 16, padding: 3, top: 3 }}>Exclude</Text>
                            <RadioButton
                                value="Exclude"
                                status={pchecked === 'exclude' ? 'checked' : 'unchecked'}
                                onPress={() => setpChecked('exclude')}
                                color={"red"}
                                uncheckedColor={'white'}
                            />
                        </View>
                        <View style={{ flex: 0.08 }}>
                            {pchecked === 'include' &&
                                <TextInput onChangeText={(t) => setPeop(t)} placeholder='Search with People' style={{ paddingLeft: 15, color: 'black', fontStyle: 'italic', fontSize: 12, borderRadius: 50, backgroundColor: 'white', left: 45, width: '65%', top: 65, height: '100%' }} placeholderTextColor='black' />}
                        </View>
                        {/* {vChecked === 'include' &&
                            <View style={{ flex: 0.2 }}> */}
                                {/* <View style={{ flexDirection: 'row', top: 74, left: 98 }}>
                                    <Text style={{ color: 'white', fontStyle: 'italic', fontSize: 22, fontWeight: 'bold', right: 65 }}>Date</Text>
                                    <Text style={{ color: 'white', fontStyle: 'italic', fontSize: 16, padding: 3, top: 3 }}>Include</Text>
                                    <RadioButton

                                        value="Include"
                                        status={dchecked === 'include' ? 'checked' : 'unchecked'}
                                        onPress={() => setdChecked('include')}
                                        color={"red"}

                                        uncheckedColor={'white'}
                                    // style={{color:'red'}}
                                    />
                                    <Text style={{ color: 'white', fontStyle: 'italic', fontSize: 16, padding: 3, top: 3 }}>Exclude</Text>
                                    <RadioButton
                                        value="Exclude"
                                        status={dchecked === 'exclude' ? 'checked' : 'unchecked'}
                                        onPress={() => setdChecked('exclude')}
                                        color={"red"}
                                        uncheckedColor={'white'}
                                    />
                                </View> */}
                                {/* <View style={{ flex: 0.7 }}>
                                    {dchecked === 'include' &&
                                        <TextInput onChangeText={(t) => setDat(t)} placeholder='Search with Date' style={{ paddingLeft: 15, color: 'black', fontStyle: 'italic', fontSize: 12, borderRadius: 50, backgroundColor: 'white', left: 45, width: '65%', top: 68, height: '100%' }} placeholderTextColor='black' />}
                                </View>
                            </View> */}
                        {/* } */}
                        <View style={{ flex: 0.2, top: 90 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    //  showStudent();
                                    // Check('saad', pt);
                                    readForSearch();
                                }}
                                //checkingExist();
                                style={{ left: 100, width: 140, height: 70, alignItems: 'center' }}>
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
                                    <Text style={{ padding: 2, fontSize: 20, color: 'white', fontStyle: 'italic' }}>Search</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                }

            </LinearGradient>
        </View>
    )
}