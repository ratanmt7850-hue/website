import { SelectedPageEnum } from "@/app/shared/typesEnum";
import ActionButton from "@/app/shared/ActionButton";
import HomePageText from "../../../../public/img/svg/home_page_text.svg";
import HomePageGraphic from "../../../../public/img/home_page_graphic.png";
import HomePageGraphicQuiz from "../../../../public/img/home_page_graphic_quiz.png";
import { motion } from "framer-motion";
import axios from "axios";
import { useState, useEffect } from "react";
import HText from "@/app/shared/HText";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import backgroundSparkles from "../../../../public/img/background_sparkles.png";
import playStore from "../../../../public/img/pngwing.com.png";

type Props = {
  setSelectedPage: (value: SelectedPageEnum) => void;
};

const Main: React.FC<Props> = ({ setSelectedPage }: Props) => {
  const [data, setData] = useState({
    webtoggle: false,
    web_app_link: "",
    app_link: "",
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.ratanmatkas.com/api/v1/public/link`
      );
      console.log("Main component API response:", response.data);
      if (response.data) {
        setData({
          webtoggle: Boolean(response.data.webtoggle ?? false),
          web_app_link: response.data.web_app_link || "",
          app_link: response.data.app_link || "",
        });
      }
    } catch (error) {
      console.error("Error fetching data in Main component:", error);
      // Keep default state on error
    }
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section id="home" className="gap-16 bg-gradient-to-b from-primary-50 via-white to-secondary-100 py-12 md:h-full md:pb-0 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary-100 rounded-full blur-3xl opacity-20" style={{ zIndex: 0 }}></div>
      <div className="absolute bottom-40 left-10 w-96 h-96 bg-secondary-200 rounded-full blur-3xl opacity-15" style={{ zIndex: 0 }}></div>
      {/* Image and main header */}
      <motion.div
        className="mx-auto w-5/6 items-center justify-center md:flex md:h-[480px]"
        onViewportEnter={() => setSelectedPage(SelectedPageEnum.Home)}
      >
        {/* Main header */}
        <div className="relative z-10 mt-32 md:basis-3/5">
          {/* Headings */}
          <motion.div
            className="md:-mt-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, x: -100 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <div className="relative">
              <Image
                className="absolute w-full scale-150 top-[-6rem] left-[-6rem] opacity-60"
                src={backgroundSparkles}
                alt={"background sparkles img"}
                style={{ zIndex: 0 }}
              />
              <div className="flex flex-col justify-center">
                <div className="drop-shadow-lg">
                  <Image src={HomePageText} alt="Home page text" className="w-full h-auto" />
                </div>
                <span className="text-primary-600 font-semibold text-2xl md:text-3xl leading-relaxed mt-4 block">
                  {data?.webtoggle
                    ? `Your Trusted Matka Gaming Platform 🎲`
                    : `Challenge Your Knowledge & Win Big! 🏆`}
                </span>
              </div>
            </div>
            {data?.webtoggle && (
              <div className="mt-6 inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-md border border-primary-200">
                <span className="text-primary-600 font-bold text-lg">💰</span>
                <h1 className="text-base md:text-lg font-semibold text-gray-800">
                  Play & Win Up to Lakhs Daily!
                </h1>
              </div>
            )}
          </motion.div>

          {/* Action buttons */}
          <motion.div
            className="mt-8 flex items-center gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, x: -100 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            {data.webtoggle && (
              <a
                target="_blank"
                className="rounded-md bg-primary-500 text-white px-6 py-2 cursor-pointer transition duration-500 hover:bg-primary-600 shadow-md hover:shadow-lg font-semibold"
                href={data.web_app_link}
              >
                Download Now
              </a>
            )}

            <a href={data.app_link} target="_blank">
              <Image
                className="cursor-pointer rounded-md shadow-lg w-48 h-14"
                src={playStore}
                alt={"Play Store button"}
              />
            </a>
          </motion.div>
        </div>

        {/* Image */}
        <div className="relative flex basis-3/5 justify-center md:ml-40 md:mt-16 md:justify-items-end h-[280px] xs:h-[410px]" style={{ zIndex: 10 }}>
          <Image
            src={data.webtoggle ? HomePageGraphic : HomePageGraphicQuiz}
            alt="Home page graphic"
            className="absolute right-1/2 translate-x-[50%] md:right-0 md:translate-x-0 top-10 md:top-0 h-full md:h-[460px] w-auto object-contain"
          />
        </div>
      </motion.div>
      {/* THE ESSENTIAL */}
      <div className="relative bg-gradient-to-r from-primary-50 via-white to-secondary-100 py-12 sm:py-20 mx-4 md:mx-16 my-8 rounded-3xl shadow-xl border-2 border-primary-200 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100 rounded-full blur-3xl opacity-30 -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-200 rounded-full blur-2xl opacity-20 -ml-24 -mb-24"></div>
        
        <div className="md:flex flex-col items-center justify-center gap-6 mx-auto w-11/12 xl:w-5/6 h-full relative z-10">
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent mb-4"></div>
            <HText className="text-center">
              <span className="text-primary-600">About</span> Us
            </HText>
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent mt-4"></div>
          </div>
          
          <div className="w-full max-w-4xl space-y-6">
            {data.webtoggle ? (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-md border border-primary-100">
                <p className="text-lg text-justify text-gray-800 leading-relaxed">
                  Welcome to <strong className="text-primary-600">RATAN MATKA</strong>, your premier destination for 
                  the ultimate Satta Matka gaming experience. We&apos;ve crafted a cutting-edge platform that combines 
                  tradition with innovation, offering players an immersive journey into the world of numbers and 
                  excitement. Our platform provides real-time results, comprehensive market analysis, and expert 
                  insights for popular markets including <strong>Kalyan Matka</strong>, <strong>Mumbai Matka</strong>, 
                  and many more.
                </p>
              </div>
            ) : (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-md border border-primary-100">
                <p className="text-lg text-justify text-gray-800 leading-relaxed">
                  Welcome to <strong className="text-primary-600">RATAN MATKA</strong>, where thrilling quiz games 
                  meet exciting rewards. Challenge yourself with our diverse collection of quizzes and compete with 
                  players from around the world.
                </p>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-6 shadow-md border border-primary-200">
                <h3 className="text-xl font-bold text-primary-700 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                  Rich Heritage
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Discover the captivating history of Satta Matka, originating in the 1960s from Mumbai&apos;s cotton 
                  trading markets. This iconic game has evolved into a beloved cultural phenomenon.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-secondary-100 to-white rounded-2xl p-6 shadow-md border border-primary-200">
                <h3 className="text-xl font-bold text-primary-700 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                  Multiple Markets
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Explore various exciting markets like Kalyan Matka, Rajdhani Matka, and more. Each market offers 
                  unique opportunities and different gameplay experiences.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-6 md:p-8 text-center shadow-lg">
              <p className="text-white text-xl md:text-2xl font-semibold leading-relaxed">
                Join thousands of players at <strong>RATAN MATKA</strong> — where every draw brings new possibilities 
                and every game is a chance to win big! 🎯
              </p>
            </div>
          </div>
        </div>
      </div>
          {/* <div className="sm:flex items-center justify-between w-full md:w-10/12 h-full mx-auto pl-[20px] sm:pl-0">
            <div className="relative flex flex-col justify-center w-full xs:w-2/3 md:w-1/3 h-[120px] p-4 mx-auto rounded-xl border border-secondary-100 bg-secondary-100">
              <div className="absolute top-3 sm:top-[-20px] left-[-20px] sm:left-4 flex items-center justify-center w-10 h-10 border rounded-xl border-secondary-100 bg-gray-800">
                <ArrowRightIcon className="w-5 h-5 text-secondary-100 rotate-90 sm:rotate-0" />
              </div>
              <h2 className="text-lg md:text-xl font-bold text-gray-900 pl-3 sm-pl-0 pt-3">
                Download App
              </h2>
            </div>
            <svg
              className="w-auto h-6 mx-auto md:mx-0 hidden sm:block"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24.15 48.31"
            >
              <g>
                <path
                  className="fill-secondary-100"
                  d="m24.15,0v48.31c0-6.67-5.4-12.08-12.07-12.08S0,41.64,0,48.31V0c0,6.67,5.41,12.08,12.08,12.08S24.15,6.67,24.15,0Z"
                />
              </g>
            </svg>
            <svg
              className="w-6 h-auto mx-auto md:mx-0 block sm:hidden"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48.31 24.15"
            >
              <g>
                <path
                  className="fill-secondary-100"
                  d="m48.31,24.15H0c6.67,0,12.08-5.4,12.08-12.07S6.67,0,0,0h48.31c-6.67,0-12.08,5.41-12.08,12.08s5.41,12.07,12.08,12.07Z"
                />
              </g>
            </svg>
            <div className="relative flex flex-col justify-center w-full xs:w-2/3 md:w-1/3 h-[120px] p-4 mx-auto rounded-xl border border-secondary-100 bg-secondary-100">
              <div className="absolute top-3 sm:top-[-20px] left-[-20px] sm:left-4 flex items-center justify-center w-10 h-10 border rounded-xl border-secondary-100 bg-gray-800">
                <ArrowRightIcon className="w-5 h-5 text-secondary-100 rotate-90 sm:rotate-0" />
              </div>
              <h2 className="text-lg md:text-xl font-bold text-gray-900 pl-3 sm-pl-0 pt-3">
                Click On Sign In
              </h2>
            </div>
            <svg
              className="w-auto h-6 mx-auto md:mx-0 hidden sm:block"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24.15 48.31"
            >
              <g>
                <path
                  className="fill-secondary-100"
                  d="m24.15,0v48.31c0-6.67-5.4-12.08-12.07-12.08S0,41.64,0,48.31V0c0,6.67,5.41,12.08,12.08,12.08S24.15,6.67,24.15,0Z"
                />
              </g>
            </svg>
            <svg
              className="w-6 h-auto mx-auto md:mx-0 block sm:hidden"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48.31 24.15"
            >
              <g>
                <path
                  className="fill-secondary-100"
                  d="m48.31,24.15H0c6.67,0,12.08-5.4,12.08-12.07S6.67,0,0,0h48.31c-6.67,0-12.08,5.41-12.08,12.08s5.41,12.07,12.08,12.07Z"
                />
              </g>
            </svg>
            <div className="relative flex flex-col justify-center w-full xs:w-2/3 md:w-1/3 h-[120px] p-4 mx-auto rounded-xl border border-secondary-100 bg-secondary-100">
              <div className="absolute top-3 sm:top-[-20px] left-[-20px] sm:left-4 flex items-center justify-center w-10 h-10 border rounded-xl border-secondary-100 bg-gray-800">
                <ArrowRightIcon className="w-5 h-5 text-secondary-100 rotate-90 sm:rotate-0" />
              </div>
              <h2 className="text-lg md:text-xl font-bold text-gray-900 pl-3 sm-pl-0 pt-3">
                Select Game & Play The Game
              </h2>
            </div>
          </div> */}
    </section>
  );
};

export default Main;
