import React from 'react';

import styles from './App.module.css'

// Import of components
import Cards from './components/Cards/Cards';
import Chart from './components/Chart/Chart';
import CountryPicker from './components/CountryPicer/CountryPicer';

import { fetchData } from './api/index';

import coronaImage from './images/covid2.png'; //Name the image

class App extends React.Component {
  state = { data: {}, country: '',}; //The DATA we got from API ,  Because it's a dynamic DATA

  async componentDidMount(){
    const fetchedData = await fetchData();

    this.setState({data: fetchedData});
  }

  //4
  handleCoutryChange = async (country) => {
    console.log(fetchData);
    console.log(country);
    //fetch the data
    const fetchedData = await fetchData(country);

    //set the state DATA and by country
    this.setState({data: fetchedData, country: country});
    
  }

  render(){
    const {data, country} = this.state;

  return (
    <div className={styles.container}>
      <img className={styles.image} src={coronaImage} alt='COVID-19'/>
      <Cards data={data}/>
      <CountryPicker handleCoutryChange={this.handleCoutryChange}/> 
      <Chart data={data} confirmed={data.confirmed} recovered={data.recovered} deaths={data.deaths} lastUpdate={data.lastUpdate} country={country}/>
    </div>
  );
 }
}

export default App;