import { useEffect, useState } from "react";
import RequestModal from "./RequestModal";



export default function FinancialTransactions() {
  const [activeTab, setActiveTab] = useState("list"); // "list" or "byId"
  const [params, setParams] = useState({
    batch_id: "",
    currency: "",
    from_created_at: "",
    to_created_at: "",
    page_num: "",
    page_size: "",
    source_id: "",
    status: "",
    id: "",
  });

  const [triggerRequest, setTriggerRequest] = useState(false);

  const [response, setResponse] = useState(null); // Updated variable name
  const [responseData, setResponseData] = useState(null);
  const [endpointUrl, setEndpointUrl] = useState("");

  const handleChange = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
    generateEndpoint(); // ✅ Dynamically update endpoint
  };


  const generateEndpoint = () => {
    let apiUrl = "http://localhost:5000/api/finance/financial_transactions"; // Local backend API

    if (activeTab === "list") {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value && key !== "id") queryParams.append(key, value);
      });

      const fullUrl = `${apiUrl}?${queryParams.toString()}`;
      setEndpointUrl(fullUrl); // ✅ Correctly formatted with query parameters
    } else {
      // When fetching a single transaction by ID
      if (!params.id) {
        alert("Please enter a Financial Transaction ID.");
        return;
      }
      const fullUrl = `${apiUrl}/${params.id}`; // ✅ Add transaction ID to URL
      setEndpointUrl(fullUrl);
    }
  };


  // the following submit request is not working on first click 
  // you need to click on the View Endpoint first for the endpoint to be updated
  // const submitRequest = async () => {
  //   try {
  //     const url = endpointUrl || generateEndpoint(); // Ensure endpoint is properly generated
  //     console.log("url is ", url)

  //     const res = await fetch(url, {
  //       method: "GET", // ✅ Change to GET request
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (!res.ok) {
  //       throw data;
  //     }

  //     const data = await res.json();
  //     setResponse(data);
  //   } catch (error) {
  //     setResponse(error);
  //   }
  // };


  const submitRequest = () => {
    generateEndpoint();
    setTriggerRequest(true); // ✅ Trigger request after endpoint updates
  };

  useEffect(() => {
    if (triggerRequest && endpointUrl) {
      (async () => {
        try {
          console.log("Calling API:", endpointUrl);
          const res = await fetch(endpointUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const data = await res.json();

          if (!res.ok) {
            throw data;
          }

          setResponse(data);
        } catch (error) {
          setResponse(error);
        } finally {
          setTriggerRequest(false); // ✅ Reset trigger after request completes
        }
      })();
    }
  }, [endpointUrl, triggerRequest]); // ✅ Runs when endpointUrl updates





  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-semibold mb-4">Financial Transactions</h2>

      {/* Tab Navigation */}
      <div className="flex border-b mb-4">
        <button
          className={`p-2 px-4 ${activeTab === "list" ? "border-b-2 border-blue-500 font-semibold" : "text-gray-600"}`}
          onClick={() => setActiveTab("list")}
        >
          Get list of FT
        </button>
        <button
          className={`p-2 px-4 ${activeTab === "byId" ? "border-b-2 border-blue-500 font-semibold" : "text-gray-600"}`}
          onClick={() => setActiveTab("byId")}
        >
          Get a FT by ID
        </button>
      </div>

      {/* GET LIST OF FT FORM */}
      {activeTab === "list" && (
        <div className="space-y-2">
          <label className="block">Batch ID:
            <input type="text" name="batch_id" value={params.batch_id} onChange={handleChange} className="border p-2 w-full" />
          </label>
          <label className="block">Currency:
            <input type="text" name="currency" value={params.currency} onChange={handleChange} className="border p-2 w-full" />
          </label>
          <label className="block">From Date (ISO8601):
            <input type="datetime-local" name="from_created_at" value={params.from_created_at} onChange={handleChange} className="border p-2 w-full" />
          </label>
          <label className="block">To Date (ISO8601):
            <input type="datetime-local" name="to_created_at" value={params.to_created_at} onChange={handleChange} className="border p-2 w-full" />
          </label>
          <label className="block">Page Number:
            <input type="number" name="page_num" value={params.page_num} onChange={handleChange} className="border p-2 w-full" />
          </label>
          <label className="block">Page Size:
            <input type="number" name="page_size" value={params.page_size} onChange={handleChange} className="border p-2 w-full" />
          </label>
          <label className="block">Source ID:
            <input type="text" name="source_id" value={params.source_id} onChange={handleChange} className="border p-2 w-full" />
          </label>
          <label className="block">Status:
            <input type="text" name="status" value={params.status} onChange={handleChange} className="border p-2 w-full" />
          </label>
        </div>
      )}

      {/* GET FT BY ID FORM */}
      {activeTab === "byId" && (
        <div className="space-y-2">
          <label className="block">Financial Transaction ID:
            <input type="text" name="id" value={params.id} onChange={handleChange} className="border p-2 w-full" />
          </label>
        </div>
      )}

      {/* Buttons and API reference links*/}
      <div className="flex space-x-4 mt-4">
        <button className="p-2 bg-gray-300 rounded" onClick={generateEndpoint}>
          View Endpoint
        </button>
        <button className="p-2 bg-blue-500 text-white rounded" onClick={submitRequest}>
          Submit Request
        </button>
        {/* API Reference Link - Dynamic Based on Tab Selection */}
        {activeTab === "list" ? (
          <a
            href="https://www.airwallex.com/docs/api#/Finance/Financial_Transactions/_api_v1_financial_transactions/get"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            API Ref
          </a>
        ) : (
          <a
            href="https://www.airwallex.com/docs/api#/Finance/Financial_Transactions/_api_v1_financial_transactions__id_/get"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            API Ref
          </a>
        )}
      </div>

      {/* Display Actual Airwallex API Endpoint */}
      {endpointUrl && (
        <div className="mt-4 p-2 bg-gray-100 border">
          <strong>Generated Endpoint (Airwallex API):</strong>
          <p className="break-all text-sm text-blue-600">{endpointUrl}</p>
        </div>
      )}

      {/* Always Display Authorization Response Section */}
      <div className="mt-6 p-4 border rounded-lg bg-gray-100">
        <h3 className="font-semibold mb-2">Authorization Response</h3>

        {/* Added max height and scrollable container */}
        <div className="max-h-96 overflow-auto p-2 bg-white border rounded-lg">
          <pre className="text-gray-700 text-sm">
            {response ? JSON.stringify(response, null, 2) : "{ } 0 Items"}
          </pre>
        </div>
      </div>

    </div>
  );
}
