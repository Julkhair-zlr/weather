  import React from 'react';
  
  const ForestCard = ({ forecast }) => {
    return (
        <div >
        <h3>{new Date(forecast.date).toDateString()}</h3>
        <p>Max Temp: {forecast.maxTemp}°C</p>
        <p>Min Temp: {forecast.minTemp}°C</p>
        <p>Weather Code: {forecast.weatherCode}</p>
      </div>
    );
  }
  
  export default ForestCard;
  