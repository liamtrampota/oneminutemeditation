import React from 'react';
import { Text, View, Animated, Easing, Image, TouchableOpacity, Button } from 'react-native';

class Review extends React.Component {
  constructor(props){
    super(props);
    console.log(props)
    // this.state({
    //
    // })
  }

  render(){

    return(
      <View style={{display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text style={{position:'absolute', top:100, fontSize:35, textAlign:'center'}}>
          How was that for you?
        </Text>
        <View style={{backgroundColor:'lightgreen', width:250, height:50, borderRadius:10, display:'flex', justifyContent:'center', margin:5}}>
          <Text style={{color:'black', fontSize:30, textAlign:'center'}}>
            Busy Mind
          </Text>
        </View>
        <View style={{backgroundColor:'lightblue', width:250, height:50, borderRadius:10, display:'flex', justifyContent:'center', margin:5}}>
          <Text style={{color:'black', fontSize:30, textAlign:'center'}}>
            Centered
          </Text>
        </View>
        <View style={{backgroundColor:'lightyellow', width:250, height:50, borderRadius:10, display:'flex', justifyContent:'center', margin:5}}>
          <Text style={{color:'black', fontSize:30, textAlign:'center'}}>
            Sleepy
          </Text>
        </View>
        <Button title="Other" color='grey' onPress={this.props.changeToHome}>

        </Button>

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

      </View>
    )
  }

}


export default Review
