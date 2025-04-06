import React, { useState } from "react";

const CropAdvisory = () => {
    const [location, setLocation] = useState("");
    const [cropType, setCropType] = useState("");
    const [cropName, setCropName] = useState("");
    const [activity, setActivity] = useState("");
    const [advisory, setAdvisory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const locations = ["Punjab", "Haryana", "Uttar Pradesh", "Madhya Pradesh", "Maharashtra", "Tamil Nadu", "Karnataka", "West Bengal", "Bihar", "Rajasthan"];
    const crops = {
        Vegetable: ["Tomato", "Potato", "Brinjal", "Cabbage"],
        Cereal: ["Wheat", "Rice", "Maize", "Barley"],
        Fruit: ["Mango", "Banana", "Apple", "Orange"],
    };
     
    //data fetching point 
    const API_URL = "https://ab-l3cf.onrender.com/api/advisory"; 

    const fetchAdvisory = async () => {
        if (!location || !cropType || !cropName || !activity) {
            setError("⚠️ Please fill in all fields before requesting advisory.");
            return;
        }

        setLoading(true);
        setError(null);
        setAdvisory(null);

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ location, cropType, cropName, activity })
            });

            if (!response.ok) {
                throw new Error("Server error. Try again later.");
            }

            const data = await response.json();
            processAdvisory(data.advisory, data.date || "Date not available");
        } catch (error) {
            setError(`❌ ${error.message}`);
        } finally {
            setLoading(false);
        }
    };
    
    //Ai Advisory Formatting rules 

    const processAdvisory = (advisoryText, date) => {
        const parts = advisoryText.split("\n");
        let riskText = "", actionText = "", generalText = "";

        parts.forEach(line => {
            if (line.includes("⚠️") || line.includes("Risk")) riskText += `<p>${line}</p>`;
            else if (line.includes("✅") || line.includes("Action")) actionText += `<p>${line}</p>`;
            else generalText += `<p>${line}</p>`;
        });

        setAdvisory({ generalText, riskText, actionText, date });
    };

    return (
        <div className="max-w-[530] mx-auto p-6 rounded-lg shadow-lg text-center border text-lg">
            <h2 className="text-3xl font-bold text-green-700 mb-4">🌾 Crop Advisory System</h2>
            
            <div className="flex flex-wrap gap-3 justify-center mb-4 text-lg">
                <select value={location} onChange={(e) => setLocation(e.target.value)} className="w-1/5 p-2 border rounded focus:ring-2 focus:ring-green-500 text-lg">
                    <option value="">📍 Select Location</option>
                    {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                </select>
                
                <select value={cropType} onChange={(e) => {setCropType(e.target.value); setCropName("")}} className="w-1/5 p-2 border rounded focus:ring-2 focus:ring-green-500 text-lg">
                    <option value="">🌱 Crop Type</option>
                    <option value="Vegetable">Vegetable</option>
                    <option value="Cereal">Cereal</option>
                    <option value="Fruit">Fruit</option>
                </select>
                
                <select value={cropName} onChange={(e) => setCropName(e.target.value)} className="w-1/5 p-2 border rounded focus:ring-2 focus:ring-green-500 text-lg" disabled={!cropType}>
                    <option value="">🌾 Crop Name</option>
                    {cropType && crops[cropType].map(crop => <option key={crop} value={crop}>{crop}</option>)}
                </select>
                
                <select value={activity} onChange={(e) => setActivity(e.target.value)} className="w-1/5 p-2 border rounded focus:ring-2 focus:ring-green-500 text-lg">
                    <option value="">🚜 Activity</option>
                    <option value="Sowing">Sowing</option>
                    <option value="Harvesting">Harvesting</option>
                    <option value="Growth">Growth</option>
                </select>
            </div>
            
            <button onClick={fetchAdvisory} className="w-[300px] p-3 bg-green-600 text-white rounded hover:bg-green-700 transition text-lg">🔍 Get Advisory</button>
            {loading && <p className="mt-4 animate-pulse text-green-600 text-lg">⏳ Fetching advisory...</p>}
            {error && <p className="text-red-600 mt-4 text-lg">{error}</p>}
            
            {advisory && (
                <div className="mt-6 text-left flex flex-col gap-4 text-lg">
                    <div className="p-3 rounded bg-yellow-100 border-l-4 border-yellow-500">
                        <h3 className="font-bold text-3xl">📢 General Advisory</h3>
                        <div dangerouslySetInnerHTML={{ __html: advisory.generalText }}></div>
                    </div>
                    <div className="p-3 rounded bg-green-100 border-l-4 border-green-500 text-green-700">
                        <h3 className="font-bold text-3xl">🚜 Farmer Actions</h3>
                        <div dangerouslySetInnerHTML={{ __html: advisory.actionText || "<p>Follow best practices.</p>" }}></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CropAdvisory;