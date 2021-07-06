import React,{useEffect,useState} from 'react';
import { View, Text,TouchableOpacity,FlatList,Image } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import Video from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';

var db = openDatabase('SaadFyp.db');
export const AllVideos =({navigation})=>{
    const [AllData, setAllData] = useState([]);
    const [allVid, setAllVid] = useState([]);
    const showVideos = () => {
        const cc='';
        db.transaction(function (tx) {
            console.log('helo andar');
            tx.executeSql(
                'select * from Videometa',
                [],
                
                (tx, results) => {
                    var temp=[];
                    var temp1=[];
                    for (let i = 0; i < results.rows.length; ++i){
                    // console.log('Results', results.rows.item(i)); 
                    temp.push(results.rows.item(i)['vpath']);
                    temp1.push(results.rows.item(i));
                } 
                setAllData(temp1);
                console.log('Tempp', temp1); 
                console.log('paths',temp);
                // setAllVid(temp);
                })
            
        });
      }
      useEffect(function() {
         showVideos();
    }, []);
    return(<View>
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
        <View style={{flex:1}}>
            <View style={{flex:0.5}}>
            <FlatList
        data={AllData}
        numColumns={4}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
            <TouchableOpacity
            onPress={() =>navigation.navigate("ShowVideo",{
                vId: item.vid,
                vPath : item.vpath,
                vName: item.vname,
                vEvent: item.vevent,
                vDay: item.vday,
                vMonth: item.vmonth,
                vYear: item.vyear,
                vPeople: item.vpeople,
                vLocation:item.vlocation,
                vDuration:item.vduration
            })
            //   getVidName(item)
            }>
              <Image style={{ width: 89, height: 110, margin: 5,borderWidth:1,borderColor:'white'}} source={{uri : item.vpath}} />
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