import { useState } from "react";

export default function RequestModal({ jsonRequest, setJsonRequest, closeModal }) {
  const [editableJson, setEditableJson] = useState(JSON.stringify(jsonRequest, null, 2));

  const handleSave = () => {
    try {
      setJsonRequest(JSON.parse(editableJson));
      closeModal();
    } catch (error) {
      alert("Invalid JSON format.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-xl font-semibold mb-4">Modify Request</h2>

        {/* JSON Editor */}
        <textarea
          className="w-full p-2 border rounded-lg bg-gray-100"
          rows="10"
          value={editableJson}
          onChange={(e) => setEditableJson(e.target.value)}
        />

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <a
            href="https://www.airwallex.com/docs/api#/Issuing/Cardholders/"
            target="_blank"
            className="text-blue-600 underline"
          >
            API Ref
          </a>
          <button className="p-2 bg-gray-300 rounded" onClick={closeModal}>
            Cancel
          </button>
          <button className="p-2 bg-blue-500 text-white rounded" onClick={handleSave}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
