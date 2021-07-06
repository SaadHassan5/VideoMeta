import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase('SaadFyp.db');
export const AllClips = ({ navigation, route }) => {
    const { vPthh } = route.params;
    const [AllData, setAllData] = useState([]);
    const [allVid, setAllVid] = useState([]);
    const showClip = () => {

        db.transaction(function (tx) {
            console.log('helo andar');
            tx.executeSql(
                'select * from Clipmeta where vpath=?',
                [vPthh],
                (tx, results) => {
                    var temp1 = []; var temp = [];
                    if (results.rows.length > 0) {
                        for (let i = 0; i < results.rows.length; ++i) {
                            // console.log('Results', results.rows.item(i)); 
                            temp.push(results.rows.item(i)['vpath']);
                            temp1.push(results.rows.item(i));
                        }
                    }
                    else
                    console.log('No Clips');
                    setAllData(temp1);
                    console.log('Tempp', temp1);
                }
            );
        });
    }
    useEffect(function () {
        showClip();
    }, []);
    return (
        <View>
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
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 0.5 }}>
                        <FlatList
                            data={AllData}
                            numColumns={4}
                            keyExtractor={(item, index) => index.toString()}
                            // vname VARCHAR(40),vpath VARCHAR(40),cid INTEGER PRIMARY KEY AUTOINCREMENT,ctitle VARCHAR(40),cpeople VARCHAR(40),cevent VARCHAR(40),clocation VARCHAR(40),cstartdura INTEGER,cenddura INTEGER
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                onPress={() =>navigation.navigate("ShowClip",{
                                    cid: item.cid,
                                    cTitle: item.ctitle,
                                    vPath : item.vpath,
                                    vName: item.vname,
                                    cEvent: item.cevent,
                                //     vDay: item.vday,
                                //     vMonth: item.vmonth,
                                //     vYear: item.vyear,
                                    cPeople: item.cpeople,
                                    cLocation:item.clocation,
                                    cStDura:item.cstartdura,
                                    cEdDura:item.cenddura
                                })
                                //   getVidName(item) 
                            }
                                >
                                    <Image style={{  width: 89, height: 110, margin: 5, borderWidth: 2, borderColor: 'white' }} source={{ uri: item.vpath }} />
                                    {/* <Video style={{width:100,height:120}} source={{uri: item}} paused={false}/> */}
                                    {/* <Video style={{width:100,height:120}} source={{uri: item.node.image.uri}} paused={false}/> */}
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </LinearGradient>
        </View>
    )
}