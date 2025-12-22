"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../src/app/globals.css";
import Footer from "@/app/components/footer";
import "../styles/Panel.css";
import { ArrowPathIcon } from "@heroicons/react/24/outline"; // Import the reload icon from Heroicons

interface Result {
  createdAt: string;
  market_name: string;
  market_id: any;
  open_digit: string;
  open_panna: string;
  close_digit: string;
  close_panna: string;
  to: string; // Field to hold the reference date
}

const Panel: React.FC = () => {
  const [weekdate, setWeekdate] = useState<
    Record<string, Record<string, string>>
  >({});
  const [allDates, setAllDates] = useState<string[]>([]); // Hold all unique dates from the API including today

  // Convert 24-hour format to 12-hour format with AM/PM
  const convertTo12HourFormat = (time: any) => {
    let [hours, minutes] = time.split(":");
    hours = parseInt(hours, 10); // Convert hours to a number
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // The '|| 12' handles the case when hours is 0 or 12
    const formattedHours = hours.toString().padStart(2, "0");
    return `${formattedHours}:${minutes} ${period}`;
  };

  const columns = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
    "09:00 PM",
    "10:00 PM",
  ];

  const getResults = async () => {
    try {
      const res = await axios.get(
        `https://api.ratanmatkas.com/api/v1/public/result?tag=starline`
      );
      const resData: Result[] = res.data.data;

      // Call setData with the received results
      setData(resData);
    } catch (e) {
      console.log("Error:", e);
    }
  };

  const setData = (resdata: Result[]) => {
    const data: Record<string, Record<string, string>> = {};
    const uniqueDates: string[] = []; // Store all unique dates including today

    resdata.forEach((result) => {
      // Convert the 'to' field to a date string in local time (IST)
      const resultDate = new Date(result.to);

      // Use toLocaleString to format the date in DD/MM/YYYY format in IST (India Standard Time)
      const resultDateString = resultDate.toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata", // Ensure it's always in IST
      });

      const [datePart] = resultDateString.split(","); // Extract only the date part (DD/MM/YYYY)

      // Push the date to uniqueDates array if not already present
      if (!uniqueDates.includes(datePart)) {
        uniqueDates.push(datePart);
      }

      // Format the result for display
      const res1 = `${result.open_panna} - ${result.open_digit}`;

      // Ensure the date exists in the data object
      if (!data[datePart]) {
        data[datePart] = {};
      }

      // Use the open time for time-based grouping
      data[datePart][convertTo12HourFormat(result.market_id.open_time)] = res1;
    });

    // Add today's date to the uniqueDates array if not already present
    const today = formatDate(new Date());
    if (!uniqueDates.includes(today)) {
      uniqueDates.push(today);
    }

    // Sort the unique dates in descending order (most recent first)
    uniqueDates.sort((a, b) => {
      const [dayA, monthA, yearA] = a.split("/").map(Number);
      const [dayB, monthB, yearB] = b.split("/").map(Number);
      return (
        new Date(yearB, monthB - 1, dayB).getTime() -
        new Date(yearA, monthA - 1, dayA).getTime()
      );
    });

    setWeekdate(data);
    setAllDates(uniqueDates); // Set the sorted unique dates including today
  };

  const formatDate = (date: Date) => {
    if (date instanceof Date && !isNaN(date.getTime())) {
      return `${String(date.getDate()).padStart(2, "0")}/${String(
        date.getMonth() + 1
      ).padStart(2, "0")}/${date.getFullYear()}`;
    } else {
      return ""; // Return empty string if date is invalid
    }
  };

  const renderCell = (date: string, time: string) => {
    if (weekdate[date] && weekdate[date][time]) {
      return getCss(weekdate[date][time]);
    }
    return getCss("*** - *"); // Default for no result (like today with no data yet)
  };

  const getCss = (vals: string) => {
    const [firstPart, secondPart] = vals.split(" - ");
    return (
      <div className="black">
        <p>{firstPart}</p>
        <p className="Wet">{secondPart}</p>
      </div>
    );
  };

  useEffect(() => {
    getResults();
  }, []);

  return (
    <div className="bg-gray-900 max-w-[1600px] mx-auto Panel">
      <div
        className="w-full text-center"
        style={{
          padding: "1rem 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <h1 className="text-white text-center m-auto text-3xl md:text-5xl font-bold">
          Starline Charts
        </h1>
      </div>
      <div className="PanelCharts overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-white p-2 border border-gray-500">
                <p>Date</p>
              </th>
              {columns.map((col) => (
                <th key={col} className="text-white p-2 border border-gray-500">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allDates.map((date, index) => (
              <tr key={index}>
                <td className="tdName text-white font-bold">
                  <div className="Td text-center p-4">
                    <p>
                      {date} <br />
                    </p>
                  </div>
                </td>
                {columns.map((time) => (
                  <td key={time} className="text-center border border-gray-500">
                    {renderCell(date, time)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={getResults} className="fixed-button">
        <ArrowPathIcon className="icon-size" />
      </button>
    </div>
  );
};

export default Panel;
