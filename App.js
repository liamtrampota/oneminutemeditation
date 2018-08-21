import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Asset, SplashScreen } from 'expo';
import LoadingMeditation from './components/loadingMeditation'
import Home from './components/home'
import Review from './components/review'
import Meditation from './components/meditation'

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      firstLoading: true,
      mode: 'loading' // loading, home, meditation, review
    }
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

  componentDidMount() {
    SplashScreen.preventAutoHide();
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
      if (this.state.mode == 'loading'){
        return (
          <LoadingMeditation changeToHome={()=>this.changeToHome()}>
          </LoadingMeditation>
        );
      } else if (this.state.mode == 'home'){
        return (
          <Home changeToMeditation={()=>this.changeToMeditation()}>
          </Home>
        )
      } else if (this.state.mode == 'meditation'){
        return (
          <Meditation changeToReview={()=>this.changeToReview()}>
          </Meditation>
        )
      } else if (this.state.mode == 'review'){
        return(
          <Review changeToHome={()=>this.changeToHome()}>

          </Review>
        )
      }
    }
  }

  _cacheResourcesAsync = ()=> {
    console.log("cache resources async, 3 second delay");
    setTimeout(
      ()=>{
        SplashScreen.hide();
        this.setState({firstLoading: false});
      },
      3000);
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
