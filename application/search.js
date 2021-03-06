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
  RefreshControl,
  ActivityIndicator 
} = ReactNative;

const Item = Picker.Item;

var filter = require('./filter');
var DismissKeyboard = require('dismissKeyboard');

var currentPage = 1;
var totalResults = [];
var productByName = {};

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


  getRecommendationsAsync(onSuccess) {

      //var url = 'http://api.dicaspresentear.com.br/api/v1/Produto/Listar?Auditado=true&Idade=&Tag=&Valor=&TotalRegistros=30&Pagina=' + currentPage + '&Genero=';
      var url = 'http://api.dicaspresentear.com.br/api/v1/Produto/Listar?Auditado=true&Idade=' + this.state.age + '&Tag=&Valor=' + this.state.price +'&TotalRegistros=30&Pagina=' + currentPage + '&Genero=' + this.state.gender;

      return fetch(url)
           .then((response) => response.json())
           .then((responseJson) => {
             onSuccess(responseJson.Data)
             //return responseJson.Data;
           })
           .catch((error) => {
             console.error(error);
           });

    }

    fetchResults() {
      console.log('fetch');

      var self = this;

      this.getRecommendationsAsync(function(data) {

        console.log(data);

        for (var key in data) {
          totalResults.push(data[key]);
        }

        console.log(totalResults.length);

        self.setState({
          dataSource: self.state.dataSource.cloneWithRows(totalResults),
          loaded: true,
          loading: false,
          refreshing: false
        });

        if(totalResults.length == 0) {
          self.setState({
            loaded: false
          });

          Alert.alert('Presentes não encontrados', 'Não foi localizado nenhum resultado para o filtro selecionado. Por favor, mude os filtros e tente novamente.');

        }

        currentPage++;

      });


    }

handleSeach() {
  DismissKeyboard();

  totalResults = [];

  this.setState({
    loading: true,
    dataSource: this.state.dataSource.cloneWithRows(totalResults)
  });

  this.fetchResults();
}



  render() {
    return (
      <View style={{flexDirection: 'column'}}>

        {!this.state.loaded ? this.renderFilter() : null }

        {this.state.loading ? this.renderLoadingView() : null }

      </View>
    );
  }

  renderLoadingView() {
  return (
    <ActivityIndicator elevation={10}
     animating={this.state.loading}
     style={[styles.centering, {height: 80}]}
     size="large"
   />
  );
}

  renderFilter() {
	  return (
		  <View style={{ flexDirection: 'column', height: 210, padding: 5, backgroundColor: '#4196cc' }}>
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

				<TouchableOpacity  style={{flex: 1, alignItems: 'center', alignSelf: 'stretch', marginTop:10, backgroundColor: '#FF6B6B' }}
				onPress={() => this.handleSeach()}>
					<Text style={styles.search}>Buscar Recomendação</Text>
				</TouchableOpacity >

			</View>
			);
  }
}

var styles = StyleSheet.create({
  price: {
  height:40,
  backgroundColor: 'white',
  marginTop:10
},
gender: {
  height:40,
  backgroundColor: 'white',
  marginTop:0
},
age: {
  height:40,
  backgroundColor: 'white',
  marginTop:10
},
  search: {
    color:  'white',
    fontWeight: 'bold',
    fontSize: 16,
    paddingTop: 20,
    marginTop:12,
    alignSelf: 'center'

  },

  centering: {
  alignItems: 'center',
  justifyContent: 'center',
  padding: 8,
  zIndex: 10
}

});

module.exports = Search;
