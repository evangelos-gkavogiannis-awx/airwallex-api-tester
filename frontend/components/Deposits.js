import { useEffect, useState } from "react";
import RequestModal from "./RequestModal";
import DepositsApiTemplates from "../apiTemplates/DepositsApiTemplates";

export default function Deposits() {
    const [activeTab, setActiveTab] = useState("list"); // list or byId or create
    const [params, setParams] = useState({
        from_created_at: "",
        to_created_at: "",
        page_num: "",
        page_size: ""
    });

    const [jsonRequest, setJsonRequest] = useState(DepositsApiTemplates.create_cardholder); // Load default JSON

    const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal visibility

    const [triggerRequest, setTriggerRequest] = useState(false);

    const [response, setResponse] = useState(null); // Updated variable name
    const [endpointUrl, setEndpointUrl] = useState("");

    const handleChange = (e) => {
        setParams({ ...params, [e.target.name]: e.target.value });
        generateEndpoint(); // ✅ Dynamically update endpoint
    };

    const updateField = (field, value) => {
        setJsonRequest((prev) => ({
            ...prev,
            [field]: value,
        }));
    };


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
        let apiUrl = "http://localhost:5000/api/deposits/deposits"; // Local backend API

        if (activeTab === "list") {
            const queryParams = new URLSearchParams();
            Object.entries(params).forEach(([key, value]) => {
                if (value) queryParams.append(key, value);
            });

            setEndpointUrl(`${apiUrl}?${queryParams.toString()}`);
        } else if (activeTab === "byId") {
            if (!params.id) {
                alert("Please enter a Deposit ID.");
                return;
            }
            setEndpointUrl(`${apiUrl}/${params.id}`);
        } else if (activeTab === "create") {
            // When in "Create Deposit" mode, use the correct Airwallex API URL
            setEndpointUrl("https://api-demo.airwallex.com/api/v1/deposits/create");
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
                        method: activeTab === "create" ? "POST" : "GET", // Use POST for creating a deposit, GET for other tabs
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: activeTab === "create" ? JSON.stringify(jsonRequest) : null, // Only send body for POST
                    });

                    const data = await res.json();

                    if (!res.ok) {
                        throw data; // Ensure actual API errors are captured
                    }

                    setResponse(data); // Store the response
                } catch (error) {
                    setResponse(error); // Store error response
                } finally {
                    setTriggerRequest(false); // Reset trigger after request completes
                }
            })();
        }
    }, [endpointUrl, triggerRequest]); // Triggers when `endpointUrl` or `triggerRequest` updates




    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full">
            <h2 className="text-xl font-semibold mb-4">Deposits</h2>

            {/* Tab Navigation */}
            <div className="flex border-b mb-4">
                <button
                    className={`p-2 px-4 ${activeTab === "list" ? "border-b-2 border-blue-500 font-semibold" : "text-gray-600"}`}
                    onClick={() => setActiveTab("list")}
                >
                    Get list of Deposits
                </button>
                <button
                    className={`p-2 px-4 ${activeTab === "byId" ? "border-b-2 border-blue-500 font-semibold" : "text-gray-600"}`}
                    onClick={() => setActiveTab("byId")}
                >
                    Get a Deposit by ID
                </button>
                <button
                    className={`p-2 px-4 ${activeTab === "create" ? "border-b-2 border-blue-500 font-semibold" : "text-gray-600"}`}
                    onClick={() => setActiveTab("create")}
                >
                    Create Deposit via Direct Debit
                </button>
            </div>

            {/* GET LIST OF Deposits FORM */}
            {activeTab === "list" && (
                <div className="space-y-2">
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
                </div>
            )}

            {/* GET DEPOSIT BY ID FORM */}
            {activeTab === "byId" && (
                <div className="space-y-2">
                    <label className="block">Deposit ID:
                        <input type="text" name="id" value={params.id} onChange={handleChange} className="border p-2 w-full" />
                    </label>
                </div>
            )}

            {/* CREATE DEPOSIT FORM */}
            {activeTab === "create" && (
                <div className="space-y-2">
                    <label className="block">Amount:
                        <input type="number" value={jsonRequest.amount} onChange={(e) => updateField("amount", e.target.value)} className="border p-2 w-full" />
                    </label>
                    <label className="block">Currency:
                        <input type="text" value={jsonRequest.currency} onChange={(e) => updateField("currency", e.target.value)} className="border p-2 w-full" />
                    </label>
                    <label className="block">Deposit Type:
                        <input type="text" value={jsonRequest.deposit_type} onChange={(e) => updateField("deposit_type", e.target.value)} className="border p-2 w-full" />
                    </label>
                    <label className="block">Funding Source ID:
                        <input type="text" value={jsonRequest.funding_source_id} onChange={(e) => updateField("funding_source_id", e.target.value)} className="border p-2 w-full" />
                    </label>
                    <label className="block">Reference:
                        <input type="text" value={jsonRequest.reference} onChange={(e) => updateField("reference", e.target.value)} className="border p-2 w-full" />
                    </label>
                    <label className="block">Request ID:
                        <input type="text" value={jsonRequest.request_id} onChange={(e) => updateField("request_id", e.target.value)} className="border p-2 w-full" />
                    </label>
                </div>
            )}

            {/* Buttons and API Reference Links */}
            <div className="flex space-x-4 mt-4">
                {/* View & Modify Button for Create Deposit */}
                {activeTab === "create" ? (
                    <>
                        <button className="p-2 bg-blue-500 text-white rounded" onClick={() => setIsModalOpen(true)}>
                            View & Modify Request
                        </button>
                        <button className="p-2 bg-green-500 text-white rounded" onClick={submitRequest}>
                            Submit Request
                        </button>
                        <a
                            href="https://www.airwallex.com/docs/api#/Core_Resources/Deposits/_api_v1_deposits_create/post"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                        >
                            API Ref
                        </a>
                    </>
                ) : (
                    <>
                        <button className="p-2 bg-gray-300 rounded" onClick={generateEndpoint}>
                            View Endpoint
                        </button>
                        <button className="p-2 bg-blue-500 text-white rounded" onClick={submitRequest}>
                            Submit Request
                        </button>
                        {/* API Reference Link - Dynamic Based on Tab Selection */}
                        {activeTab === "list" ? (
                            <a
                                href="https://www.airwallex.com/docs/api#/Core_Resources/Deposits/_api_v1_deposits/get"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                            >
                                API Ref
                            </a>
                        ) : activeTab === "byId" ? (
                            <a
                                href="https://www.airwallex.com/docs/api#/Core_Resources/Deposits/_api_v1_deposits__id_/get"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                            >
                                API Ref
                            </a>
                        ) : null}
                    </>
                )}
            </div>


            {/* Request JSON Modal */}
            {isModalOpen && (
                <RequestModal
                    jsonRequest={jsonRequest}
                    setJsonRequest={setJsonRequest}
                    closeModal={() => setIsModalOpen(false)}
                />
            )}

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
