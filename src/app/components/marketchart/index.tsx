import { useState, useEffect } from "react";
import axios from "axios";
import { SelectedPageEnum } from "@/app/shared/typesEnum";
import { motion } from "framer-motion";
import HText from "@/app/shared/HText";
import { DateTime } from "luxon"; // Assuming you're using luxon for date-time manipulation

type Props = {
  setSelectedPage: (value: SelectedPageEnum) => void;
};

// Helper function to get the current day of the week
const getCurrentDay = () => {
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const todayIndex = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
  return days[todayIndex];
};

// Helper function to parse time in "HH:mm" format into total minutes
const parseTime = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const MarketChart: React.FC<Props> = ({ setSelectedPage }: Props) => {
  const [activeTab, setActiveTab] = useState("main");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentDay = getCurrentDay();

  const fetchData = async (tag: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.ratanmatkas.com/api/v1/public/market?tag=${tag}`
      );
      const filteredData = response.data.data.filter(
        (item: any) => item.status
      );

      const nowTime = parseTime(DateTime.now().toFormat("HH:mm"));
      const today = DateTime.now().toFormat("cccc").toLowerCase(); // Get the current day in lowercase

      // Sort the filtered data
      let sortedData = filteredData.sort((a: any, b: any) => {
        const aCloseTime = parseTime(a.close_time);
        const bCloseTime = parseTime(b.close_time);

        // If close_time has passed for both, sort by open_time
        if (aCloseTime < nowTime && bCloseTime < nowTime) {
          const aOpenTime = parseTime(a.open_time);
          const bOpenTime = parseTime(b.open_time);
          return aOpenTime - bOpenTime;
        }

        // Sort by close_time with special conditions
        if (aCloseTime < nowTime) {
          return 1;
        }
        if (bCloseTime < nowTime) {
          return -1;
        }

        return aCloseTime - bCloseTime; // Default sorting by close_time
      });

      // Dynamically set market_status based on market_off_day for today's day and map to desired structure
      // Map the data to include the updated structure and market_status
      let updatedData = sortedData.map((item: any, index: number) => {
        const isMarketOffToday = item.market_off_day[today] === true; // Check if the market is off today
        console.log(isMarketOffToday);
        return {
          id: index + 1,
          market_id: item._id,
          title: item.name,
          close_time: item.close_time,
          open_time: item.open_time,
          close_digit: item.close_digit,
          close_panna: item.close_panna,
          open_digit: item.open_digit,
          open_panna: item.open_panna,
          status: item.status,
          market_status: isMarketOffToday, // Update market_status: true if market is open, false if closed
        };
      });

      // Sort the updatedData to move closed markets (market_status: false) to the bottom
      updatedData = updatedData.sort((a: any, b: any) => {
        // Sort by market_status first to move closed markets to the bottom
        if (a.market_status !== b.market_status) {
          return a.market_status ? -1 : 1;
        }

        // If both markets have the same status, keep their original order
        return 0;
      });
      console.log(updatedData);
      setData(updatedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  const tabs = [
    { id: "main", label: "Main" },
    { id: "starline", label: "Starline" },
    { id: "galidisawar", label: "Disawar" },
  ];

  return (
    <section id="marketchart" className="w-full bg-gradient-to-b from-white to-primary-50 pt-24 pb-32">
      <motion.div
        onViewportEnter={() => setSelectedPage(SelectedPageEnum.Services)}
      >
        <motion.div
          className="mx-auto w-5/6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <div className="md:w-3/5 text-center">
            <HText>
              Select<span className="text-primary-600"> Market</span>
            </HText>
          </div>
        </motion.div>
        <div className="mx-auto w-5/6 mt-8">
          <div className="flex flex-wrap justify-center space-x-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-4 py-2 font-semibold text-sm rounded-lg transition-all ${
                  activeTab === tab.id
                    ? "bg-primary-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="mt-8 p-4 bg-white rounded-lg text-gray-800 shadow-lg border border-primary-100">
            {loading ? (
              <div className="space-y-4">
                {[...Array(25)].map((_, index) => (
                  <div
                    key={index}
                    className="h-6 bg-gray-300 animate-pulse rounded"
                  ></div>
                ))}
              </div>
            ) : (
              <ul className="space-y-4 text-center">
                {data.map((item: any) => (
                  <li
                    key={item.market_id}
                    className="flex flex-col p-4 bg-white rounded-lg border border-primary-100 shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <span className="font-bold">{item.title}</span>
                      {item.market_status ? (
                        <>
                          {activeTab === "main" && (
                            <>
                              <span className="font-bold text-gray-600">
                                {item.open_panna === "-"
                                  ? "☆☆☆"
                                  : item.open_panna}{" "}
                                -{" "}
                                {item.open_digit === "-"
                                  ? "☆"
                                  : item.open_digit}
                                {item.close_digit === "-"
                                  ? "☆"
                                  : item.close_digit}{" "}
                                -{" "}
                                {item.close_panna === "-"
                                  ? "☆☆☆"
                                  : item.close_panna}
                              </span>

                              <span className="text-gray-600">
                                Time: {item.open_time} - {item.close_time}
                              </span>
                            </>
                          )}

                          {activeTab === "starline" && (
                            <>
                              <span className="font-bold text-gray-600">
                                {item.open_panna === "-"
                                  ? "☆☆☆"
                                  : item.open_panna}{" "}
                                -{" "}
                                {item.open_digit === "-"
                                  ? "☆"
                                  : item.open_digit}
                              </span>

                              <span className="text-gray-600">
                                Time: {item.open_time}
                              </span>
                            </>
                          )}

                          {activeTab === "galidisawar" && (
                            <>
                              <span className="font-bold text-gray-600">
                                {item.open_digit === "-"
                                  ? "☆"
                                  : item.open_digit}
                                {item.close_digit === "-"
                                  ? "☆"
                                  : item.close_digit}
                              </span>
                              <span className="text-gray-600">
                                Time: {item.close_time}
                              </span>
                            </>
                          )}
                        </>
                      ) : (
                        <span className="text-red-500 font-bold">Holiday</span>
                      )}
                    </div>
                    <div className="text-gray-600 mt-2">
                      {item.status ? "Open" : "Closed"}
                    </div>
                    <a
                      href={
                        activeTab === "main"
                          ? `/panel?id=${item.market_id}`
                          : activeTab === "starline"
                          ? `/starline`
                          : activeTab === "galidisawar"
                          ? `/disawar?id=${item.market_id}`
                          : ""
                      }
                      className="mt-4 px-4 p-2 bg-primary-500 text-white font-semibold rounded-lg"
                    >
                      Panel
                    </a>
                    {activeTab === "main" && (
                      <a
                        href={`/disawar?id=${item.market_id}`}
                        className="mt-4 px-4 p-2 bg-primary-500 text-white font-semibold rounded-lg"
                      >
                        Jodi
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default MarketChart;
