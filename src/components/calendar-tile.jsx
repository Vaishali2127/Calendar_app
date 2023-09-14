import { useMemo } from "react";
import toast from "react-hot-toast";

import { bankHolidays } from "../utils/data";

// Individual Calendar Tile component
const CalendarTile = ({ day, isWeek, date, handleDateSelected }) => {
  const savedItem = useMemo(() => {
    if (!date) return null;

    const publicHoliday = bankHolidays[date.toLocaleDateString()];
    if (publicHoliday) return publicHoliday;

    const saved = localStorage.getItem(date.toLocaleDateString());
    if (!saved) return null;

    return JSON.parse(saved);
  }, [date]);

  const handleClick = () => {
    if (Object.keys(bankHolidays).includes(date.toLocaleDateString())) {
      toast.error("Cannot edit public holiday");
      return;
    }

    handleDateSelected && handleDateSelected(date);
  };

  return (
    <div
      onClick={handleClick}
      className={`relative hover:shadow-2xl pl-4 pt-4 cursor-pointer transition-all duration-700 border w-full h-full ${
        isWeek && "bg-teal-200 hover:shadow-none"
      } ${!day && "hover:shadow-none bg-gray-100"}`}
    >
      <p>{day}</p>
      {savedItem && (
        <div className="absolute top-0 bottom-0 left-0 w-2 bg-red-300"></div>
      )}
      {savedItem && (
        <div className="absolute bottom-2 left-3 text-white text-xs bg-teal-900 rounded-md px-3 py-1">
          {savedItem?.title}
        </div>
      )}
    </div>
  );
};

export default CalendarTile;
