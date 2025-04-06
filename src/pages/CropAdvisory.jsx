import React, { useState } from "react";

const CropAdvisory = () => {
    const [selectedState, setSelectedState] = useState("");
    const [location, setLocation] = useState("");
    const [cropType, setCropType] = useState("");
    const [cropName, setCropName] = useState("");
    const [activity, setActivity] = useState("");
    const [advisory, setAdvisory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const stateDistrictMap = {
        "Punjab": ["Amritsar", "Ludhiana", "Jalandhar", "Patiala", "Bathinda"],
        "Haryana": ["Ambala", "Hisar", "Rohtak", "Panipat", "Gurgaon"],
        "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Meerut"],
        "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain"],
        "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
        "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli"],
        "Karnataka": ["Bengaluru", "Mysuru", "Mangalore", "Hubli", "Belgaum"],
        "West Bengal": ["Kolkata", "Howrah", "Darjeeling", "Siliguri", "Asansol"],
        "Bihar": ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga"],
        "Rajasthan": ["Jaipur", "Udaipur", "Jodhpur", "Kota", "Ajmer"],
        "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
        "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Puri", "Balasore"],
        "Jharkhand": ["Ranchi", "Dhanbad", "Jamshedpur", "Hazaribagh", "Bokaro"],
        "Chhattisgarh": ["Raipur", "Bilaspur", "Durg", "Korba", "Jagdalpur"],
        "Andhra Pradesh": ["Vijayawada", "Visakhapatnam", "Guntur", "Tirupati", "Kurnool"],
        "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"],
        "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kannur"],
        "Assam": ["Guwahati", "Dibrugarh", "Silchar", "Jorhat", "Tezpur"],
        "Himachal Pradesh": ["Shimla", "Mandi", "Kangra", "Solan", "Bilaspur"],
        "Uttarakhand": ["Dehradun", "Haridwar", "Nainital", "Roorkee", "Almora"],
        "Goa": ["Panaji", "Margao", "Vasco", "Mapusa"],
        "Delhi": ["New Delhi", "Dwarka", "Rohini", "Saket", "Karol Bagh"]
    };

    const states = Object.keys(stateDistrictMap);

    const crops = {
        Vegetable: ["Tomato", "Potato", "Brinjal", "Cabbage"],
        Cereal: ["Wheat", "Rice", "Maize", "Barley"],
        Fruit: ["Mango", "Banana", "Apple", "Orange"],
    };

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
                body: JSON.stringify({ location, cropType, cropName, activity }),
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

    const processAdvisory = (advisoryText, date) => {
        const parts = advisoryText.split("\n").filter(line => line.trim() !== "");
        let riskItems = [], actionItems = [], generalItems = [];

        parts.forEach(line => {
            if (line.includes("⚠️") || /risk/i.test(line)) riskItems.push(line);
            else if (line.includes("✅") || /action/i.test(line)) actionItems.push(line);
            else generalItems.push(line);
        });

        const createList = (items) =>
            `<ul class="list-disc ml-5 space-y-1">${items.map(item => `<li>${item}</li>`).join("")}</ul>`;

        setAdvisory({
            generalText: createList(generalItems),
            riskText: createList(riskItems),
            actionText: createList(actionItems),
            date,
        });
    };

    return (
        <div className="max-w-[530px] mx-auto p-6 rounded-lg shadow-lg text-center border text-lg">
            <h2 className="text-3xl font-bold text-green-700 mb-4">🌾 Crop Advisory System</h2>

            <div className="flex flex-wrap gap-3 justify-center mb-4 text-lg">
                <select
                    value={selectedState}
                    onChange={(e) => {
                        setSelectedState(e.target.value);
                        setLocation("");
                    }}
                    className="w-[45%] p-2 border rounded focus:ring-2 focus:ring-green-500 text-lg"
                >
                    <option value="">🏞️ Select State</option>
                    {states.map((state) => (
                        <option key={state} value={state}>{state}</option>
                    ))}
                </select>

                <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    disabled={!selectedState}
                    className="w-[45%] p-2 border rounded focus:ring-2 focus:ring-green-500 text-lg"
                >
                    <option value="">📍 Select Location</option>
                    {selectedState &&
                        stateDistrictMap[selectedState].map((district) => (
                            <option key={district} value={district}>{district}</option>
                        ))}
                </select>

                <select
                    value={cropType}
                    onChange={(e) => {
                        setCropType(e.target.value);
                        setCropName("");
                    }}
                    className="w-[45%] p-2 border rounded focus:ring-2 focus:ring-green-500 text-lg"
                >
                    <option value="">🌱 Crop Type</option>
                    <option value="Vegetable">Vegetable</option>
                    <option value="Cereal">Cereal</option>
                    <option value="Fruit">Fruit</option>
                </select>

                <select
                    value={cropName}
                    onChange={(e) => setCropName(e.target.value)}
                    className="w-[45%] p-2 border rounded focus:ring-2 focus:ring-green-500 text-lg"
                    disabled={!cropType}
                >
                    <option value="">🌾 Crop Name</option>
                    {cropType &&
                        crops[cropType].map((crop) => (
                            <option key={crop} value={crop}>{crop}</option>
                        ))}
                </select>

                <select
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                    className="w-[45%] p-2 border rounded focus:ring-2 focus:ring-green-500 text-lg"
                >
                    <option value="">🚜 Activity</option>
                    <option value="Sowing">Sowing</option>
                    <option value="Harvesting">Harvesting</option>
                    <option value="Growth">Growth</option>
                </select>
            </div>

            <button
                onClick={fetchAdvisory}
                className="w-[300px] p-3 bg-green-600 text-white rounded hover:bg-green-700 transition text-lg"
            >
                🔍 Get Advisory
            </button>

            {loading && (
                <p className="mt-4 animate-pulse text-green-600 text-lg">⏳ Fetching advisory...</p>
            )}
            {error && <p className="text-red-600 mt-4 text-lg">{error}</p>}

            {advisory && (
                <div className="mt-6 text-left flex flex-col gap-4 text-lg">
                    <div className="p-3 rounded bg-yellow-100 border-l-4 border-yellow-500">
                        <h3 className="font-bold text-3xl">📢 General Advisory</h3>
                        <div dangerouslySetInnerHTML={{ __html: advisory.generalText }}></div>
                    </div>
                    <div className="p-3 rounded bg-green-100 border-l-4 border-green-500 text-green-700">
                        <h3 className="font-bold text-3xl">🚜 Farmer Actions</h3>
                        <div dangerouslySetInnerHTML={{ __html: advisory.actionText || "<ul><li>Follow best practices.</li></ul>" }}></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CropAdvisory;
