import React from 'react';
import { Text, View, Animated, Easing, Image, TouchableOpacity, Button, AsyncStorage, TextInput } from 'react-native';

class Review extends React.Component {
  render(){
    return (
      <View style={{display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}>
        <ReviewBody updateProgress={(type, note)=>this.props.updateProgress(type, note)}>
        </ReviewBody>
      </View>
    )
  }
}

class ReviewBody extends React.Component {
  constructor(props){
    super(props);
    this.state = ({
      mode: 'choose',  //choose, busy, centered, sleepy, quote
      quotes: ['no mud, no lotus'],
      fadeAnim: new Animated.Value(0),
      fadeAnim2: new Animated.Value(0),
      quote: false,
      addNote: false,
      text: '',
      noteButtonText:'Add note?'
    })
  }

  addNote(modify) {
    if(this.state.mode === 'choose'){
      this.setState({addNote:!this.state.addNote})
      if(modify=='modify'){
        this.setState({noteButtonText:'Change note?'})
      }
    }
  }

  reviewPress(e, type){
    console.log("REVIEW PRESSED", type)
    if(this.state.mode === 'choose'){
      Animated.sequence([
        Animated.timing(
          this.state.fadeAnim, {
            toValue:1,
            duration:3000
          }
        ),
        Animated.timing(
          this.state.fadeAnim2, {
            toValue:1,
            duration:3000
          }
        )
      ]).start()

      if(this.state.text){
        console.log('DEBUG')
        console.log(this.state.text)
        this.props.updateProgress(type, this.state.text)
      } else {
        this.props.updateProgress(type)
      }


      if(type=='busy'){
        this.setState({mode:'busy'})
      } else if(type=='centered'){
        this.setState({mode:'centered'})
      } else {
        this.setState({mode:'sleepy'})
      }

      setTimeout(()=> {
        this.setState({quote:true})
      },3000)
    }
  }

