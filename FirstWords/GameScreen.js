import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, ImageBackground } from 'react-native';
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
    currentSet: [],
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
    const data = shuffle(gameDataArray);
    const first = data.pop();
    const remaining = [];
    remaining.push(first);

    for (let i = 0; i < 3; i++) {
      const lastItemRemoved = data.pop();
      remaining.push(lastItemRemoved);
    }
    const shuffled = shuffle(remaining);

    this.setState({ gameStarted: true, winner: false, loser: false, correct: first.title, currentSet: shuffled, remaining: data })
  }

  render() {
    const { currentSet } = this.state;
    return (
      <ImageBackground source={{uri: 'https://images.pexels.com/photos/1020317/pexels-photo-1020317.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'}} style={{width: '100%', height: '100%'}}>
      <React.Fragment>
        {
          !this.state.gameStarted 
            && <View>
              <TouchableHighlight
                onPress={this.handleStartGame} 
                color="#841584"
                style={styles.button}>
                <Text>
                  Start Game!
                </Text>
              </TouchableHighlight>
            </View>
        }
        {
          this.state.gameStarted && 
          <View style={styles.container}>
            {this.state.winner && <Text style={styles.welcome}>That is correct!</Text>} 
            {this.state.loser && <Text style={styles.welcome}>'Sorry, play again'</Text>}

            <View style={styles.topSet}>
              <TouchableHighlight onPress={() => this.handleSelection(currentSet[0])} value={currentSet[0].title}>
                <Image  source={{uri:currentSet[0].url}} style={styles.image}/>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => this.handleSelection(currentSet[1])} value={currentSet[1].title}>
                <Image  source={{uri:currentSet[1].url}} style={styles.image}/>
              </TouchableHighlight>
            </View>
            <View style={styles.bottomSet}>
              <TouchableHighlight onPress={() => this.handleSelection(currentSet[2])} value={currentSet[2].title}>
                <Image  source={{uri:currentSet[2].url}} style={styles.image}/>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => this.handleSelection(currentSet[3])} value={currentSet[3].title}>
                <Image  source={{uri:currentSet[3].url}} style={styles.image}/>
              </TouchableHighlight>
            </View>
            <Text style={styles.wordAnswer}>{this.state.correct.toUpperCase()}</Text>
          </View>
        }
      </React.Fragment>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#C390D4',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'space-around',
    // backgroundColor: '#F5FCFF',
  },
  welcome: {
    position: 'absolute',
    fontSize: 24,
    top: '45%',
    textAlign: 'center',
  },
  instructions: {
    position: 'absolute',
    fontSize: 32,
    top: '50%',
    textAlign: 'center',
  },
  button: {
    borderColor: '#999999',
    borderRadius: 10,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 50,
    paddingRight: 50,

    backgroundColor: '#A1D490',
  },
  topSet: {
    flex: 1,
    width: '100%',
    // backgroundColor: '#C390D4',
    flexDirection: 'row',    
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  bottomSet: {
    // backgroundColor: '#A1D490',
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  image: {
    borderRadius: 10,
    alignContent: 'space-around',
    justifyContent: 'space-between',
    width: 175,
    height: 125,
    borderWidth: 5,
    borderColor: '#d6d7da',
  },
  highlight: {
    borderColor: '#A1D490',
  },
  wordAnswer: {
    position: 'absolute',
    top: '47.5%',
    fontSize: 24,
  }
});
