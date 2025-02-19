import { useEffect, useState } from "react";
import RequestModal from "./RequestModal";
import DepositsApiTemplates from "../apiTemplates/DepositsApiTemplates";

export default function Balances() {
    const [activeTab, setActiveTab] = useState("current"); // current or history
    const [params, setParams] = useState({
        currency: "",
        from_post_at: "",
        to_post_at: "",
        page: "",
        page_num: "",
        page_size: "",
        request_id: ""
    });

    // const [jsonRequest, setJsonRequest] = useState(DepositsApiTemplates.create_cardholder); // Load default JSON

    // const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal visibility

    const [triggerRequest, setTriggerRequest] = useState(false);

    const [response, setResponse] = useState(null); // Updated variable name
    const [endpointUrl, setEndpointUrl] = useState("");

    const handleChange = (e) => {
        setParams({ ...params, [e.target.name]: e.target.value });
        generateEndpoint(); // ✅ Dynamically update endpoint
    };

    // const updateField = (field, value) => {
    //     setJsonRequest((prev) => ({
    //         ...prev,
    //         [field]: value,
    //     }));
    // };


    // const generateEndpoint = () => {
    //     let apiUrl = "http://localhost:5000/api/deposits/deposits"; // Local backend API

    //     if (activeTab === "list") {
    //         const queryParams = new URLSearchParams();
    //         Object.entries(params).forEach(([key, value]) => {
    //             if (value && key !== "id") queryParams.append(key, value);
    //         });

    //         const fullUrl = `${apiUrl}?${queryParams.toString()}`;
    //         setEndpointUrl(fullUrl); // ✅ Correctly formatted with query parameters
    //     } else {
    //         // When fetching a single deposit by ID
    //         if (!params.id) {
    //             alert("Please enter a Deposit ID.");
    //             return;
    //         }
    //         const fullUrl = `${apiUrl}/${params.id}`; // ✅ Add transaction ID to URL
    //         setEndpointUrl(fullUrl);
    //     }
    // };


    const generateEndpoint = () => {
        let apiUrl = "http://localhost:5000/api/balances"; // ✅ Fixed path
    
        if (activeTab === "current") {
            setEndpointUrl(`${apiUrl}/current`);
        } else if (activeTab === "history") {
            const queryParams = new URLSearchParams();
            Object.entries(params).forEach(([key, value]) => {
                if (value) queryParams.append(key, value);
            });
    
            setEndpointUrl(`${apiUrl}/history?${queryParams.toString()}`);
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


    // const submitRequest = () => {
    //     generateEndpoint();
    //     setTriggerRequest(true); // ✅ Trigger request after endpoint updates
    // };

    // useEffect(() => {
    //     if (triggerRequest && endpointUrl) {
    //         (async () => {
    //             try {
    //                 console.log("Calling API:", endpointUrl);
    //                 const res = await fetch(endpointUrl, {
    //                     method: activeTab === "create" ? "POST" : "GET", // ✅ Use POST for creating a deposit
    //                     headers: {
    //                         "Content-Type": "application/json",
    //                     },
    //                     body: activeTab === "create" ? JSON.stringify(jsonRequest) : null, // ✅ Only send body for POST
    //                 });

    //                 const data = await res.json();

    //                 if (!res.ok) {
    //                     throw data;
    //                 }

    //                 setResponse(data);
    //             } catch (error) {
    //                 setResponse(error);
    //             } finally {
    //                 setTriggerRequest(false);
    //             }
    //         })();
    //     }
    // }, [endpointUrl, triggerRequest]);


    const submitRequest = () => {
        generateEndpoint(); // ✅ Ensure the endpoint is updated
        setTriggerRequest(true); // ✅ Trigger the request after the endpoint is set
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
                    setTriggerRequest(false);
                }
            })();
        }
    }, [endpointUrl, triggerRequest]);



    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full">
            <h2 className="text-xl font-semibold mb-4">Balances</h2>

            {/* Tab Navigation */}
            <div className="flex border-b mb-4">
                <button
                    className={`p-2 px-4 ${activeTab === "current" ? "border-b-2 border-blue-500 font-semibold" : "text-gray-600"}`}
                    onClick={() => setActiveTab("current")}
                >
                    Get Current Balances
                </button>
                <button
                    className={`p-2 px-4 ${activeTab === "history" ? "border-b-2 border-blue-500 font-semibold" : "text-gray-600"}`}
                    onClick={() => setActiveTab("history")}
                >
                    Get Balance History
                </button>
            </div>

            {/* Get Balance History FORM */}
            {activeTab === "history" && (
                <div className="space-y-2">
                    <label className="block">Currency:
                        <input type="text" name="currency" value={params.currency} onChange={handleChange} className="border p-2 w-full" />
                    </label>
                    <label className="block">From Date (ISO8601):
                        <input type="datetime-local" name="from_post_at" value={params.from_post_at} onChange={handleChange} className="border p-2 w-full" />
                    </label>
                    <label className="block">To Date (ISO8601):
                        <input type="datetime-local" name="to_post_at" value={params.to_post_at} onChange={handleChange} className="border p-2 w-full" />
                    </label>
                    <label className="block">Page:
                        <input type="text" name="page" value={params.page} onChange={handleChange} className="border p-2 w-full" />
                    </label>
                    <label className="block">Page Number:
                        <input type="number" name="page_num" value={params.page_num} onChange={handleChange} className="border p-2 w-full" />
                    </label>
                    <label className="block">Page Size:
                        <input type="number" name="page_size" value={params.page_size} onChange={handleChange} className="border p-2 w-full" />
                    </label>
                    <label className="block">Request ID:
                        <input type="text" name="request_id" value={params.request_id} onChange={handleChange} className="border p-2 w-full" />
                    </label>
                </div>
            )}

            {/* Buttons and API Reference Links */}
            <div className="flex space-x-4 mt-4">
                <button className="p-2 bg-gray-300 rounded" onClick={generateEndpoint}>
                    View Endpoint
                </button>
                <button className="p-2 bg-blue-500 text-white rounded" onClick={submitRequest}>
                    Submit Request
                </button>
                {/* API Reference Links */}
                {activeTab === "current" ? (
                    <a
                        href="https://www.airwallex.com/docs/api#/Core_Resources/Balances/_api_v1_balances_current/get"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                    >
                        API Ref
                    </a>
                ) : activeTab === "history" ? (
                    <a
                        href="https://www.airwallex.com/docs/api#/Core_Resources/Balances/_api_v1_balances_history/get"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                    >
                        API Ref
                    </a>
                ) : null}
            </div>

            {/* Display Generated Endpoint */}
            {endpointUrl && (
                <div className="mt-4 p-2 bg-gray-100 border">
                    <strong>Generated Endpoint (Airwallex API):</strong>
                    <p className="break-all text-sm text-blue-600">{endpointUrl}</p>
                </div>
            )}

            {/* Authorization Response Section */}
            <div className="mt-6 p-4 border rounded-lg bg-gray-100">
                <h3 className="font-semibold mb-2">Authorization Response</h3>
                <div className="max-h-96 overflow-auto p-2 bg-white border rounded-lg">
                    <pre className="text-gray-700 text-sm">
                        {response ? JSON.stringify(response, null, 2) : "{ } 0 Items"}
                    </pre>
                </div>
            </div>
        </div>
    );
}
