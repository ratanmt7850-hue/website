"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { ArrowPathIcon } from "@heroicons/react/24/outline"; // Import the reload icon from Heroicons
import "../src/app/globals.css";
import "../styles/Panel.css";

interface Result {
  from: string;
  open_panna?: string;
  open_digit?: string;
  close_panna: string;
  close_digit?: string;
}

const Panel: React.FC = () => {
  const [weekdate, setWeekdate] = useState<Record<string, string>[]>([]);
  const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const arr: string[] = [];
  const router = useRouter();
  const { id } = router.query;

  const getResults = async () => {
    try {
      const res = await axios.get(
        `https://api.ratanmatkas.com/api/v1/public/result?market_id=${id}`
      );
      const resData = res.data.data;
      setData(resData);
    } catch (e) {
      console.log("Error:", e);
    }
  };

  const replaceDashWithStar = (value?: string) => (value === "-" ? "*" : value);
  const replaceDashWithStarThree = (value?: string) =>
    value === "-" ? "***" : value;

  const setData = (resdata: Result[]) => {
    const data: Record<string, string>[] = [];
    let obj: Record<string, string> = {};
    for (const result of resdata) {
      let date = new Date(result.from);
      date = new Date(date.getTime() - date.getTimezoneOffset() * 60000); // Adjusting to the local timezone
      const dateString = `${
        date.getMonth() + 1
      }/${date.getDate()}/${date.getFullYear()}`;
      const res1 =
        `${replaceDashWithStarThree(result.open_panna)} - ${replaceDashWithStar(
          result.open_digit
        )}` ?? "*** - *";
      const parts = [
        replaceDashWithStarThree(result.close_panna),
        replaceDashWithStar(result.close_digit),
      ] ?? ["***", "*"];
      const res2 = `${parts[1]} - ${parts[0]}`;
      obj[dateString] = res1 + res2;
      data.push({ ...obj });
      obj = {};
    }
    setWeekdate(data);
  };

  const getWeekDates = (weekIndex: number) => {
    const today = new Date();
    const currentDay = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDay + (1 - weekIndex * 7)); // Set to Monday of the week
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() - currentDay + (7 - weekIndex * 7)); // Set to Sunday of the week

    return { startDate: startOfWeek, endDate: endOfWeek };
  };

  const getallDates = (day: number, weekIndex: number) => {
    const today = new Date();
    const currentDay = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDay + (day - weekIndex * 7)); // Set to the desired day of the week

    return formatDate(startOfWeek);
  };

  const formatDate = (date: Date) => {
    if (date instanceof Date && !isNaN(date.getTime())) {
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    } else {
      return ""; // Return empty string if date is invalid
    }
  };

  const funcs = (item: string) => {
    for (const obj of weekdate) {
      const [key, val] = Object.entries(obj)[0];
      if (item === key) {
        return getCss(val);
      }
    }
    return getCss("*** - ** - ***");
  };

  const getCss = (vals: string) => {
    const part = vals.split(" - ");
    const n = Math.abs(Number(part[1][0]) - Number(part[1][1]));
    const s = n === 0 || n === 5;
    return (
      <div className="black position" style={{ fontSize: "large" }}>
        <p>{part[1]}</p>
      </div>
    );
  };

  for (let i = 1; i <= 7; i++) {
    const date = getallDates(i, 1);
    const day = new Date(date).getDay();
    arr.push(weeks[day]);
  }

  useEffect(() => {
    if (id) {
      getResults();
    }
  }, [id]);

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
          Panel Charts
        </h1>
      </div>
      <div className="PanelCharts overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-white p-2 border border-gray-500">
                <p>Date</p>
              </th>
              {arr.map((item, index) => (
                <th
                  key={index}
                  className="text-white p-2 border border-gray-500"
                >
                  <p>{item}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, index) => {
              const { startDate, endDate } = getWeekDates(index);
              return (
                <tr key={index}>
                  <td className="tdName text-white font-bold">
                    <div className="Td text-center p-4">
                      <p>
                        {formatDate(startDate)} <br /> to <br />{" "}
                        {formatDate(endDate)}
                      </p>
                    </div>
                  </td>
                  {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                    <td
                      key={day}
                      className="text-center border border-gray-500"
                    >
                      {funcs(getallDates(day, index))}
                    </td>
                  ))}
                </tr>
              );
            })}
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
