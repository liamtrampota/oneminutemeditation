import React from 'react';
import { Asset, Video, Audio } from 'expo';
import { StyleSheet, Text, View, Animated, Easing, TouchableOpacity, Image } from 'react-native';


class GardenEncouragement extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      anim01: new Animated.Value(0),
    }
  }

  componentDidMount() {

    Animated.loop(
      Animated.sequence([
        Animated.timing(
          this.state.anim01, {
            toValue:1,
            duration:16000,
            easing: Easing.inOut().quad
          }),
        Animated.timing(
          this.state.anim01, {
            toValue:0,
            duration:22000,
            easing: Easing.inOut().quad
          })
      ])
    ).start()
  }

  render() {
    var scaleAmt=this.state.anim01.interpolate({
      inputRange: [0, 1],
      outputRange: [1.3, 1.6],
    });
    var translateAmt=this.state.anim01.interpolate({
      inputRange: [0, 1],
      outputRange: [-30, 50],
    });
    var colorText=this.state.anim01.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(23,56,56,0.3)', 'rgba(156,156,190,0.7)'],
    });
    var animFontSize=this.state.anim01.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 20],
    });

    return(
      <View style={{display:'flex', position:'relative', justifyContent:'center', alignItems:'center'}}>
        <Animated.View style={{display:'flex', justifyContent:'center', alignItems:'center',
            transform: [
              {translateX: translateAmt},
              {translateY: translateAmt},
              {scale: scaleAmt}
            ]
        }}>
          <Image source={require('../assets/fog.jpg')}  />
          <Animated.Text  style={{color: colorText, width: 180, height: 400, fontSize: animFontSize, position:'absolute', top: 150, left:200}}>Nothing is Enough</Animated.Text>
          <View>
            <VideoTest />
          </View>
        </Animated.View>
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
        source={require('../assets/birdsForest.mp3')}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        shouldPlay
        isLooping
      />
    )
  }
}

class AudioTest extends React.Component {
  // This does not work. I am invoking things incorrectly, I think.
  //
  componentDidMount = () => {
    try {
          const { sound: soundObject, status } = Expo.Audio.Sound.create(
            require('../assets/birdsForest.mp3'),
            { shouldPlay: true }
          );
          console.log("should be playing")
          // Your sound is playing!
        } catch (error) {
          console.log("error - audio playing")
          // An error occurred!
    }

    // const soundObject=Audio.Sound();
    //
    // try {
    //   console.log("soundAboutToPlay")
    //   soundObject.loadAsync(require('../assets/birdsForest.mp3'))
    //   .then(()=>soundObject.playAsync())
    //   // Your sound is playing!
    // } catch (error) {
    //   // An error occurred!
    //   console.log("soundError")
    // }
  }


  render() {
    // /Users/howardchong/horizons/oneminutemeditation/assets/sampleVid.mp4
    // { uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }
    //

    return (
      <View><Text>AudioTest:  Should Play</Text></View>
    )
  }
}



// Later on in your styles..



export default GardenEncouragement;
