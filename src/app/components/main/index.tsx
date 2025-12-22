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
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <section id="home" className="gap-16 bg-gray-900 py-10 md:h-full md:pb-0">
      {/* Image and main header */}
      <motion.div
        className="mx-auto w-5/6 items-center justify-center md:flex md:h-[480px]"
        onViewportEnter={() => setSelectedPage(SelectedPageEnum.Home)}
      >
        {/* Main header */}
        <div className="z-10 mt-32 md:basis-3/5">
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
                className="absolute w-full scale-150 top-[-6rem] left-[-6rem] z-[-1] opacity-80"
                src={backgroundSparkles}
                alt={"background sparkles img"}
              />
              <div className="flex flex-col justify-center">
                <Image src={HomePageText} alt="Home page text" />
                <span className="text-primary-100 font-light text-[2rem] leading-[4rem]">
                  {data?.webtoggle
                    ? `Best Online Matka App!`
                    : `Best Online Quiz App!`}
                </span>
              </div>
            </div>
            {data?.webtoggle && (
              <h1 className="mt-8 text-lg font-regular">
                PLAY UP TO LAKH DAILY WITH ratanmatkas
              </h1>
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
                className="rounded-md bg-transparent border-solid border border-white px-6 py-2 cursor-pointer transition duration-500 hover:bg-gray-800"
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
        <div className="relative flex basis-3/5 justify-center z-10 md:ml-40 md:mt-16 md:justify-items-end h-[280px] xs:h-[410px]">
          <Image
            src={data.webtoggle ? HomePageGraphic : HomePageGraphicQuiz}
            alt="Home page graphic"
            className="absolute right-1/2 translate-x-[50%] md:right-0 md:translate-x-0 top-10 md:top-0 h-full md:h-[460px] w-auto object-contain"
          />
        </div>
      </motion.div>
      {/* THE ESSENTIAL */}
      <div className="bg-gray-800 py-12 sm:py-20 mx-4 md:mx-16 my-4 rounded-2xl">
        <div className="md:flex flex-col items-center justify-center gap-4 mx-auto w-11/12 xl:w-5/6 h-full">
          <HText className="w-full md:w-2/12 md:max-w-[200px] pb-12 md:p-0">
            Introduction
          </HText>
          <div>
            {data.webtoggle ? (
              <p className="py-2 text-justify">
                Welcome to <strong>RATAN MATKA</strong>, where excitement and
                entertainment come together in the thrilling world of Satta
                Matka. We've created a platform that offers a dynamic experience
                for users of all backgrounds, providing everything you need to
                immerse yourself in this classic game of numbers and luck. At{" "}
                <strong>RATAN MATKA</strong>, we are your trusted source for
                accurate Matka results, expert guidance, and a wealth of
                information on the biggest Matka markets, including Kalyan
                Matka, Mumbai Matka, and more. Whether you're a seasoned player
                or just starting, our platform has all the resources you need to
                enhance your gameplay and increase your chances of success.
              </p>
            ) : (
              <p className="py-2 text-justify">Habibi</p>
            )}

            <p className="py-2 text-justify">
              Dive into the fascinating history of Satta Matka, which began in
              the 1960s as a unique form of betting on cotton rates in Mumbai.
              Over the years, it has evolved into a beloved numbers game, with
              various markets like Kalyan Matka and Rajdhani Matka offering
              different opportunities for players to test their luck.
            </p>
            <p className="py-2 text-justify">
              Join us at RATAN MATKA, where every draw holds the potential for
              fortune, and every game is an adventure waiting to unfold!
            </p>
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
        </div>
      </div>
    </section>
  );
};

export default Main;
