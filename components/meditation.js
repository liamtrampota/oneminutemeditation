import React from 'react';
import { Text, View, Animated, Easing } from 'react-native';

class BasicMeditation extends React.Component {
  state = {
    circleAnim: new Animated.Value(0),
    counter: 5
  }

  componentDidMount() {
    Animated.loop(
        Animated.timing(
          this.state.circleAnim,
          {
            toValue:1,
            duration: 9000,
            easing: Easing.linear()
          }
        ), {iterations: 5}
    ).start()

    setInterval(()=>{
      this.setState({counter: this.state.counter-1})
    }, 9000
    )
  }

  render() {
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



    return(
      <View style={{flex:1, display:'flex', alignItems:'center'}}>
        <Text style={{position:'absolute', marginTop:50}}>
          Lets get started with five calming breaths.
        </Text>
        <Text style={{position:'absolute', marginTop:100}}>
          {this.state.counter}
        </Text>
        <View style={{display:'flex', flex:1, justifyContent:'center'}}>
          <Animated.View style={{backgroundColor:color, width:size, height:size, borderRadius:radius, display:'flex', marginTop:50, justifyContent:'center', alignItems:'center'}}>
            {this.state.counter ?
              <View>
                <Animated.Text style={{color:inOpacity, position:'absolute', fontSize:inTextSize}}>
                  i n
                </Animated.Text>
                <Animated.Text style={{color:outOpacity, fontSize:outTextSize}}>
                  o u t
                </Animated.Text>
              </View>
                :
              <Text>
                Tap to continue
              </Text>
              }
            {/* // <Animated.Text style={{color:inOpacity, position:'absolute', fontSize:inTextSize}}>
            //   i n
            // </Animated.Text>
            // <Animated.Text style={{color:outOpacity, fontSize:outTextSize}}>
            //   o u t
            // </Animated.Text> */}
          </Animated.View>
        </View>

      </View>
    )
  }

}

export default BasicMeditation
