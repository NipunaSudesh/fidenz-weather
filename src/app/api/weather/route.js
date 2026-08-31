import cities from "@/data/cities.json";
import { calculateComfortIndex } from "@/lib/comfortIndex";

export async function GET() {
  try {
    const cityCodes = cities.List
      .map((city) => ({
        id: city.CityCode,
        name: city.CityName,
      }))
      .slice(0, 10);

    const results = await Promise.all(
      cityCodes.map(async (city) => {
        const url =
          `https://api.openweathermap.org/data/2.5/weather` +
          `?id=${city.id}` +
          `&appid=${process.env.OPENWEATHER_API_KEY}` +
          `&units=metric`;

        const response = await fetch(url);
console.log(response);

        if (!response.ok) {
          throw new Error(
            `OpenWeather API error: ${response.status}`
          );
        }

        const data = await response.json();
             const comfortScore = calculateComfortIndex({
          temperature: data.main.temp,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          cloudiness: data.clouds.all,
        });

        return {
          cityCode: city.id,
          city: data.name,
          country: data.sys.country,

          temperature: data.main.temp,
          humidity: data.main.humidity,

          windSpeed: data.wind.speed,
          pressure: data.main.pressure,

          cloudiness: data.clouds.all,
          visibility: data.visibility,

          weather: data.weather[0].main,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
             timezone: data.timezone,
           timestamp: data.dt,
           comfortScore: comfortScore,
        };
      })
    );

results.sort((a, b) => b.comfortScore - a.comfortScore);

//add ranking
    const rankedResults = results.map((city, index) => ({
      ...city,
      rank: index + 1,
    }));

return Response.json(rankedResults);


  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Failed to fetch weather data",
      },
      {
        status: 500,
      }
    );
  }
}