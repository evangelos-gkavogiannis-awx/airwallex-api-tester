import { useState } from "react";
import RequestModal from "./RequestModal";
import IssuingApiTemplates from "../apiTemplates/IssuingApiTemplates.js";

export default function Cardholders() {
  const [jsonRequest, setJsonRequest] = useState(IssuingApiTemplates.create_cardholder);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [response, setResponse] = useState(null); // Stores API response

  // Handle form updates dynamically
  const updateField = (field, value) => {
    setJsonRequest((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/issuing/cardholders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonRequest),
      });
  
      const data = await res.json();
      setResponse(data); // Store response in state
    } catch (error) {
      setResponse({ error: "Request failed" });
    }
  };
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg w-full">
      <h2 className="text-2xl font-semibold mb-4">Create Cardholder</h2>

      {/* Email Field */}
      <label className="block font-medium">Email</label>
      <input
        type="email"
        className="w-full p-2 border rounded-lg mb-4"
        value={jsonRequest.email}
        onChange={(e) => updateField("email", e.target.value)}
      />

      {/* Date of Birth */}
      <label className="block font-medium">Date of Birth</label>
      <input
        type="date"
        className="w-full p-2 border rounded-lg mb-4"
        value={jsonRequest.individual.date_of_birth}
        onChange={(e) => {
          setJsonRequest((prev) => ({
            ...prev,
            individual: { ...prev.individual, date_of_birth: e.target.value }
          }));
        }}
      />

      {/* Express Consent Checkbox */}
      <label className="block font-medium flex items-center">
        <input
          type="checkbox"
          className="mr-2"
          checked={jsonRequest.individual.express_consent_obtained === "yes"}
          onChange={(e) =>
            setJsonRequest((prev) => ({
              ...prev,
              individual: { ...prev.individual, express_consent_obtained: e.target.checked ? "yes" : "no" }
            }))
          }
        />
        Express Consent Obtained
      </label>

      {/* Type Dropdown */}
      <label className="block font-medium mt-4">Type</label>
      <select
        className="w-full p-2 border rounded-lg mb-4"
        value={jsonRequest.type}
        onChange={(e) => updateField("type", e.target.value)}
      >
        <option value="INDIVIDUAL">INDIVIDUAL</option>
        <option value="DELEGATE">DELEGATE</option>
      </select>

      {/* Buttons */}
      <div className="flex space-x-4 mt-4">
        <button className="p-2 bg-blue-500 text-white rounded" onClick={() => setIsModalOpen(true)}>
          View & Modify Request
        </button>
        <button className="p-2 bg-green-500 text-white rounded" onClick={handleSubmit}>
          Submit Request
        </button>
      </div>

      {/* Request JSON Modal */}
      {isModalOpen && (
        <RequestModal
          jsonRequest={jsonRequest}
          setJsonRequest={setJsonRequest}
          closeModal={() => setIsModalOpen(false)}
        />
      )}

      {/* Always Display Authorization Response Section */}
      <div className="mt-6 p-4 border rounded-lg bg-gray-100">
        <h3 className="font-semibold mb-2">Authorization Response</h3>
        <pre className="text-gray-700 text-sm">
          {response ? JSON.stringify(response, null, 2) : "{ } 0 Items"}
        </pre>
      </div>
    </div>
  );
}
