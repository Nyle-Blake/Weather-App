import './styles.css';

const searchBar = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');

const cityNameHeader = document.querySelector('.city-name-header');
const tempPara = document.querySelector('.temp');
const windSpeedPara = document.querySelector('.wind-speed');
const humidityPara = document.querySelector('.humidity');
const weatherIcon = document.querySelector('.weather-icon');

const getData = async () => {
  try {
    const location = searchBar.value;
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=4fac0367e2424e9c8d9102850240805&q=${location}`, { mode: 'cors' });
    const locationData = await response.json();
    return locationData;
  } catch (err) {
    console.log(err, 'no such city');
  }
};

const setData = async () => {
  const data = await getData();
  const {
    temp_c, wind_mph, humidity,
  } = data.current;

  cityNameHeader.textContent = data.location.name;
  tempPara.textContent = `Temperature: ${temp_c} deg c`;
  windSpeedPara.textContent = `Wind-Speed: ${wind_mph} Mp/h`;
  humidityPara.textContent = `Humidity: ${humidity} %`;

  const weatherIconUrl = data.current.condition.icon.slice(20);
  weatherIcon.src = weatherIconUrl;
};

searchBtn.addEventListener('click', () => {
  document.querySelector('.outer-cell').style.gap = '60px';
  tempPara.textContent = '';
  windSpeedPara.textContent = '';
  humidityPara.textContent = '';
  setData();
  searchBar.value = '';
});
