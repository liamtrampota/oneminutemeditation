import React from 'react';
import { Text, View, Animated, Easing, TouchableOpacity, Image } from 'react-native';
import { PieChart } from 'react-native-svg-charts'

export default class Progress extends React.Component {
  constructor(props){
    super(props)
    this.state=({
      display:'days' //days, month, months
    })
  }

  pressedButton(e, display){
    if(display != this.state.display){
      this.setState({display:display})
    }
  }


  render(){
    var dataValues = Object.values(this.props.progressObj)
    var dataDates = Object.keys(this.props.progressObj)
    console.log('PROGRESS', dataDates, dataValues)
    return(
      <View style={{display:'flex', flex:1, justifyContent:'center'}}>
        <Navigation pressedButton={(e, display)=>this.pressedButton(e, display)} display={this.state.display}>
        </Navigation>
        <Text style={{textAlign:'center'}}>
          Number of Meditations: {dataValues.length}
        </Text>
        <ProgressPieChart dataValues={dataValues}>
        </ProgressPieChart>
        <View style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
          <Text style={{color:'#600080'}}>
            Busy Mind
          </Text>
          <Text style={{color:'#9900cc'}}>
            Centered
          </Text>
          <Text style={{color: '#c61aff'}}>
            Sleepy
          </Text>
        </View>
      </View>
    )
  }
}

class Navigation extends React.Component {
  constructor(props){
    super(props)
    this.state=({
      display:props.display
    })
  }
  render() {
    return (
      <View style={{display:'flex', flexDirection:'row', justifyContent:'space-around', paddingBottom:40}}>

        <TouchableOpacity onPress={(e, display)=>this.props.pressedButton(e, 'days')}>
          {this.props.display === 'days' ? <View style={{backgroundColor:'gold', width:100, height:30, display:'flex', justifyContent:'center', alignItems:'center', borderRadius:5}}>
            <Text>
              Past 7 days
            </Text>
          </View>
            :
          <View style={{backgroundColor:'white', width:100, height:30, display:'flex', justifyContent:'center', alignItems:'center', borderRadius:5}}>
            <Text>
              Past 7 days
            </Text>
          </View>
          }
        </TouchableOpacity>

        <TouchableOpacity onPress={(e, display)=>this.props.pressedButton(e, 'month')}>
          {this.props.display === 'month' ? <View style={{backgroundColor:'gold', width:100, height:30, display:'flex', justifyContent:'center', alignItems:'center', borderRadius:5}}>
            <Text>
              Past month
            </Text>
          </View>
            :
          <View style={{backgroundColor:'white', width:100, height:30, display:'flex', justifyContent:'center', alignItems:'center', borderRadius:5}}>
            <Text>
              Past month
            </Text>
          </View>
          }
        </TouchableOpacity>

        <TouchableOpacity onPress={(e, display)=>this.props.pressedButton(e, 'months')}>
          {this.props.display === 'months' ? <View style={{backgroundColor:'gold', width:100, height:30, display:'flex', justifyContent:'center', alignItems:'center', borderRadius:5}}>
            <Text>
              Past 6 months
            </Text>
          </View>
            :
          <View style={{backgroundColor:'white', width:100, height:30, display:'flex', justifyContent:'center', alignItems:'center', borderRadius:5}}>
            <Text>
              Past 6 months
            </Text>
          </View>
          }
        </TouchableOpacity>
      </View>
    )
  }
}

class ProgressPieChart extends React.PureComponent {

  render() {
    var dataValues = this.props.dataValues
    var sleepyLength = 0
    var centeredLength = 0
    var busyLength = 0
    dataValues.forEach((value)=>{
      if(value == 'busy'){
        busyLength = busyLength + 1
      } else if (value == 'centered'){
        centeredLength = centeredLength + 1
      } else {
        sleepyLength = sleepyLength + 1
      }
    })
    console.log(sleepyLength, busyLength, centeredLength)


      const data = [
          {
              key: 'busy',
              amount: busyLength,
              svg: { fill: '#600080' },
          },
          {
              key: 'centered',
              amount: centeredLength,
              svg: { fill: '#9900cc' }
          },
          {
              key: 'sleepy',
              amount: sleepyLength,
              svg: { fill: '#c61aff' }
          }
      ]


      return (
          <PieChart
              style={{ height: 200 }}
              valueAccessor={({ item }) => item.amount}
              data={data}
              spacing={0}
              outerRadius={'95%'}
          >
          </PieChart>
      )
  }
}
