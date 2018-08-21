import React from 'react';
import { Text, View, Image, TouchableOpacity, Button } from 'react-native';

class Navigation extends React.Component {
  render(){
    return(
      <View style={{display:'flex', flexDirection:'row', justifyContent:'space-around', width:'100%', position:'absolute', bottom:30}}>
        <Image source={require('../assets/reminders.png')} style={{width:40, height:40}}>
        </Image>
        <TouchableOpacity onPress={this.props.changeToHome}>
          <Image source={require('../assets/enso.png')} style={{width:40, height:40}}>
          </Image>
        </TouchableOpacity>

        <Image source={require('../assets/progress.png')} style={{width:40, height:40}}>
        </Image>


      </View>
    )
  }
}

export Default Navigation
