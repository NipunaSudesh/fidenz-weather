import cities from "@/data/cities.json";
import { getCache, setCache, CACHE_TTL } from "@/lib/cache";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const cityCode = searchParams.get("cityCode");

    console.log("City code:", cityCode);

    if (!cityCode) {
      return Response.json(
        { error: "City code is required" },
        { status: 400 }
      );
    }

    const city = cities.List.find(
      (item) => String(item.CityCode) === String(cityCode)
    );

    if (!city) {
      return Response.json(
        { error: "City not found" },
        { status: 404 }
      );
    }

    // Check cache
    const cacheKey = `forecast-${cityCode}`;
    const cached = getCache(cacheKey);

    if (cached.hit) {
      console.log("Forecast cache HIT:", cityCode);

      return Response.json(cached.data, {
        headers: {
          "X-Cache-Status": "HIT",
        },
      });
    }

    console.log("Forecast cache MISS:", cityCode);

    const url =
      `https://api.openweathermap.org/data/2.5/forecast` +
      `?id=${cityCode}` +
      `&appid=${process.env.OPENWEATHER_API_KEY}` +
      `&units=metric`;

    const response = await fetch(url);

    console.log(
      "Forecast response:",
      cityCode,
      response.status
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      console.error("OpenWeather forecast error:", {
        city: city.name,
        cityCode,
        status: response.status,
        error: errorData,
      });

      throw new Error(
        `OpenWeather forecast error: ${response.status}`
      );
    }

    const data = await response.json();

    const forecast = data.list.map((item) => ({
      time: item.dt_txt,
      temperature: item.main.temp,
    }));

    const result = {
      city: data.city.name,
      forecast,
    };

    // Cache forecast
    setCache(
      cacheKey,
      result,
      CACHE_TTL.RAW_WEATHER
    );

    return Response.json(result, {
      headers: {
        "X-Cache-Status": "MISS",
      },
    });
  } catch (error) {
    console.error("Forecast API error:", error);

    return Response.json(
      { error: "Failed to fetch forecast data" },
      { status: 500 }
    );
  }
}