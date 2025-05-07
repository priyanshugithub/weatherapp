import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSky from "./AnimatedSky";
// import HourlyScroll from "./HourlyScroll";

/**
 * WeatherApp
 *
 * A simple, responsive weather application that fetches current
 * weather conditions and a 5‑day / 3‑hour forecast from the
 * OpenWeatherMap REST API.
 *
 * Requirements
 * ------------
 * 1. Tailwind CSS (v3 or later) configured in your project.
 * 2. shadcn/ui components installed (`npx shadcn@latest init`).
 * 3. An environment variable named `VITE_WEATHER_API_KEY`
 *    containing your OpenWeatherMap API key.
 *
 * Usage
 * -----
 * Add <WeatherApp /> to your component tree.
 */

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY; // CRA style

export default function WeatherApp() {
  const [city, setCity] = useState("Berlin");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const hour = new Date().getHours();          // 0‒23

  // Fetch initial data for default city
  useEffect(() => {
    handleSearch(city);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSearch(query) {
    if (!query) return;
    setLoading(true);
    setError("");

    try {
      const [w, f] = await Promise.all([
        fetchCurrentWeather(query),
        fetchForecast(query),
      ]);
      setWeather(w);
      setForecast(f);
    } catch (err) {
      console.error(err);
      setError("Could not fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function fetchCurrentWeather(q) {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        q
      )}&units=metric&appid=${API_KEY}`
    );
    if (!res.ok) throw new Error("network");
    return res.json();
  }

  async function fetchForecast(q) {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
        q
      )}&units=metric&cnt=40&appid=${API_KEY}`
    );
    if (!res.ok) throw new Error("network");
    const data = await res.json();
    // Group by day (8 × 3‑hour segments = 24 h)
    const daily = data.list.reduce((acc, item) => {
      const day = item.dt_txt.split(" ")[0];
      acc[day] = acc[day] || [];
      acc[day].push(item);
      return acc;
    }, {});
    // Return only the midday snapshot for each day to keep UI compact
    return Object.values(daily).map((arr) => arr[Math.floor(arr.length / 2)]);
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-sky-50 to-indigo-100 p-6">
      <header className="w-full max-w-md flex gap-2 mb-6">
      <main className="relative min-h-screen overflow-x-hidden text-white">
   
 {weather && (
   <AnimatedSky
     condition={weather.weather[0].main}   // "Clear", "Clouds", "Rain", …
     hour={hour}
   />
 )}
    {/* <NowPane city={city} temp={weather.temp} description={weather.desc} />
    <HourlyScroll list={hourlyData} />
    <DailyGrid list={dailyData} /> */}
  </main>
      {/* <AnimatedSky condition={weather.main} hour={new Date().getHours()} />
        <Input
          placeholder="Search city…"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1 rounded-2xl"
        />
        <Button
          size="icon"
          onClick={() => handleSearch(city)}
          disabled={loading}
        >
          <Search className="h-5 w-5" />
        </Button> */}
      </header>

      <AnimatePresence>
        {loading && (
          <motion.p
            key="loading"
            className="text-sm text-indigo-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Loading…
          </motion.p>
        )}
      </AnimatePresence>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 p-2 rounded-xl mb-4">
          {error}
        </p>
      )}

      {weather && <WeatherCard data={weather} />}

      {forecast.length > 0 && (
        <section className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 w-full max-w-2xl">
          {forecast.map((item) => (
            <ForecastCard key={item.dt} data={item} />
          ))}
        </section>
      )}
    </div>
  );
}

function WeatherCard({ data }) {
  const {
    name,
    sys: { country },
    main: { temp, temp_min, temp_max, humidity },
    weather: [details],
    wind: { speed },
  } = data;
  const iconUrl = `https://openweathermap.org/img/wn/${details.icon}@4x.png`;

  return (
    <Card className="w-full max-w-md shadow-xl rounded-2xl">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <img src={iconUrl} alt={details.description} className="h-28 w-28" />
        <h2 className="text-2xl font-semibold mb-1">
          {name}, {country}
        </h2>
        <p className="capitalize text-indigo-600 mb-4">
          {details.description}
        </p>
        <p className="text-5xl font-bold mb-4">{Math.round(temp)}°C</p>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <Stat label="Min" value={`${Math.round(temp_min)}°`} />
          <Stat label="Max" value={`${Math.round(temp_max)}°`} />
          <Stat label="Humidity" value={`${humidity}%`} />
          <Stat label="Wind" value={`${speed} m/s`} />
        </div>
      </CardContent>
    </Card>
  );
}

function ForecastCard({ data }) {
  const {
    dt_txt,
    main: { temp },
    weather: [details],
  } = data;
  const date = new Date(dt_txt);
  const iconUrl = `https://openweathermap.org/img/wn/${details.icon}@2x.png`;

  return (
    <motion.div
      className="bg-white/50 backdrop-blur p-4 rounded-2xl shadow-md flex flex-col items-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <p className="text-xs mb-1">
        {date.toLocaleDateString(undefined, {
          weekday: "short",
          month: "short",
          day: "numeric",
        })}
      </p>
      <img src={iconUrl} alt={details.description} className="h-12 w-12" />
      <p className="text-lg font-semibold">{Math.round(temp)}°C</p>
    </motion.div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-indigo-400">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
