import React from 'react';
import { Text, View, Animated, Easing } from 'react-native';

class BasicMeditation extends React.Component {
  state = {
    circleAnim: new Animated.Value(0),
    counter: 5,
    TIMING: 1000,
    continueAnim: new Animated.Value(0)
  }


  componentDidMount() {
    Animated.sequence([
      Animated.loop(
          Animated.timing(
            this.state.circleAnim,
            {
              toValue:1,
              duration: this.state.TIMING,
              easing: Easing.linear()
            }
          ), {iterations: 5}
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(
            this.state.continueAnim, {
              toValue:1,
              duration:2000,
            }),
          Animated.timing(
            this.state.continueAnim, {
              toValue:0,
              duration:2000
            })
        ])
      )
    ]).start()

    let a=[1,2,3,4,5].map(x=>x*this.state.TIMING)
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



    return(
      <View style={{flex:1, display:'flex', alignItems:'center'}}>
        <Text style={{position:'absolute', marginTop:50, fontSize:30, color:'darkblue', textAlign:'center'}}>
          Lets get started with five calming breaths.
        </Text>
        {this.state.counter ?
          <View>
            <View style={{position:'absolute', marginTop:180, alignItems:"center"}}>
              {[5,4,3,2,1].map(
                (i)=>{
                  if (i==this.state.counter) {
                    return(
                    <Animated.Text key={i} style={{color: headTextColor, fontSize:headTextSize}}>{i}</Animated.Text>
                    )
                  } else if (i<this.state.counter) {
                    return(
                    <Animated.Text key={i} style={{color: 'rgba(0, 0, 0, 0.5)', fontSize:15}}>{i}</Animated.Text>
                    )
                  } else {
                    return(
                    <Animated.Text key={i} style={{color: 'rgba(0, 0, 0, 0.2)', fontSize:15}}>{i}</Animated.Text>
                    )
                  }
                }
              )}
            </View>
          </View> :
          <View></View>
        }
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
              <Animated.Text style={{color:continueColor, fontSize:18}}>
                Tap to continue
              </Animated.Text>
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