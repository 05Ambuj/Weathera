const cityForm = document.querySelector("form");
const details = document.querySelector(".details");
const cards = document.querySelector(".card");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const bg = document.querySelector("body");
const head = document.querySelector("h1");
const updateUI = (data) => {
  console.log(data);
  const weather = data.weather;
  // update details template

  const regionNamesInEnglish = new Intl.DisplayNames(["en"], {
    type: "region",
  });
  details.innerHTML = `
  <h5 class="my-3">${weather.name}</h5>
    <h5 class="my-3">${regionNamesInEnglish.of(weather.sys.country)}</h5>
    <div class="display-6 my-3">
    <span>${weather.main.temp}</span>
    <span>&deg;C</span>
    </div>
    <div class="my-2 text-black">${weather.weather[0].description}</div>
    <div class="display-7">
      <span>Humidity:</span>
      <span>${weather.main.humidity}</span>
      <span>%</span>
    </div>
    <div class="display-7">
      <span>Wind Speed:</span>
      <span>${weather.wind.speed}</span>
      <span>km/h</span>
    </div>
  `;

  // INSERT BACKGROUND

  let back = null;
  if (weather.weather[0].icon.includes("n")) {
    back = "imgs/nightbg.jpg";
    head.classList.remove("text-muted");
    cityForm.classList.remove("text-muted");
    head.classList.add("head");
    cityForm.classList.add("head");
  } else {
    back = "imgs/daybg2.jpg";
    cityForm.classList.remove("text-muted");
    cityForm.classList.add("head");
    head.classList.add("text-muted");
    head.classList.remove("head");
  }
  document.body.style.backgroundSize = "cover";
  bg.setAttribute("background", back);
  // INSERT WEATHER ICON
  const iconCode = weather.weather[0].icon;
  const iconLink = `http://openweathermap.org/img/w/${iconCode}.png`;
  icon.setAttribute("src", iconLink);
  // Switch between Day and Night Images
  let timesrc = null;
  if (weather.weather[0].icon.includes("n")) {
    timesrc = "imgs/night.svg";
  } else {
    timesrc = "imgs/day.svg";
  }
  time.setAttribute("src", timesrc);

  // remove the d-none class if present
  if (cards.classList.contains("d-none")) {
    cards.classList.remove("d-none");
  }
};

const updateCity = async (city) => {
  const weather = await getWeather(city);
  return {
    weather: weather,
  };
};

cityForm.addEventListener("submit", (e) => {
  // PREVENT DEFAULT METHODS
  e.preventDefault();

  //   GET CITY VALUE
  const city = cityForm.city.value.trim();
  cityForm.reset();

  //   UPDATE UI WITH NEW CITY
  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));

  // SET LOCAL STORAGE
  localStorage.setItem("city", city);
});

if (localStorage.getItem("city")) {
  updateCity(localStorage.getItem("city"))
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
}
