"use client"
import Navbar from "@/components/Navbar";
import WeatherCard from "@/components/WeatherCard";
import { useEffect, useState } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Dashboard() {
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
    <div className="min-h-screen bg-slate-200 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-16">
  {/* <div className="flex gap-3">
        <Link
          href="/signin"
          className="rounded-lg bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
        >
          Sign In 
        </Link>

        <Link
          href="/signup"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Sign Up
        </Link>
      </div> */}
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((city) => (
              <WeatherCard key={city.cityCode} city={city} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
