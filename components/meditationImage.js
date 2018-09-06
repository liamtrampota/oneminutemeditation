import React from 'react';
import { Asset, Video, Audio, Permissions, Notifications } from 'expo';
import { StyleSheet, Text, View, Animated, Easing, TouchableOpacity, Image } from 'react-native';

class MeditationImage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      circleAnim: new Animated.Value(0),
      counter: 8,
      TIMING: 7500,
      continueAnim: new Animated.Value(0),
      fadeAnim: new Animated.Value(0),
      anim01: new Animated.Value(0),
      images: [require('../assets/1calligraphy.jpg'), require('../assets/2homedepot.jpg'), require('../assets/3moonchange.gif')]
    }
  }

  componentDidMount() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(
          this.state.anim01, {
            toValue:1,
            duration:35000,
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

    Animated.sequence([
      Animated.loop(
          Animated.timing(
            this.state.circleAnim,
            {
              toValue:1,
              duration: this.state.TIMING,
              easing: Easing.linear()
            }
          ), {iterations: 8}
      ),
      Animated.parallel([
        Animated.loop(
          Animated.sequence([
            Animated.timing(
              this.state.continueAnim, {
                toValue:1,
                duration:1000,
              }),
            Animated.timing(
              this.state.continueAnim, {
                toValue:0,
                duration:1000
              })
          ])
        ),
        Animated.timing(
          this.state.fadeAnim, {
            toValue:1,
            duration:1000
          }
        )
      ])
    ]).start()

    let a=[1,2,3,4,5,6,7,8].map(x=>x*this.state.TIMING)
    console.log("AAAAAA",a);
    a.forEach((y)=>
      setTimeout(()=>{
        this.setState((prevState) =>
          ({ counter: prevState.counter-1  })
        );
      },
      y)
    )
  }

  render() {
    console.log('MeditationImage');
    console.log(this.props);
    var scaleAmt=this.state.anim01.interpolate({
      inputRange: [0, 0.3, 1],
//      outputRange: [1, 1.3, 1.4],
      outputRange: [2.9, 3.3, 1.4],
    });
    var translateAmt=this.state.anim01.interpolate({
      inputRange: [0, 0.7, 1.0],
      outputRange: [-30, 70, 35],
    });
    var scaleAmtText=this.state.anim01.interpolate({
      inputRange: [0, 0.2, 0.8, 1],
      outputRange: [0.7, 1.0, 2.2, 1.9],
    });
    var translateAmtTextX=this.state.anim01.interpolate({
      inputRange: [0, 1.0],
      outputRange: [-55, 70],
    });
    var translateAmtTextY=this.state.anim01.interpolate({
      inputRange: [0, 0.8, 1],
      outputRange: [40, 140, 130],
    });
    var colorText=this.state.anim01.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(23,56,56,0.3)', 'rgba(156,156,190,0.7)'],
    });
    var animFontSize=this.state.anim01.interpolate({
      inputRange: [0, 0.3, 0.31, 1],
      outputRange: [18, 18, 18, 18],
    });
    var color = this.state.circleAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ['rgba(140, 64, 64, 1)', 'rgba(64, 64, 115, 1)', 'rgba(140, 64, 64, 1)']
    })
    var size = this.state.circleAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [150,250, 150]
    })
    var radius = this.state.circleAnim.interpolate({
      inputRange: [0, .5,  1],
      outputRange: [75,150, 75]
    })
    var inOpacity = this.state.circleAnim.interpolate({
      inputRange: [0, 0.05, 0.4, 0.55],
      outputRange: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)']
    })
    var outOpacity = this.state.circleAnim.interpolate({
      inputRange: [0.5, 0.55, 0.9, 1],
      outputRange: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)']
    })
    var inTextSize = this.state.circleAnim.interpolate({
      inputRange: [0, 0.5],
      outputRange: [15, 30]
    })
    var outTextSize = this.state.circleAnim.interpolate({
      inputRange: [0.5,1],
      outputRange: [30, 15]
    })
    var headTextSize = this.state.circleAnim.interpolate({
      inputRange: [0,0.5,1],
      outputRange: [15, 26, 15]
    })
    var headTextColor = this.state.circleAnim.interpolate({
      inputRange: [0,0.5,1],
      outputRange: ['rgba(0, 0, 0, 0.5)','rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 0.2)']
    })
    var continueColor = this.state.continueAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(255, 255,255, 1)', 'rgba(255,255,255,.2)']
    })
    var fadeTitleColor = this.state.fadeAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 0)']
    })
    var fadeNumberColor = this.state.fadeAnim.interpolate({
      inputRange: [0,1],
      outputRange: ['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0 ,0)']
    })

    const myImage=this.state.images[this.props.imageNumber-1];

    return(
      <View style={{display:'flex', position:'relative', justifyContent:'center', alignItems:'center', flex:1}}>
        <View style={{display:'flex', position:'absolute', justifyContent:'center', alignItems:'center', flex:1}}>
          <Animated.View style={{display:'flex', position: 'relative', justifyContent:'center', alignItems:'center',
              transform: [
                {translateX: translateAmt},
                {translateY: translateAmt},
                {scale: scaleAmt}
              ]
          }}>
            <Image source={myImage}  />
          </Animated.View>
          <Animated.Text  style={{justifyContent:'center', alignItems:'center', color: colorText,
            width: 180, height: 100, fontSize: animFontSize, position:'absolute', top:200, left:175,
            transform: [
              {translateX: translateAmtTextX},
              {translateY: translateAmtTextY},
              {scale: scaleAmtText}
            ]
          }}>
            Nothing is Enough
          </Animated.Text>
          <AudioTestAsync soundObject={this.props.soundObject}/>
          <View style={{position:'absolute', bottom:30, left:30}}>
            <TouchableOpacity onPress={this.props.changeToHome}>
              <Image source={require('../assets/footprintsleaving.png')} style={{width:40, height:40}}>
              </Image>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex:3, display:'flex', alignItems:'center'}}>
          <Animated.Text style={{position:'absolute', marginTop:50, fontSize:30, color:fadeTitleColor, textAlign:'center'}}>
            One minute meditation.
          </Animated.Text>
          <View style={{display:'flex', flex:1, justifyContent:'center'}}>
            <Animated.View style={{backgroundColor:color, width:size, height:size, borderRadius:radius, display:'flex', marginTop:50, justifyContent:'center', alignItems:'center'}}>
              {this.state.counter ?
                <View style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                  <Animated.Text style={{color:inOpacity, position:'absolute', fontSize:inTextSize}}>
                    i n
                  </Animated.Text>
                  <Animated.Text style={{color:outOpacity, fontSize:outTextSize}}>
                    o u t
                  </Animated.Text>
                </View>
                  :
                <TouchableOpacity onPress={this.props.changeToReview}>
                  <Animated.Text style={{color:continueColor, fontSize:18}}>

                      Tap to continue

                  </Animated.Text>
                </TouchableOpacity>
                }
            </Animated.View>
          </View>
        </View>
      </View>
    )
  }
}

class AudioTestAsync extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount = () => {
    this.props.soundObject.setIsLoopingAsync(true);
    this.props.soundObject.playAsync();
    // Your sound is playing!
  }

  render() {
    // do comments help
    //
    const helps=true;
    return (
      <View></View>
    )
  }
}

export default MeditationImage
