import { useState } from "react";
import Calendar from "./components/calendar";
import MonthSelector from "./components/month-selector";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  return (
    <div className="w-full h-screen">
      <Toaster containerStyle={{ zIndex: 1000000 }} />

      <div className="w-full flex gap-4 pt-6 px-4 items-center">
        <h1 className="font-medium text-2xl">Your calendar</h1>
        <MonthSelector onChange={setSelectedMonth} />
      </div>
      <p className="px-4 my-3 text-gray-500">
        Click on any date to add or edit holiday
      </p>
      <Calendar selectedMonth={selectedMonth} />
    </div>
  );
};

export default App;
