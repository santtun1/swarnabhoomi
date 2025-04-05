import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { CloudSun, Wind, Thermometer, Droplet, AlertCircle } from "lucide-react";

const Weather = () => {
  const [location, setLocation] = useState("Loading...");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocationAndWeather = async () => {
      const user = auth.currentUser;
      if (!user) {
        setLocation("Unknown Location");
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setLocation(`${userData.district}, ${userData.state}`);
        } else {
          setLocation("Unknown Location");
        }

        const mockWeatherData = {
          current: {
            temperature: "30°C",
            condition: "Sunny",
            humidity: "50%",
            windSpeed: "10 km/h",
          },
          forecast: [
            { day: "Monday", condition: "Rainy", temperature: "25°C", humidity: "70%", windSpeed: "15 km/h" },
            { day: "Tuesday", condition: "Sunny", temperature: "32°C", humidity: "45%", windSpeed: "10 km/h" },
            { day: "Wednesday", condition: "Cloudy", temperature: "28°C", humidity: "60%", windSpeed: "12 km/h" },
            { day: "Thursday", condition: "Stormy", temperature: "22°C", humidity: "85%", windSpeed: "20 km/h" },
            { day: "Friday", condition: "Sunny", temperature: "31°C", humidity: "40%", windSpeed: "9 km/h" },
          ],
          advice: "Due to upcoming rain on Monday, avoid pesticide spraying. Plan irrigation accordingly.",
          alert: "Severe storm expected on Thursday. Take necessary precautions."
        };

        setWeatherData(mockWeatherData);
      } catch (error) {
        console.error("Error fetching location:", error);
        setLocation("Error fetching location");
      }
      setLoading(false);
    };

    fetchLocationAndWeather();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-xl font-semibold text-gray-600">Fetching data...</div>;
  }

  return (
    <div className="p-4 flex flex-col items-center bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-4">{location}</h1>

      {/* Weather Box */}
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-2 shadow-lg rounded-lg flex flex-col items-center">
          <h2 className="text-3xl font-bold text-green-500 text-center">Current Weather</h2>
          <div className="flex items-center space-x-6 mt-4">
            <CloudSun className="h-16 w-16 text-yellow-500" />
            <div className="text-lg">
              <p className="text-gray-800 font-semibold text-2xl">{weatherData?.current.condition}</p>
              <p className="text-gray-600 flex items-center mt-2">
                <Thermometer className="h-5 w-5 mr-2 text-red-500" /> <span className="font-semibold">{weatherData?.current.temperature}</span>
              </p>
              <p className="text-gray-600 flex items-center mt-2">
                <Droplet className="h-5 w-5 mr-2 text-blue-500" /> <span className="font-semibold">{weatherData?.current.humidity}</span>
              </p>
              <p className="text-gray-600 flex items-center mt-2">
                <Wind className="h-5 w-5 mr-2 text-gray-700" /> <span className="font-semibold">{weatherData?.current.windSpeed}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Advice Box */}
        <div className="bg-white p-2 shadow-lg rounded-lg flex flex-col justify-center text-center">
          <h2 className="text-3xl font-bold text-green-500">Weather Alert</h2>
          <p className="mt-4 text-gray-700 text-lg font-semibold">{weatherData?.advice}</p>
          {weatherData?.alert && (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg flex items-center">
              <AlertCircle className="h-6 w-6 mr-2" /> <p className="font-semibold">{weatherData.alert}</p>
            </div>
          )}
        </div>
      </div>

      {/* Weather Forecast Box */}
      <div className="max-w-6xl w-full bg-white p-2 shadow-lg rounded-lg mt-6">
        <h2 className="text-3xl font-bold text-center text-green-500">Weather Forecast</h2>
        <table className="w-full mt-4 border-collapse">
          <thead>
            <tr className="bg-gray-200 text-lg">
              <th className="p-3 text-left">Day</th>
              <th className="p-3 text-left">Condition</th>
              <th className="p-3 text-left">Temperature</th>
              <th className="p-3 text-left">Humidity</th>
              <th className="p-3 text-left">Wind Speed</th>
            </tr>
          </thead>
          <tbody>
            {weatherData?.forecast.map((day, index) => (
              <tr key={index} className="border-b hover:bg-gray-100 text-lg">
                <td className="p-3 font-semibold text-gray-800">{day.day}</td>
                <td className="p-3 font-semibold">{day.condition}</td>
                <td className="p-3 text-blue-500 font-semibold">{day.temperature}</td>
                <td className="p-3 text-green-500 font-semibold">{day.humidity}</td>
                <td className="p-3 text-gray-700 font-semibold">{day.windSpeed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Weather;
