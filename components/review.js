import React from 'react';
import { Text, View, Animated, Easing, Image, TouchableOpacity, Button, AsyncStorage } from 'react-native';

class Review extends React.Component {
  render(){
    return (
      <View style={{display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}>
        <ReviewBody updateProgress={(type)=>this.props.updateProgress(type)}>
        </ReviewBody>
      </View>
    )
  }
}

class ReviewBody extends React.Component {
  constructor(props){
    super(props);
    this.state = ({
      mode: 'choose',  //choose, submitted
      quotes: ['no mud, no lotus']
    })
  }

  reviewPress(e, type){
    console.log("REVIEW PRESSED", type)
    this.props.updateProgress(type)
    this.setState({mode:'submitted'})
  }

  render(){
    if(this.state.mode=='choose'){
      return(
        <View style={{display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}>
          <Text style={{position:'absolute', top:100, fontSize:35, textAlign:'center'}}>
            How was that for you?
          </Text>
          <TouchableOpacity onPress={(e, type)=>this.reviewPress(e, 'busy')}>
            <View style={{backgroundColor:'lightgreen', width:250, height:50, borderRadius:10, display:'flex', justifyContent:'center', margin:5}}>
              <Text style={{color:'black', fontSize:30, textAlign:'center'}}>
                Busy Mind
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={(e, type)=>this.reviewPress(e, 'centered')}>
            <View style={{backgroundColor:'lightblue', width:250, height:50, borderRadius:10, display:'flex', justifyContent:'center', margin:5}}>
              <Text style={{color:'black', fontSize:30, textAlign:'center'}}>
                Centered
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={(e, type)=>this.reviewPress(e, 'sleepy')}>
            <View style={{backgroundColor:'lightyellow', width:250, height:50, borderRadius:10, display:'flex', justifyContent:'center', margin:5}}>
              <Text style={{color:'black', fontSize:30, textAlign:'center'}}>
                Sleepy
              </Text>
            </View>
          </TouchableOpacity>
          {/* <Button title="Other" color='grey' onPress={this.props.changeToHome}>
          </Button> */}
        </View>
      )
    } else {
        return(
          <View style={{display:'flex', flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text>
              {this.state.quotes[0]}
            </Text>
          </View>
        )
    }
  }
}



export default Review
