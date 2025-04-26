import React from "react";
import axios from "axios";
import ForestCard from "./ForestCard";
const BASE_URL = "https://api.open-meteo.com/v1/forecast";

const WeatherApi = () => {
const [forecastData, setForecastData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const latitude = 52.52;
  const longitude = 13.41;
    const getWeatherForecast = async (latitude, longitude) => {
        try {
          const response = await axios.get(BASE_URL,{
              params: {
                  latitude,
                  longitude,
                  daily: ["weathercode", "temperature_2m_max", "temperature_2m_min", "sunrise", "sunset", "weather_code"],
                  current: "temperature_2m",
                  timezone: "auto",
                  past_days: 3
              }
          });
          console.log(response.data);
          return response.data;
        } catch (error) {
          console.log(error);
        }
      };
      
      React.useEffect(() => {
        getWeatherForecast();
        getForeCast();
      }, []);



      const getForeCast = async () => {
        try {
            const data = await getWeatherForecast(latitude, longitude);
            // Prepare data for next 3 days
            const dailyData = data.daily;
            const nextThreeDays = Array.from({ length: 3 }, (_, i) => ({
              date: dailyData.time[i],
              maxTemp: dailyData.temperature_2m_max[i],
              minTemp: dailyData.temperature_2m_min[i],
              weatherCode: dailyData.weathercode[i],
            }));
            setForecastData(nextThreeDays);
          } catch (err) {
            setError('Failed to fetch forecast');
          } finally {
            setLoading(false);
          }
        };
        if (loading) return "Loading...";
        if (error) return <h2>{error}</h2>;
        return     <div >
       
        <div >
          {forecastData.map((forecast, index) => (
            <ForestCard key={index} forecast={forecast} />
          ))}
        </div>
      </div>;
    }

export default WeatherApi;



