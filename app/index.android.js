/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

var DismissKeyboard = require('dismissKeyboard');

import React, { Component } from 'react';
import * as Animatable from 'react-native-animatable';

var currentPage = 1;
var totalResults = [];
var productByName = {};

import ReactNative, {
  Alert,
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  ListView,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Picker,
  Linking,
  RefreshControl,
  ActivityIndicator
} from 'react-native';

const Item = Picker.Item;
const TimerMixin = require('react-timer-mixin');
//const View = Animatable.createAnimatableComponent(ReactNative.View);

class DicasPresentear extends Component {

	constructor(props) {
    super(props);

	this.renderRow = this.renderRow.bind(this)
	this._pressRow = this._pressRow.bind(this)

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

  componentDidMount() {
    //this.fetchResults();
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

  _onRefresh() {
    this.setState({
      refreshing: true
    });

    totalResults = [];
    this.fetchResults();
  }

  render() {

    return (

	  <View style={styles.container}>


		<View  style={ !this.state.loaded ? styles.header : styles.simpleHeader } >

			<View style={{ flexDirection: 'row'}}>
				<Text style={styles.logo}>
				  Presentes
				</Text>


				{this.state.loaded ? this.renderToggleFilter() : null }

			</View>

			{!this.state.loaded ? this.renderFilter() : null }


		</View>

		<View style={styles.body} >

    {this.state.loading ? this.renderLoadingView() : null }
 
    {totalResults.length == 0 && !this.state.loading ? this.renderNoResultsText() : null }


			<ListView animation="fadeIn"
        enableEmptySections={true}
        refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh.bind(this)}
                />
              }
				dataSource={this.state.dataSource}
				renderRow={this.renderRow}
        onEndReachedThreshold={200}
				onEndReached={this.fetchResults.bind(this)}
				style={styles.listView}
				renderSeparator={this._renderSeperator}  />

		</View>
      </View>

    );
  }

  onEndReached(page) {
      //this.fetchResults(page);
  }

  _handleToggleFilter() {
	  this.setState({loaded: !this.state.loaded});
	  //this.setState({dataSource: null});
  }

  _handleSeach() {
	  DismissKeyboard();

    totalResults = [];

    this.setState({
      loading: true,
      dataSource: this.state.dataSource.cloneWithRows(totalResults)
    });

	  this.fetchResults();
  }

  renderNoResultsText() {
  	return (

  		<Text style={styles.noResult} >Selecione um filtro e ache os melhores presentes para a pessoa que você ama</Text >

  	);
  }

  renderToggleFilter() {
  	return (

  		<TouchableOpacity  style={styles.toogleFilter}
					onPress={() => this._handleToggleFilter()}>
						<Text style={styles.toogleFilterText}>Filtro</Text>
				</TouchableOpacity >

  	);
  }

  renderFilter() {
	  return (
		  <Animatable.View  animation="fadeIn" duration={500} style={{flex: 1, flexDirection: 'column'}}>
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

			</Animatable.View>
			);
  }

  renderAnotherPrice() {

	  return (

		<TextInput keyboardType="numeric"
		  style={styles.price}
		  placeholder="Digite o preço do presente"
		  onChangeText={(text) => this.setState({value: text})} />
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

   renderRow(data: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {

     if(!data.URLImagem.contains('http://')) {
       data.URLImagem = 'http://' + data.URLImagem;
     }

    return (

	   <TouchableHighlight onPress={() => {
          this._pressRow(data.URLAfiliados);
          //highlightRow(sectionID, rowID);
        }}>

				<View style={styles.row}>

					<Image
					  source={{uri: data.URLImagem}}
					  style={styles.thumbnail} 	/>
					<View style={styles.rightContainer}>
					  <Text style={styles.title}>{data.Nome}</Text>
					  <Text style={styles.priceMin}>R$ {data.PrecoMin}</Text>
					</View>

				</View>

      </TouchableHighlight>

    );
  }

   _pressRow(url) {
		Linking.canOpenURL(url).then(supported => {
		  if (!supported) {
			console.log('Can\'t handle url: ' + url);
		  } else {
			return Linking.openURL(url);
		  }
		}).catch(err => console.error('An error occurred', err));
  }

   _renderSeperator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{ height: adjacentRowHighlighted ? 4 : 1, backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',  }} />
    );
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
	flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
	  //flex: 2,
	  flexDirection: 'column',
	  backgroundColor: '#FF6B6B',
	  alignSelf: 'stretch',
	  height: 250 ,
	  paddingLeft: 15,
	  paddingTop: 10,
	  paddingRight: 15
	  //paddingBottom: 20
  },
  simpleHeader: {
	  backgroundColor: '#FF6B6B',
	  alignSelf: 'stretch',
	  height: 50,
	  paddingLeft: 15,
	  paddingTop: 10,
	  paddingRight: 15
  },
  logo: {
	color: 'white',
	fontSize: 18,
	flex: 3
	//marginLeft: 15,
	//marginTop: 15
  },
  toogleFilter: {
	  flex: 1,
	  alignSelf: 'center'
  },
  toogleFilterText: {
	  color: 'white',
	  textAlign: 'right',
	  fontWeight: 'bold'
  },
  price: {
	  height:40,
	  backgroundColor: 'white',
	  marginTop:15
  },
  gender: {
	  height:40,
	  backgroundColor: 'white',
	  marginTop:15
  },
  age: {
	  height:40,
	  backgroundColor: 'white',
	  marginTop:15
  },
  search: {
	color: 'white',
	fontWeight: 'bold',
	fontSize: 16,
	marginTop:10,
	marginBottom: 0
  },

  body: {
	flex: 2,
	marginLeft: 0,
	backgroundColor: '#fff'
  },

  row: {
	flex: 1,
	flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
	paddingLeft: 5,
	paddingRight: 5,
	backgroundColor: 'white'
  },

  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    marginBottom: 8,
    textAlign: 'center',
  },
  priceMin: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  listView: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#fff',
  },

  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    zIndex: 10
  },

  loading: {
	fontSize: 16,
	marginTop:25,
    textAlign: 'center'
  },

  noResult: {
    textAlign: 'center',
    alignItems: 'center',
    marginTop: 10,
    padding: 15,
    fontSize: 16
  }

});


AppRegistry.registerComponent('DicasPresentear', () => DicasPresentear);
