import Cardholders from "./Cardholders";
import Cards from "./CreateCard"; 
import FinancialTransactions from "./FinancialTransactions";
import Deposits from "./Deposits";



const componentMapping = {
  "Cardholders": Cardholders,
  "Cards": Cards,
  "Financial Transactions": FinancialTransactions,
  "Deposits": Deposits
  // Add more mappings as new components are created
};

export default function MainPanel({ selectedOption }) {
  const SelectedComponent = componentMapping[selectedOption];

  return (
    <div className="flex-1 p-6 flex justify-center items-center">
      {SelectedComponent ? <SelectedComponent /> : <p>Select an API to test.</p>}
    </div>
  );
}
