import React, { Component } from 'react';

import { View, Text, Pano, AppRegistry, asset } from 'react-vr';

import WeatherCard from './vr/components/WeatherCard';
import WindCloudObject from './vr/components/WindCloudObject';

const api_key = 'e55d7f465a33202ff3c77db687e2559f';

class WeatherSimulator extends Component {
  constructor() {
    super();

    this.state = {
      weatherObject: {
        name: '',
        main: {
          temp: 0
        },
        weather: [
          {
            description: ''
          }
        ],
        wind: {
          deg: 1,
          speed: 1
        }
      }
    }
  }


  componentDidMount() {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=Bucharest&units=metric&appid=${api_key}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(json => this.setState({ weatherObject: json }));
  }

  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }
      }>
        <Pano source={asset('lombard-vr.jpg')}></Pano>
        <WeatherCard weatherObject={this.state.weatherObject} />
        <WindCloudObject wind={this.state.weatherObject.wind} />
      </View>
    )
  }
};

AppRegistry.registerComponent('WeatherSimulator', () => WeatherSimulator);
