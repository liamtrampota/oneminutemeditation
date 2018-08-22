import React from 'react';
import { Asset, SplashScreen, Audio } from 'expo';
import { StyleSheet, Text, View, AsyncStorage , Image, TouchableOpacity} from 'react-native';
import LoadingMeditation from './components/loadingMeditation'
import Home from './components/home'
import Review from './components/review'
import Meditation from './components/meditation'
import Progress from './components/progress'
import GardenEncouragement from './components/GardenEncouragement'

class Body extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    console.log(this.props)
    if(this.props.mode == 'loading'){
      return (
        <GardenEncouragement
          birdsChirpingSoundObject={this.props.birdsChirpingSoundObject}
          changeToHome={()=>this.props.changeToHome()}
        >
        </GardenEncouragement>
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
        <Review updateProgress={(type, note)=>this.props.updateProgress(type, note)} changeToHome={()=>this.props.changeToHome()}>
        </Review>
      )
    } else if (this.props.mode == 'progress') {
        console.log('RENDER BODY', this.props.progressObj)
        return(
          <Progress changeToHome={()=>this.props.changeToHome()} progressObj={this.props.progressObj}>
          </Progress>
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
        <TouchableOpacity onPress={this.props.changeToProgress}>
          <Image source={require('./assets/progress.png')} style={{width:40, height:40}}>
          </Image>
        </TouchableOpacity>


      </View>
    )
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstLoading: true, // true
      mode: 'loading', // loading, home, meditation, review, progress
      progressObj: {}
    }
  }

  componentDidMount(){
    // AsyncStorage.setItem('selfProgress', JSON.stringify({test:['centered', 'hello']}), (err, result) => {
    //   if(err) {console.log(err)}
    //   else {console.log(result)}
    // }); RESET STORAGE

    SplashScreen.preventAutoHide();
    this.soundObjectBirds=new Audio.Sound();
    this.soundObjectBirds.setOnPlaybackStatusUpdate(null);
    // this.soundObject.loadAsync(
    //   require('./assets/birdsForest.mp3'),
    //   {
    //     isLooping: true,
    //   },
    //   true //downloadFirst  // WRONG SYNTAX???? zzzzz
    // )
    // .then(()=>null)
    // .catch((err)=>console.log(err))
    this.soundObjectBirds.loadAsync(require('./assets/birdsForest.mp3'));
    console.log('soundObjectLoaded - CDM')

    this.soundObjectWaves=new Audio.Sound();
    this.soundObjectWaves.setOnPlaybackStatusUpdate(null);
    this.soundObjectWaves.loadAsync(require('./assets/waves60secEdited.mp3'));


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

  changeToReview() {
    this.setState({mode:'review'})
  }

  changeToMeditation(){
    this.setState({mode:'meditation'})
  }

  changeToProgress(){
    this.setState({mode:'progress'})
  }

  render() {
    console.log('RENDER', this.state.progressObj)
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
            updateProgress={(type, note)=>this.updateProgress(type, note)} progressObj={this.state.progressObj}
            birdsChirpingSoundObject={this.soundObjectWaves}>

          </Body>
          {(this.state.mode == 'home' || this.state.mode == 'review' || this.state.mode=='progress') ?
            <Navigation changeToHome={()=>this.changeToHome()} changeToProgress={()=>this.changeToProgress()}>
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


  updateProgress(type, note) {
    console.log('UPDATE PROGRESS', this.state.progressObj)
    console.log('type, note:', type, note)
    var date = new Date()
    var month = date.getMonth()
    var progressObj = Object.assign({}, this.state.progressObj)
    progressObj[date] = [type, note]
    this.setState({progressObj: progressObj})
    AsyncStorage.setItem('selfProgress', JSON.stringify(progressObj), (err, result) => {
      if(err) {console.log(err)}
      else {console.log(result)}
    });

  }
}
