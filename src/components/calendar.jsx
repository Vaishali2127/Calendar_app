import React, { useState } from "react";
import CalendarTile from "./calendar-tile";
import AddHolidayDialog from "./add-holiday-dialog";
import EditHolidayDialog from "./edit-holiday-dialog";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Utility function to get the number of days in a month
const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

// Generate week tiles for a specific month and year
const generateWeekTiles = (month, year, handleDateSelected) => {
  const totalDays = getDaysInMonth(month, year);
  const firstDate = new Date(year, month);
  const firstDay = firstDate.getDay();
  const tiles = [];

  for (let day = 1 - firstDay; day <= totalDays; day++) {
    let date = undefined;
    if (day > 0) {
      date = new Date(firstDate.getFullYear(), firstDate.getMonth(), day);
    }
    tiles.push(
      <CalendarTile
        handleDateSelected={handleDateSelected}
        key={day}
        date={date}
        day={day > 0 ? day : ""}
      />
    );
  }

  return tiles;
};

// Main Calendar component
const Calendar = ({ selectedMonth }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleTileClick = (date) => {
    console.log(date);
    setSelectedDate(date);
    const savedItem = localStorage.getItem(date.toLocaleDateString());

    if (savedItem) {
      return setIsEditOpen(true);
    }

    setIsAddOpen(true);
  };

  return (
    <div className="w-screen flex h-full flex-col">
      <div className="grid grid-cols-7">
        {daysOfWeek.map((day, index) => (
          <CalendarTile key={index} day={day} isWeek />
        ))}
      </div>
      <div className="h-4/5 grid grid-cols-7">
        {generateWeekTiles(selectedMonth, 2023, handleTileClick)}
      </div>
      <AddHolidayDialog
        selectedDate={selectedDate}
        isOpen={isAddOpen}
        closeModal={() => setIsAddOpen(false)}
      />
      <EditHolidayDialog
        selectedDate={selectedDate}
        isOpen={isEditOpen}
        closeModal={() => setIsEditOpen(false)}
      />
    </div>
  );
};

export default Calendar;
