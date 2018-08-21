import React from 'react';
import { Asset, SplashScreen } from 'expo';
import { StyleSheet, Text, View, AsyncStorage , Image, TouchableOpacity} from 'react-native';
import LoadingMeditation from './components/loadingMeditation'
import Home from './components/home'
import Review from './components/review'
import Meditation from './components/meditation'

class Body extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    console.log(this.props)
    if(this.props.mode == 'loading'){
      return (
        <LoadingMeditation changeToHome={()=>this.props.changeToHome()}>
        </LoadingMeditation>
      );
    } else if (this.props.mode == 'home'){
      return (
        <Home changeToMeditation={()=>this.props.changeToMeditation()}>
        </Home>
      )
    } else if (this.props.mode == 'meditation'){
      return (
        <Meditation changeToReview={()=>this.props.changeToReview()}>
        </Meditation>
      )
    } else if (this.props.mode == 'review'){
      return(
        <Review updateProgress={(type)=>this.props.updateProgress(type)} changeToHome={()=>this.props.changeToHome()}>
        </Review>
      )
    }
  }

}

class Navigation extends React.Component {
  render(){
    return(
      <View style={{display:'flex', flexDirection:'row', justifyContent:'space-around', width:'100%', position:'absolute', bottom:30}}>
        <Image source={require('./assets/reminders.png')} style={{width:40, height:40}}>
        </Image>
        <TouchableOpacity onPress={this.props.changeToHome}>
          <Image source={require('./assets/enso.png')} style={{width:40, height:40, tintColor:'gold'}}>
          </Image>
        </TouchableOpacity>

        <Image source={require('./assets/progress.png')} style={{width:40, height:40}}>
        </Image>


      </View>
    )
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstLoading: true,
      mode: 'loading', // loading, home, meditation, review
      progressObj: {
        userId: null,
        breaths: []
      }
    }
  }

  componentDidMount(){
    SplashScreen.preventAutoHide();
    var retrieveData = async () => {
    try {
      console.log('HELLO')
      let value = await AsyncStorage.getItem('selfProgress')
      if (value != null) {
        console.log(value)
        this.setState({progressObj: JSON.parse(value)})
      }
    } catch (error) {
      console.log(error)
      }
    }
    retrieveData();
  }

  changeToHome() {
    console.log('CHANGE TO HOME')
    this.setState({mode:'home'})
  }

  changeToReview(){
    this.setState({mode:'review'})
  }

  changeToMeditation(){
    this.setState({mode:'meditation'})
  }

  render() {
    if (this.state.firstLoading) {
      return (
        <View style={{ flex: 1}}>
          <Image
            source={require('./assets/SuzukiRoshi.png')}
            onLoad={this._cacheResourcesAsync}
          />
        </View>
      )
    } else {
      return (
        <View style={{backgroundColor:'skyblue', display:'flex', flex:1}}>
          <Body mode={this.state.mode} changeToHome={()=>this.changeToHome()}
            changeToMeditation={()=>this.changeToMeditation()}
            changeToReview={()=>this.changeToReview()}
            updateProgress={(type)=>this.updateProgress(type)}>
          </Body>
          {(this.state.mode == 'home' || this.state.mode == 'review') ?
            <Navigation changeToHome={()=>this.changeToHome()}>
            </Navigation>
              :
            <View></View>}
        </View>
      )
    }
  }

  _cacheResourcesAsync = ()=> {
    console.log("cache resources async, 3 second delay");
    setTimeout(
      ()=>{
        SplashScreen.hide();
        this.setState({firstLoading: false});
      },
      500
    );
  }


  updateProgress(type) {
    console.log('UPDATE PROGRESS', this.state.progressObj)
    if(type === 'busy'){
      var date = new Date()
      var month = date.getMonth()
      var progressObj = Object.assign({}, this.state.progressObj)
      progressObj[date] = 'busy'
      this.setState({progressObj: progressObj})
      AsyncStorage.setItem('selfProgress', JSON.stringify(progressObj), (err, result) => {
        if(err) {console.log(err)}
        else {console.log(result)}
      });
    } else if (type === 'centered'){
      var date = new Date()
      var month = date.getMonth()
      var progressObj = Object.assign({}, this.state.progressObj)
      progressObj[date] = 'centered'
      this.setState({progressObj: progressObj})
      AsyncStorage.setItem('selfProgress', JSON.stringify(progressObj), (err, result) => {
        if(err) {console.log(err)}
        else {console.log(result)}
      });
    } else {
      var date = new Date()
      var month = date.getMonth()
      var progressObj = Object.assign({}, this.state.progressObj)
      progressObj[date] = 'sleepy'
      this.setState({progressObj: progressObj})
      AsyncStorage.setItem('selfProgress', JSON.stringify(progressObj), (err, result) => {
        if(err) {console.log(err)}
        else {console.log(result)}
      });
    }
  }


}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
