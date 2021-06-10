
const input = document.querySelector('input');
const btn = document.querySelector('button');

const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');

const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&appid=c89e5a16d1b5e2c4b28631d81df6cbcc';
const units = '&units=metric';

let city, url;
let city2;

const getWeather = () => {
   
    city = (!input.value) ? 'bochnia' : input.value;
    
    url = apiLink + city + apiKey + units;
    memory = input.value;
    console.log(memory);
 
    axios.get(url)
         .then(res => {

            warning.textContent = '';
            
            input.value = '';
            
            const temp = res.data.main.temp;
            const status = Object.assign({}, ...res.data.weather)
            weather.textContent = status['main' ];

            temperature.textContent = Math.floor(temp) + ' °C';
            humidity.textContent = res.data.main.humidity + ' %';
            cityName.textContent = res.data.name;


            if (status.id >= 200 && status.id < 300) {
                photo.setAttribute('src', 'img/thunderstorm.png');
            } else if(status.id >= 300 && status.id < 500) {
                photo.setAttribute('src', 'img/drizzle.png')
            }  else if (status.id >= 500 && status.id < 600) {
                photo.setAttribute('src', 'img/rain.png')
            } else if (status.id >= 600 && status.id < 700 ) {
                photo.setAttribute('src', 'img/ice.png')
            } else if (status.id >= 701 && status.id < 800) {
                photo.setAttribute('src', 'img/fog.png')
            }   else if (status.id == 800  ) {
                photo.setAttribute('src','img/sun.png')
            }   else if ( status.id > 800 && status.id < 900) {
                photo.setAttribute('src','img/cloud.png')
            }   else {
                photo.setAttribute('src','img/unknown.png')
            }
    })
    .catch( () => warning.textContent = 'Wpisz poprawną nazwę miasta!' )
    
};

const enterChek = () => {

    if(event.keyCode === 13) {
        getWeather();
    }
};

getWeather();
btn.addEventListener('click', getWeather);
input.addEventListener('keyup', enterChek);