  render(){

    var fadeQuestionColor = 'rgba(0, 0, 0, 1)'
    var busyFadeTitleColor = 'rgba(31, 224, 131, 1)'
    var busyFadeTextColor = 'rgba(255, 255, 255, 1)'
    var centeredFadeTitleColor = 'rgba(133, 240, 250, 1)'
    var centeredFadeTextColor = 'rgba(255, 255, 255, 1)'
    var sleepyFadeTitleColor = 'rgba(249, 225, 118, 1)'
    var sleepyFadeTextColor = 'rgba(255, 255, 255, 1)'
    var quoteFadeColor = 'rgba(0, 0, 0, 0)'

    if(this.state.mode!=='choose' && this.state.mode!=='quote') {
      console.log('interpolate')
       fadeQuestionColor = this.state.fadeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 0)']
      })
      if(this.state.mode!=='busy'){
         busyFadeTitleColor = this.state.fadeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['rgba(31, 224, 131, 1)', 'rgba(31, 224, 131, 0)']
        })
         busyFadeTextColor = this.state.fadeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['rgba(255, 255, 255, 1.0)', 'rgba(255, 255, 255, 0)']
        })
      }
      if(this.state.mode!=='centered'){
        console.log('centered')
         centeredFadeTitleColor = this.state.fadeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['rgba(133, 240, 250, 1)', 'rgba(133, 240, 250, 0)']
        })
         centeredFadeTextColor = this.state.fadeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)']
        })
      }
      if(this.state.mode!=='sleepy'){
         sleepyFadeTitleColor = this.state.fadeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['rgba(249, 225, 118, 1)', 'rgba(249, 225, 118, 0)']
        })
         sleepyFadeTextColor = this.state.fadeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)']
        })
      }
    }

    var barelyOpaque=0.2;

    if(this.state.quote===true){
      if(this.state.mode=='busy'){
        busyFadeTitleColor = this.state.fadeAnim2.interpolate({
          inputRange: [0, 1],
          outputRange: ['rgba(31, 224, 131, 1)', `rgba(31, 224, 131, ${barelyOpaque})`]
        })
        busyFadeTextColor = this.state.fadeAnim2.interpolate({
          inputRange: [0, 1],
          outputRange: ['rgba(255, 255, 255, 1.0)', `rgba(255, 255, 255, ${barelyOpaque})`]
        })
      }
      if(this.state.mode=='centered'){
        console.log('centered')
        var centeredFadeTitleColor = this.state.fadeAnim2.interpolate({
          inputRange: [0, 1],
          outputRange: ['rgba(133, 240, 250, 1)', `rgba(133, 240, 250, ${barelyOpaque})`]
        })
        var centeredFadeTextColor = this.state.fadeAnim2.interpolate({
          inputRange: [0, 1],
          outputRange: ['rgba(255, 255, 255, 1)', `rgba(255, 255, 255, ${barelyOpaque})`]
        })
      }
      if(this.state.mode=='sleepy'){
        var sleepyFadeTitleColor = this.state.fadeAnim2.interpolate({
          inputRange: [0, 1],
          outputRange: ['rgba(249, 225, 118, 1)', `rgba(249, 225, 118, ${barelyOpaque})`]
        })
        var sleepyFadeTextColor = this.state.fadeAnim2.interpolate({
          inputRange: [0, 1],
          outputRange: ['rgba(255, 255, 255, 1)', `rgba(255, 255, 255, ${barelyOpaque})`]
        })
      }
      var quoteFadeColor = this.state.fadeAnim2.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']
      })
    }

    return(
      <View style={{display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}>
        <Animated.Text style={{position:'absolute', color:quoteFadeColor, textAlign:'center', top:200, fontSize:35, letterSpacing:3}}>
          No mud, no lotus
        </Animated.Text>
        <Animated.Text style={{position:'absolute', top:100, fontSize:35, textAlign:'center', color:fadeQuestionColor}}>
          How was that? We'll keep track for you.
        </Animated.Text>
        <TouchableOpacity onPress={(e, type)=>this.reviewPress(e, 'busy')}>
          <Animated.View style={{backgroundColor:busyFadeTitleColor, width:250, height:50, borderRadius:10, display:'flex', justifyContent:'center', margin:5}}>
            <Animated.Text style={{color:busyFadeTextColor, fontSize:30, textAlign:'center'}}>
              Busy Mind
            </Animated.Text>
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity onPress={(e, type)=>this.reviewPress(e, 'centered')}>
          <Animated.View style={{backgroundColor:centeredFadeTitleColor, width:250, height:50, borderRadius:10, display:'flex', justifyContent:'center', margin:5}}>
            <Animated.Text style={{color:centeredFadeTextColor, fontSize:30, textAlign:'center'}}>
              Centered
            </Animated.Text>
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity onPress={(e, type)=>this.reviewPress(e, 'sleepy')}>
          <Animated.View style={{backgroundColor:sleepyFadeTitleColor, width:250, height:50, borderRadius:10, display:'flex', justifyContent:'center', margin:5}}>
            <Animated.Text style={{color:sleepyFadeTextColor, fontSize:30, textAlign:'center'}}>
              Sleepy
            </Animated.Text>
          </Animated.View>
        </TouchableOpacity>
        <View style={{paddingTop:10}}>
          <TouchableOpacity onPress={()=>this.addNote()}>
            {!this.state.addNote ?
            <Animated.Text style={{color:fadeQuestionColor}}>
              {this.state.noteButtonText}
            </Animated.Text>
              :
            <View>
              <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1, width:200}}
                placeholder="what's on your mind?"
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
                textAlign='center'
              />
              <View style={{paddingTop:10}}>
                <TouchableOpacity onPress={(modify)=>this.addNote('modify')}>
                  <Text style={{color:'darkblue', textAlign:'center'}}>
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            </View>}
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}



export default Review
