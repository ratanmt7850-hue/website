"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { SelectedPageEnum } from "./shared/typesEnum";
import Navbar from "./components/nav-bar";
import Main from "./components/main";
import Benefits from "./components/benefits";
import AboutUS from "./components/aboutus";
import Services from "./components/services";
import HowToPlay from "./components/howtoplay";
import MarketChart from "./components/marketchart";
import ContactUs from "./components/contact-us";
import Footer from "./components/footer";
import Pricing from "./components/pricing";
import Faqs from "./components/faqs";

export default function Home() {
  const [selectedPage, setSelectedPage] = useState<SelectedPageEnum>(
    SelectedPageEnum.Home
  );
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);

  const [data, setData] = useState({
    webtoggle: false,
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.ratanmatkas.com/api/v1/public/link`
      );
      console.log("Page component API response:", response.data);
      if (response.data) {
        setData({
          webtoggle: Boolean(response.data.webtoggle ?? false),
        });
      }
    } catch (error) {
      console.error("Error fetching data in Page component:", error);
      // Keep default state on error
    }
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true);
        setSelectedPage(SelectedPageEnum.Home);
      }
      if (window.scrollY !== 0) setIsTopOfPage(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-gradient-to-b from-secondary-100 to-white max-w-[1600px] mx-auto">
      <Navbar
        isTopOfPage={isTopOfPage}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
      />
      <Main setSelectedPage={setSelectedPage} />
      {/* <Benefits setSelectedPage={setSelectedPage} /> */}
      {data.webtoggle && <MarketChart setSelectedPage={setSelectedPage} />}
      <AboutUS setSelectedPage={setSelectedPage} />
      {/* <Services setSelectedPage={setSelectedPage} /> */}
      <HowToPlay setSelectedPage={setSelectedPage} />
      {/* <Pricing setSelectedPage={setSelectedPage} /> */}
      {data.webtoggle && <Faqs setSelectedPage={setSelectedPage} />}
      <ContactUs setSelectedPage={setSelectedPage} />
      <Footer />
    </div>
  );
}
