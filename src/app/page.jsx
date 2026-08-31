"use client"
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

export default function Home() {
  const [cities, setCities] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

const fetchWeatherData  = async ()=>{
  try{
    const res = await fetch("/api/weather");
    if(!res.ok){
      throw new Error("Failed to fetch weather data");
    }
    const data =await res.json();
    setCities(data);
    console.log("weather data:", data);
  }catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
}

useEffect(()=>{
  fetchWeatherData ();
},[])
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-16">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((city) => (
              <div
                key={city.cityCode}
                className="rounded-lg border border-slate-200 bg-white p-6 shadow-md transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900"
              >
                <h2 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">
                  {city.city}, {city.country}
                </h2>
                <p className="text-slate-700 dark:text-slate-300">
                  Temperature: {city.temperature}°C
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  Humidity: {city.humidity}%
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  Wind Speed: {city.windSpeed} m/s
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  Pressure: {city.pressure} hPa
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  Cloudiness: {city.cloudiness}%
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  Visibility: {city.visibility} m
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  Weather: {city.weather} ({city.description})
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
