import { useState } from "react";
import Sidebar from "../components/SideBar";
import MainPanel from "../components/MainPanel";

export default function MainPage() {
  const [selectedCategory, setSelectedCategory] = useState("Issuing");
  const [selectedOption, setSelectedOption] = useState("Cardholders");

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      <MainPanel selectedOption={selectedOption} />
    </div>
  );
}
