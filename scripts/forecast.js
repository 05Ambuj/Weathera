const key = "52bcdc97bb0cd195d27b04573e82f843";

// GET WEATHER INFO

const getWeather = async (id) => {
  const base = "https://api.openweathermap.org/data/2.5/weather";
  const query = `?q=${id}&appid=${key}&units=metric`;
  const response = await fetch(base + query);
  const data = await response.json();
  return data;
};
