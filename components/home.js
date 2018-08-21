import React from 'react';
import { Asset, Video } from 'expo';
import { StyleSheet, Text, View, Animated, Easing, TouchableOpacity, Image } from 'react-native';
// import Video from 'react-native-video';


class Home extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      colorAnim: new Animated.Value(0),
    }
  }

  componentDidMount() {

    Animated.loop(
      Animated.sequence([
        Animated.timing(
          this.state.colorAnim, {
            toValue:1,
            duration:5000,
          }),
        Animated.timing(
          this.state.colorAnim, {
            toValue:0,
            duration:5000
          })
      ])
    ).start()
  }

  render() {
    colorAnim1 = this.state.colorAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(100,50,50,1)', 'rgba(50, 100, 100, 1)']
    })

    colorAnim2 = this.state.colorAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(30,70,110,1)', 'rgba(90, 120, 40, 1)']
    })

    colorAnim3 = this.state.colorAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(45,45,70,1)', 'rgba(80, 10, 5, 1)']
    })

    return(
      <View style={{flex:1, display:'flex', justifyContent:'center', alignItems:'center'}}>

        <View>
          <Text>
            Hello!
          </Text>
          <VideoTest />
        </View>

        <TouchableOpacity onPress={this.props.changeToMeditation}>
          <Animated.View style={{width:180, height:180, borderRadius:90, backgroundColor:colorAnim1}}>
          </Animated.View>
        </TouchableOpacity>

        <View style={{display:'flex', flexDirection:'row', justifyContent:'space-around', alignItems:'center', width:'100%'}}>
          <TouchableOpacity onPress={this.props.changeToMeditation}>
            <Animated.View style={{width:180, height:180, borderRadius:90, backgroundColor:colorAnim2,}}>
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.changeToMeditation}>
            <Animated.View style={{width:180, height:180, borderRadius:90, backgroundColor:colorAnim3}}>
            </Animated.View>
          </TouchableOpacity>
        </View>
      </View>

    )
  }
}

class VideoTest extends React.Component {

  render() {
    // /Users/howardchong/horizons/oneminutemeditation/assets/sampleVid.mp4
    // { uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }
    return (
      <Video
        source={require('../assets/sampleVid.mp4')}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={{ width: 200, height: 200 }}
      />
    )
  }
}



// Later on in your styles..



export default Home
