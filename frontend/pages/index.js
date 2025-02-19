import { useEffect, useState } from "react";
import MainPage from "./MainPage.js";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res) => res.text())
      .then((data) => setMessage(data));
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* API Fetch Message */}
      <div className="flex items-center justify-center h-16 bg-gray-300">
        <h1 className="text-lg font-bold">{message}</h1>
      </div>

      {/* Main API Simulator Page */}
      <MainPage />
    </div>
  );
}
