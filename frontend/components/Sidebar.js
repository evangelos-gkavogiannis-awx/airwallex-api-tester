const apiOptions = {
    "Billing": ["Invoices", "Prices", "Products", "Subscriptions"],
    "Core Resources": ["Balances", "Deposits", "Direct Debits", "Global Accounts", "Linked Accounts"],
    "Finance": ["Financial Reports", "Financial Transactions", "Settlements"],
    "Issuing": ["Authorisations", "Cardholders", "Cards", "Config", "Digital Wallet Tokens", "Transaction Disputes", "Transactions"],
    "Payment Acceptance": ["Config", "Customers", "Funds Split Destinations", "Funds Split Reversals", "Funds Splits", "Payments Attempts", "Payment Consents", "Payment Disputes", "Payment Intents", "Payment Links", "Payment Methods", "Reference Data", "Refunds"],
    "Payout": ["Batch Transfers", "Beneficiaries", "Transfers", "Wallet Transfers"],
    "Scale": ["Accounts", "Charges", "Connected Account Transfers", "Hosted Flows", "Invitation Links", "Platform Reports", "PSP Settlement Deposits", "PSP Settlements Intents", "PSP Settlement Splits"],
    "Simulation": ["Accounts", "Cards", "Deposits", "Payment Acceptance", "Request For Information (RFI)", "Transfers"],
    "Transactional FX": ["Conversion", "Conversion Amendments", "Quotes", "Rates"],
};

export default function Sidebar({ selectedCategory, setSelectedCategory, selectedOption, setSelectedOption }) {
    return (
        <div className="w-1/4 bg-blue-100 p-6 shadow-lg rounded-lg flex flex-col space-y-4">
            <h1 className="text-2xl font-bold mb-4 text-blue-900">Airwallex API Tester</h1>

            {Object.keys(apiOptions).map((category) => (
                <div key={category}>
                    {/* Main API Category */}
                    <button
                        className={`p-4 text-lg font-medium rounded-lg w-full text-left ${selectedCategory === category ? "bg-blue-500 text-white" : "bg-blue-200 hover:bg-blue-300"
                            }`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {selectedCategory === category ? `▼ ${category}` : `▶ ${category}`}
                    </button>

                    {/* Sub-options (API Endpoints) */}
                    {selectedCategory === category &&
                        apiOptions[category].map((option) => (
                            <button
                                key={option}
                                className={`ml-4 p-3 text-md font-medium rounded-lg w-full text-left ${selectedOption === option ? "bg-blue-400 text-white" : "bg-blue-200 hover:bg-blue-300"
                                    }`}
                                onClick={() => setSelectedOption(option)}
                            >
                                {option}
                            </button>
                        ))}
                </div>
            ))}
        </div>
    );
}
