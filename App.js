import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BasicMeditation from './components/meditation'

export default class App extends React.Component {
  render() {
    return (
      <BasicMeditation>        
      </BasicMeditation>
    );
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
