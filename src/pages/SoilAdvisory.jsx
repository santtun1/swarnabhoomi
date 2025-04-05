import { useState } from "react";

const API_URL = "http://localhost:5000/api/soil-advisory";

const SoilAdvisory = () => {
    const [location, setLocation] = useState("");
    const [soilType, setSoilType] = useState("");
    const [concern, setConcern] = useState("");
    const [soilPH, setSoilPH] = useState("");
    const [nitrogen, setNitrogen] = useState("");
    const [phosphorus, setPhosphorus] = useState("");
    const [potassium, setPotassium] = useState("");
    const [moisture, setMoisture] = useState("");
    const [advisory, setAdvisory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAdvisory = async () => {
        if (!location || !soilType || !concern || !soilPH || !nitrogen || !phosphorus || !potassium || !moisture) {
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
                body: JSON.stringify({
                    location,
                    soilType,
                    concern,
                    soilPH,
                    nitrogen,
                    phosphorus,
                    potassium,
                    moisture
                })
            });

            if (!response.ok) {
                throw new Error("Server error. Try again later.");
            }

            const data = await response.json();
            setAdvisory(data.advisory);
        } catch (error) {
            setError(`❌ ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Soil Advisory System</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block">Location:</label>
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full p-2 border rounded" />
                </div>
                <div>
                    <label className="block">Soil Type:</label>
                    <select value={soilType} onChange={(e) => setSoilType(e.target.value)} className="w-full p-2 border rounded">
                        <option value="">Select Soil Type</option>
                        <option value="sandy">Sandy</option>
                        <option value="clay">Clay</option>
                        <option value="loamy">Loamy</option>
                    </select>
                </div>
                <div>
                    <label className="block">Concern:</label>
                    <select value={concern} onChange={(e) => setConcern(e.target.value)} className="w-full p-2 border rounded">
                        <option value="">Select Concern</option>
                        <option value="fertility">Fertility</option>
                        <option value="water-retention">Water Retention</option>
                        <option value="ph-balance">pH Balance</option>
                    </select>
                </div>
                <div>
                    <label className="block">Soil pH:</label>
                    <input type="number" value={soilPH} onChange={(e) => setSoilPH(e.target.value)} className="w-full p-2 border rounded" />
                </div>
                <div>
                    <label className="block">Nitrogen:</label>
                    <input type="number" value={nitrogen} onChange={(e) => setNitrogen(e.target.value)} className="w-full p-2 border rounded" />
                </div>
                <div>
                    <label className="block">Phosphorus:</label>
                    <input type="number" value={phosphorus} onChange={(e) => setPhosphorus(e.target.value)} className="w-full p-2 border rounded" />
                </div>
                <div>
                    <label className="block">Potassium:</label>
                    <input type="number" value={potassium} onChange={(e) => setPotassium(e.target.value)} className="w-full p-2 border rounded" />
                </div>
                <div>
                    <label className="block">Moisture:</label>
                    <input type="number" value={moisture} onChange={(e) => setMoisture(e.target.value)} className="w-full p-2 border rounded" />
                </div>
            </div>
            <button onClick={fetchAdvisory} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600" disabled={loading}>
                {loading ? "Fetching Advisory..." : "Get Advisory"}
            </button>

            {error && <p className="text-red-500 mt-4">{error}</p>}
            {advisory && (
                <div className="mt-4 p-4 border rounded bg-gray-100">
                    <h3 className="font-bold">Advisory:</h3>
                    <p>{advisory}</p>
                </div>
            )}
        </div>
    );
};

export default SoilAdvisory;
