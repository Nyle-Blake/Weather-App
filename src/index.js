import './styles.css';

const searchBar = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
const tempPara = document.querySelector('.temp');
const windSpeedPara = document.querySelector('.wind-speed');
const humidityPara = document.querySelector('.humidity');
const weatherIcon = document.querySelector('.weather-icon');

const getData = async () => {
  const location = searchBar.value;

  try {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=4fac0367e2424e9c8d9102850240805&q=${location}`, { mode: 'cors' });
    const locationData = await response.json();

    return locationData;
  } catch (err) {
    console.log(err, 'No such city');
  }
};

const setData = async () => {
  const data = await getData();
  const {
    temp_c, temp_f, wind_mph, humidity,
  } = data.current;

  tempPara.textContent = `${temp_c} C`;
  windSpeedPara.textContent = `${wind_mph} MPH`;
  humidityPara.textContent = `${humidity} RH`;

  const weatherIconUrl = data.current.condition.icon.slice(20);
  weatherIcon.src = weatherIconUrl;
};

searchBtn.addEventListener('click', () => {
  tempPara.textContent = '';
  windSpeedPara.textContent = '';
  humidityPara.textContent = '';
  setData();
  searchBar.value = '';
});
