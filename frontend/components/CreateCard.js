import { useState } from "react";
import RequestModal from "./RequestModal";
import IssuingApiTemplates from "../apiTemplates/IssuingApiTemplates.js";

export default function CreateCard() {
  const [jsonRequest, setJsonRequest] = useState(IssuingApiTemplates.create_card);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [response, setResponse] = useState(null); // Stores API response

  // Handle form updates dynamically
  const updateField = (field, value) => {
    setJsonRequest((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle nested object updates
  const updateNestedField = (parent, field, value) => {
    setJsonRequest((prev) => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value }
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/issuing/cards/create", {
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
      <h2 className="text-2xl font-semibold mb-4">Create Card</h2>

      {/* Cardholder ID */}
      <label className="block font-medium">Cardholder ID</label>
      <input
        type="text"
        className="w-full p-2 border rounded-lg mb-4"
        value={jsonRequest.cardholder_id}
        onChange={(e) => updateField("cardholder_id", e.target.value)}
      />

      {/* Created By */}
      <label className="block font-medium">Created By</label>
      <input
        type="text"
        className="w-full p-2 border rounded-lg mb-4"
        value={jsonRequest.created_by}
        onChange={(e) => updateField("created_by", e.target.value)}
      />

      {/* Form Factor Dropdown */}
      <label className="block font-medium">Form of Card</label>
      <select
        className="w-full p-2 border rounded-lg mb-4"
        value={jsonRequest.form_factor}
        onChange={(e) => updateField("form_factor", e.target.value)}
      >
        <option value="PHYSICAL">PHYSICAL</option>
        <option value="VIRTUAL">VIRTUAL</option>
      </select>

      {/* Is Personalized Checkbox */}
      <label className="block font-medium flex items-center">
        <input
          type="checkbox"
          className="mr-2"
          checked={jsonRequest.is_personalized}
          onChange={(e) => updateField("is_personalized", e.target.checked)}
        />
        Is Personalized
      </label>

      {/* Purpose Dropdown */}
      <label className="block font-medium mt-4">Purpose</label>
      <select
        className="w-full p-2 border rounded-lg mb-4"
        value={jsonRequest.program.purpose}
        onChange={(e) => updateNestedField("program", "purpose", e.target.value)}
      >
        <option value="COMMERCIAL">COMMERCIAL</option>
        <option value="CONSUMER">CONSUMER</option>
      </select>

      {/* Request ID */}
      <label className="block font-medium">Request ID</label>
      <input
        type="text"
        className="w-full p-2 border rounded-lg mb-4"
        value={jsonRequest.request_id}
        onChange={(e) => updateField("request_id", e.target.value)}
      />

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
