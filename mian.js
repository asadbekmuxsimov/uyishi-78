document.addEventListener("DOMContentLoaded", () => {
  const darkMoon = document.querySelector(".dark-moon-button");
  const hourItem = document.querySelectorAll(".hours-box");
  const container = document.querySelector(".container");
  const blackWhite = document.querySelector(".black-white");
  const imgs = document.querySelectorAll("img");
  const darkHour = document.querySelectorAll(".d-hour");
  const gradus = document.querySelector(".gradus");
  const feels_gradus = document.querySelector(".feels-gradus");
  const senrice_hour = document.querySelector(".sunrice");
  const sunset = document.querySelector(".sunset");
  const img_condition = document.querySelector(".img-condition");
  const today_sunnnyy = document.querySelector(".today-sunnyy");
  const humidity = document.querySelector(".huminity");
  const wind_speed = document.querySelector(".wind");
  const pressure = document.querySelector(".pressure");
  const uv = document.querySelector("uv");
  const form = document.querySelector("form");
  // const current_location = document.querySelector(".current-location");
  let footer_first_box = document.querySelector(".footer-first-box");

  // finding Longitube and Latitude

  function currentPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
      let longitude = position.coords.longitude;
      let latitude = position.coords.latitude;
      console.log(position);
      choosingWeather(
        "forecast.json",
        `${longitude}`.slice(0, 7) + "," + `${latitude}`.slice(0, 7)
      );
    });
  }
  // currentPosition();
  // current_location.addEventListener("click", () =>{
  //   currentPosition();
  // });
  darkMoon.addEventListener("click", () => {
    darkMoon.classList.toggle("light");
    blackWhite.classList.toggle("black-white-right");
    container.classList.toggle("moon");
    gradus.classList.toggle("gradus-moon");

    hourItem.forEach((e) => {
      e.classList.toggle("sunny-hour");
    });
    imgs.forEach((i) => {
      i.classList.toggle("box-shadow-dark");
    });
    darkHour.forEach((d) => {
      d.classList.toggle("dark-hour");
    });
  });

  // working with weather api
  const apiKey = "0731d053b3e243b5ba960126240212";
  const baseUrl = "http://api.weatherapi.com/v1";

  async function choosingWeather(enPoint, q) {
    let response = await fetch(`${baseUrl}/${enPoint}?key=${apiKey}&q=${q}`);
    // console.log(q);
    let data = await response.json();
    console.log(data);
    gradus.textContent = data.current.temp_c + " " + "°C";
    feels_gradus.textContent = data.current.feelslike_c + " " + "°C";
    senrice_hour.textContent = data.forecast.forecastday[0].astro.sunrise;
    sunset.textContent = data.forecast.forecastday[0].astro.sunset;
    img_condition.src = `http:${data.current.condition.icon}`;
    today_sunnnyy.textContent = data.current.condition.text;
    humidity.textContent = data.current.humidity + "%";
    wind_speed.textContent = data.current.wind_kph + " " + "km/h";
    pressure.textContent = data.current.pressure_mb + " " + "hPa";
    uv.textContent = data.current.uv;
  }
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let city = e.target[0].value;
    choosingWeather("forecast.json", city);
    forecastDays("forecast.json", city, 5);
    form.reset();
  });

  // forecast days
  async function forecastDays(endPoint, q, days) {
    footer_first_box.innerHTML = "";
    let daysWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    let response = await fetch(
      `${baseUrl}/${endPoint}?key=${apiKey}&q=${q}&days=${days}`
    );
    let data = await response.json();
    data.forecast.forecastday.forEach((day) => {
      let date = new Date(day.date);
      // console.log(data.getDay());
      let oneDay = document.createElement('div');
      oneDay.classList.add("days-item");
      oneDay.innerHTML = `
      <img src=${day.day.condition.icon} alt="icon" />
      <p class="days-degry">${day.day.mintemp_c}°C<p/>
      <p class="days-degry">${daysWeek[date.getDay() - 1]
        }, ${date.getDate()} ${months[date.getMonth()]}</p>
      `;

      footer_first_box.append(oneDay);
    });
    console.log(data.forecast.forecastday);
  }
  forecastDays("forecast.json", "London", 5);

  // choosingWeather("forecast.json", "Tashkent");
});
