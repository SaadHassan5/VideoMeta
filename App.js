// In App.js in a new project

import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackground } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LinearGradient from 'react-native-linear-gradient';
import FsTest from './src/FsTest';
// import Screen1 from './src/Screen1';
// import Screen2 from './src/Screen2';
import VidPlayer from './src/VidPlayer';
import TabTop from './src/VidPlayer';
import AddClip from './src/AddClip';
// import SQLite from 'react-native-sqlite-storage';
import { AllClips } from './src/AllClips';
import { AllVideos } from './src/AllVideos';
import { ShowVideo } from './src/ShowVideo';
import { Update } from './src/Db/Update';
import { ShowClip } from './src/ShowClip';
import { ShowSearch } from './src/ShowSearch';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator( );
const CreateDrawer = () => {
  return (
    // <LinearGradient
    //           start={{ x: 1, y: 0 }} //here we are defined x as start position
    //           end={{ x: 0, y: 0 }} //here we can define axis but as end position
    //           colors={['black', 'navy']}
    //           style={{
    //             height: '100%',
    //             width:'100%',
    //             // justifyContent: 'center',
    //             // alignItems: 'center',
    //             // borderRadius: 30,
    //           }}>
                // <View style={{width:'20%',backgroundColor:'transparent'}}>
    <Drawer.Navigator overlayColor={'transparent'} backBehavior={'firstRoute'} drawerContentOptions={{
      labelStyle:{
        borderBottomRightRadius:90,
        borderWidth:2,
        borderColor:'white',
        fontStyle:'italic',
        padding:5,
        width:'100%',
        height:30,
        color:'white',
        // backgroundColor:'white'
      },
      borderWidth:4,
      borderColor:'white',
      activeTintColor: 'navy',
      backgroundColor:'black',
      itemStyle: { marginVertical: 30 },
    }}>
      <Drawer.Screen name="Gallery" component={StackNav} />
      <Drawer.Screen name="All Edited Videos" component={AllVideos} />
      {/* <Drawer.Screen name="All Edited Clips" component={AllClips} /> */}
    </Drawer.Navigator>
    // </View>
      //  </LinearGradient>
  )
}
const StackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Videos" component={FsTest} options={{
        headerStyle: {
          backgroundColor: '#040D3B',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }} />
      <Stack.Screen name="MetaData" component={TabTop} options={{
        headerStyle: {
          backgroundColor: '#040D3B',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}/>
      <Stack.Screen name="VidPlayer" component={VidPlayer} options={{
        headerStyle: {
          backgroundColor: '#040D3B',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}/>
      {/* <Stack.Screen name="VidUpdatePlayer" component={VidUpdatePlayer} /> */}
      <Stack.Screen name="ClipMeta" component={AddClip} options={{
        headerStyle: {
          backgroundColor: '#040D3B',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}/>
      <Stack.Screen name="All Edited Videos" component={AllVideos} options={{
        headerStyle: {
          backgroundColor: '#040D3B',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}/>
      <Stack.Screen name="All Edited Clips" component={AllClips} options={{
        headerStyle: {
          backgroundColor: '#040D3B',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}/>
      <Stack.Screen name="ShowVideo" component={ShowVideo} options={{
        headerStyle: {
          backgroundColor: '#040D3B',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },}}/>
        <Stack.Screen name="ShowClip" component={ShowClip} options={{
          headerStyle: {
            backgroundColor: '#040D3B',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
      }}/>
      <Stack.Screen name="ShowSearch" component={ShowSearch} options={{
          headerStyle: {
            backgroundColor: '#040D3B',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
      }}/>
    </Stack.Navigator>

  )
}
function App() {

  return (
    <NavigationContainer>
      {/* <StackNav/> */}
      <CreateDrawer />
      {/* <Tab.Navigator tabBarOptions={{
        style: {
          height: '9%',
          backgroundColor: 'royalblue',
          position:'relative',
          bottom:0,
          elevation:0
        },
        activeTintColor: '#000000',
        showLabel: false}} > */}
      {/* <Tab.Screen  name="main" component={Screen} options={{
          tabBarLabel: 'Lets Begin',
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="bower" color={color} size={size} />
          ) }}/>  */}
      {/* <Tab.Screen  name="Gallery" component={FsTest} options={{
          tabBarLabel: 'Test',
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="picture" color={color} size={20} />
          ) }}/> */}
      {/* <Tab.Screen name="FilePicker" component={Screen1} options={{
          tabBarLabel: 'File',
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="file-2" color={color} size={size} />
          ) }}/>
      <Tab.Screen name="Record" component={Screen2} options={{
          tabBarLabel: 'Record',
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="record" color={color} size={size} />
          ) }} /> */}
      {/* </Tab.Navigator> */}
    </NavigationContainer>
  );
}

export default App;
