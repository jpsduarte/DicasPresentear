'use strict';

import React, { Component } from 'react';
var ReactNative = require('react-native');
var {
  StyleSheet,
  Text,
  View,
   ListView,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Picker,
  Linking,
  RefreshControl
} = ReactNative;

const Item = Picker.Item;

class Search extends Component {

  constructor(props) {
    super(props);

	//this.renderRow = this.renderRow.bind(this)
	//this._pressRow = this._pressRow.bind(this)

  //const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
		 dataSource: new ListView.DataSource({
         rowHasChanged: (row1, row2) => row1 !== row2,
       }),
    //dataSource: ds,
    loaded: false,
	  loading: false,
    refreshing: false,
	  gender: '',
	  age: 25,
	  price: ''
    };
  }

  render() {
    return (
      <View style={{flexDirection: 'column', flex: 1, padding: 20, backgroundColor: '#4196cc'}}>

        {!this.state.loaded ? this.renderFilter() : null }

      </View>
    );
  }

  renderFilter() {
	  return (
		  <View style={styles.filter} duration={500}>
				<Picker style={styles.gender}
				  selectedValue={this.state.gender}
				  onValueChange={(gender) => this.setState({gender: gender})}>
				  <Item label="Selecione o gênero" value="" />
				  <Item label="Masculino" value="Homem" />
				  <Item label="Feminino" value="Mulher" />
				</Picker>

				  <Picker style={styles.age}
				  selectedValue={this.state.age}
				  onValueChange={(age) => this.setState({age: age})}>
				  <Item label="Selecione a idade" value="" />
				  <Item label="0 a 3 meses" value="0.3" />
				  <Item label="3 a 6 meses" value="0.6" />
				  <Item label="6 a 9 meses" value="0.9" />
				  <Item label="9 a 12 meses" value="1" />
				  <Item label="1 ano" value="1" />
				  <Item label="2 anos" value="2" />
				  <Item label="3 anos" value="3" />
				  <Item label="4 anos" value="4" />
				  <Item label="5 anos" value="5" />
				  <Item label="6 anos" value="6" />
				  <Item label="7 anos" value="7" />
				  <Item label="8 anos" value="8" />
				  <Item label="9 anos" value="9" />
				  <Item label="10 anos" value="10" />
				  <Item label="15 anos" value="15" />
				  <Item label="25 anos" value="25" />
				  <Item label="30 anos" value="30" />
				  <Item label="40 anos" value="40" />
				  <Item label="50 anos" value="50" />
				  <Item label="60 anos" value="60" />
				  <Item label="70 anos" value="70" />
				  <Item label="80 anos" value="80" />
				  <Item label="90 anos" value="90" />
				  <Item label="99 anos" value="99" />
				</Picker>

				<Picker style={styles.price}
				  selectedValue={this.state.price}
				  onValueChange={(price) => this.setState({price: price})}>
				  <Item label="Selecione o preço" value="" />
				  <Item label="0 a 50 reais" value="25" />
				  <Item label="50 a 100 reais" value="80" />
				  <Item label="100 a 250 reais" value="200" />
				  <Item label="250 a 500 reais" value="350" />
				  <Item label="500 a 1000 reais" value="500" />
				  <Item label="Outro" value="0" />
				</Picker>

				<TouchableOpacity  style={{flex: 1, alignItems: 'center'}}
				onPress={() => this._handleSeach()}>
					<Text style={styles.search}>Buscar Recomendação</Text>
				</TouchableOpacity >

			</View>
			);
  }
}

var styles = StyleSheet.create({
  filter: {
    flex: 1,
    flexDirection: 'column'
  },
  search: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop:10,
    marginBottom: 0
  }


});

module.exports = Search;
