import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const selectedCrops = ["Wheat", "Rice", "Potato"]; // User-selected crops

const weeklyPriceTrends = {
  Wheat: [2200, 2250, 2180, 2300, 2350, 2400, 2380],
  Rice: [3100, 3150, 3120, 3180, 3200, 3250, 3300],
  Potato: [2500, 2450, 2550, 2600, 2650, 2700, 2680],
};

const mandiRates = [
  { Commodity: "Wheat", Market: "Ludhiana Mandi", Price: 2400 },
  { Commodity: "Rice", Market: "Kolkata Market", Price: 3300 },
  { Commodity: "Potato", Market: "Mansa", Price: 2700 },
];

const getPriceTrendData = (crop) =>
  weeklyPriceTrends[crop].map((price, index) => ({ day: `Day ${index + 1}`, price }));

const MyCrop = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-green-700">🌾 Your Crop Price Dashboard</h2>
      
      {/* Weekly Price Trends */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-3">📊 Weekly Price Trends</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {selectedCrops.map((crop) => (
            <div key={crop} className="border rounded-lg p-4 shadow-lg bg-white flex flex-col items-center">
              <h4 className="text-xl font-semibold text-blue-700 mb-2">{crop}</h4>
              <ResponsiveContainer width="100%" height={150}>
                <LineChart data={getPriceTrendData(crop)}>
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="price" stroke="#2d89ef" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ))}
        </div>
      </div>

      {/* Best Mandi Rates */}
      <div>
        <h3 className="text-2xl font-semibold mb-3">🏬 Best Market Prices</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mandiRates.map((mandi, index) => (
            <div key={index} className="border rounded-lg p-4 shadow-lg bg-white flex flex-col items-center">
              <h4 className="text-xl font-semibold text-green-700 mb-1">{mandi.Commodity}</h4>
              <p className="text-lg font-medium text-gray-700">{mandi.Market}</p>
              <p className="text-lg font-bold text-blue-700">₹{mandi.Price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCrop;
