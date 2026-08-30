"use client";

import Image from "next/image";

export default function WeatherCard({ city }) {
  const getWeatherImage = () => {
    const weather = city.weather?.toLowerCase();
    const description = city.description?.toLowerCase();

    if (weather === "clear") return "/sunnyPng.png";
    if (weather === "clouds") return "/cloud2.png";
    if (weather === "rain" || weather === "drizzle") return "/rainpng.png";
    if (weather === "thunderstorm") return "/thunder.png";
    if (weather === "snow") return "/snow.png";
    if (["fog", "mist", "haze"].includes(weather)) return "/fog.png";
    return "/sunnyPng.png";
  };

  const getLocalDateTime = (timestamp, timezone) => {
    const utcTime = timestamp * 1000;
    return new Date(utcTime + timezone * 1000);
  };

  const localDateTime = getLocalDateTime(city.timestamp, city.timezone);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/60 p-5 shadow-md transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900">
      {/* Header: icon + city + temp */}
      <div className="flex items-center justify-between gap-3">
        <div className="relative h-16 w-16 shrink-0">
          <Image
            src={getWeatherImage()}
            alt={city.description}
            fill
            sizes="64px"
            className="object-contain"
          />
        </div>

        <div className="flex-1 text-center">
          <h2 className="text-lg font-semibold leading-tight text-blue-900 dark:text-blue-300">
            {city.city}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {city.country}
          </p>
        </div>

        <h2 className="shrink-0 text-3xl font-bold text-blue-900 dark:text-blue-300">
          {Math.round(city.temperature)}°C
        </h2>
      </div>

      {/* Date / time */}
      <div className="mt-3 flex items-center justify-center gap-3 border-y border-slate-200 py-2 text-sm dark:border-slate-700">
        <p className="text-slate-500 dark:text-slate-400">
          {localDateTime.toLocaleDateString("en-US", {
            weekday: "short",
            day: "2-digit",
            month: "short",
            timeZone: "UTC",
          })}
        </p>
        <span className="h-1 w-1 rounded-full bg-slate-400" />
        <p className="font-medium text-slate-800 dark:text-white">
          {localDateTime.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: "UTC",
          })}
        </p>
      </div>

      {/* Condition */}
      <p className="mt-3 text-center text-sm font-medium capitalize text-slate-600 dark:text-slate-300">
        {city.description}
      </p>

      {/* Detail grid */}
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <Stat label="Humidity" value={`${city.humidity}%`} color="bg-blue-600" />
        <Stat label="Pressure" value={`${city.pressure} hPa`} color="bg-emerald-600" />
        <Stat label="Cloudiness" value={`${city.cloudiness}%`} color="bg-blue-600" />
        <Stat label="Visibility" value={`${(city.visibility / 1000).toFixed(1)} km`} color="bg-emerald-600" />
        {/* <Stat
          label="Wind"
          value={`${city.windSpeed} m/s`}
          color="bg-amber-600"
          full
        /> */}
<p className="col-span-2 w-full rounded-xl bg-amber-600 py-1.5 text-center text-slate-100">
        <span className="text-xs opacity-90">Wind Speed: </span>
      <span className="font-semibold"> {city.windSpeed} m/s</span>
    </p>
      </div>
    </div>
  );
}

function Stat({ label, value, color, full }) {
  return (
    <div
      className={`flex items-center justify-between rounded-lg px-3 py-1.5 text-white ${color} ${
        full ? "col-span-2" : ""
      }`}
    >
      <span className="text-xs opacity-90">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}