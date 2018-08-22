import React from 'react';
import { Asset, Video, Audio, Permissions, Notifications } from 'expo';
import { StyleSheet, Text, View, Animated, Easing, TouchableOpacity, Image } from 'react-native';

const PUSH_ENDPOINT = 'http://b83e9268.ngrok.io/api/v1/Meditator/';


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

    setTimeout(this.registerForPushNotificationsAsync, 2000);
    setTimeout(this.props.changeToHome, 20000);
  }

  registerForPushNotificationsAsync= async function() {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();

    //var Meditator = mongoose.model('Meditator', new mongoose.Schema({
    //   createdAt: Date,
    //   zenName: String,
    //   expoNotificationToken: String, //JSON.stringified object
    //   location: String, // later, convert to latitutde and longitude
    //
    //   currentHistory: String, //JSON.stringified object
    //   realName: String,
    //   realEmail: String,
    // }))

    // POST the token to your backend server from where you can retrieve it to send push notifications.
    fetch(PUSH_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        createdAt: new Date(),
        zenName: 'Dusty555',
        expoNotificationToken: token, //String
      }),
    });

    fetch(PUSH_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        zenName: 'Dustyline93',
        expoNotificationToken: 'stubJSONtoken',
      }),
    });
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
          <AudioTestAsync birdsChirpingSoundObject={this.props.birdsChirpingSoundObject}/>
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
            {
              shouldPlay: true,
              isLooping: true,
            }
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
      <View></View>
    )
  }
}

class AudioTestAsync extends React.Component {
  constructor(props) {
    super(props)
  }



  componentDidMount = () => {
    this.props.birdsChirpingSoundObject.setIsLoopingAsync(true);
    this.props.birdsChirpingSoundObject.playAsync();
    // Your sound is playing!
  }


  render() {
    // /Users/howardchong/horizons/oneminutemeditation/assets/sampleVid.mp4
    // { uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }
    //

    return (
      <View></View>
    )
  }
}



// Later on in your styles..



export default GardenEncouragement;
