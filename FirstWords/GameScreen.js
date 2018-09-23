import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, FlatList, TouchableHighlight} from 'react-native';
import gameDataArray from './game-data.js';

export default class App extends React.Component {
  state = {
    correct: 'cat',
    winner: false,
    loser: false,
    newScreen: true,
  }

  handleSelection = (target) => {
    if (target.title === this.state.correct) {
      this.setState({ winner: true })
    } else {
      this.setState({ loser: true })
    }
  }

  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
        {this.state.winner && <Text style={styles.welcome}>That is correct!</Text>} 
        {this.state.loser && <Text style={styles.welcome}>'Sorry, play again'</Text>}
         <FlatList
          data={gameDataArray}
          renderItem={({item}) => (
          <View >
            <TouchableHighlight onPress={() => this.handleSelection(item)} value={item.title}>
            <Image  source={{uri:item.url}} style={styles.image}/>
            </TouchableHighlight>
          </View>
          )     
        }

        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 50,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  image: {
    width: 50,
    height: 50,
  },
});
