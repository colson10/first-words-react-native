import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableHighlight } from 'react-native';
import gameDataArray from './game-data.js';

const shuffle = (array) => {
  let i = 0, j = 0, temp = null;

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array;
}

export default class App extends React.Component {
  state = {
    correct: '',
    winner: false,
    loser: false,
    newScreen: true,
    gameStarted: false,
    arrayToShow: [],
    remaining: [],
  }

  handleSelection = (target) => {
    if (target.title === this.state.correct) {
      this.setState({ winner: true })
    } else {
      this.setState({ loser: true })
    }
  }

  handleStartGame = () => {
    // const randomIndex = Math.floor(Math.random() * ((gameDataArray.length - 1) - 1));
    // console.log(randomIndex);
    console.log(gameDataArray[0], 'first index');
    const data = shuffle(gameDataArray);
    console.log(data,);
    const first = data.pop();
    console.log(first);
    const remaining = [];
    remaining.push(first);

    for (let i = 0; i < 3; i++) {
      const lastItemRemoved = data.pop();
      remaining.push(lastItemRemoved);
    }
    const shuffled = shuffle(remaining);
    console.log(remaining, data);

    this.setState({ gameStarted: true, winner: false, loser: false, correct: first.title, remaining: shuffled })
  }

  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        {
          !this.state.gameStarted 
            && <View>
              <TouchableHighlight>
                <Text onPress={this.handleStartGame}>Start Game!</Text>
              </TouchableHighlight>
            </View>
        }
        {
          this.state.gameStarted && 
          <View style={styles.container}>
            {this.state.winner && <Text style={styles.welcome}>That is correct!</Text>} 
            {this.state.loser && <Text style={styles.welcome}>'Sorry, play again'</Text>}
            <FlatList
              data={this.state.remaining}
              renderItem={({item}) => (
              <View >
                <TouchableHighlight onPress={() => this.handleSelection(item)} value={item.title}>
                <Image  source={{uri:item.url}} style={styles.image}/>
                </TouchableHighlight>
              </View>
              )     
            }
            />
            <Text>{this.state.correct}</Text>
          </View>
        }
      </React.Fragment>
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
