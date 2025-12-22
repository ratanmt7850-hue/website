import Image from "next/image";
import axios from "axios";
import { useState, useEffect } from "react";
import ActionButton from "@/app/shared/ActionButton";
import HText from "@/app/shared/HText";
import { BenefitType, SelectedPageEnum } from "@/app/shared/typesEnum";
import {
  CheckCircleIcon,
  LifebuoyIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import BenefitsPageGraphic from "../../../../public/img/benefits_page_graphic.png";
import BenefitsPageGraphicQuiz from "../../../../public/img/benefits_page_graphic_quiz.png";
import Benefit from "./Benefit";

const benefits: Array<BenefitType> = [
  {
    icon: <CheckCircleIcon className="h-6 w-6" />,
    title: "Quality",
    description:
      "Neque adipiscing amet amet enim. Feugiat dolor enim fermentum in a in lectus pellentesque. Ullamcorper et.",
  },
  {
    icon: <LifebuoyIcon className="h-6 w-6" />,
    title: "Support 24/7",
    description:
      "Eu ipsum id egestas risus tempus enim semper felis quis. Nec consectetur ac venenatis facilisi est. Eget ac turpis id.",
  },
  {
    icon: <PlusCircleIcon className="h-6 w-6" />,
    title: "Value-added",
    description:
      "Fusce vestibulum aliquam ut cras. Nisl lectus egestas sapien nisl. Lacus at mi sit pellentesque. Congue parturient.",
  },
];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

type Props = {
  setSelectedPage: (value: SelectedPageEnum) => void;
};

const AboutUs: React.FC<Props> = ({ setSelectedPage }) => {
  const [data, setData] = useState({
    webtoggle: false,
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
    <section
      id="aboutus"
      className="mx-auto min-h-full w-5/6 pt-10 lg:pt-24 pb-32"
    >
      <motion.div
        onViewportEnter={() => setSelectedPage(SelectedPageEnum.Benefits)}
      >
        {/* HEADER */}
        {/* <motion.div
                    className="md:my-5 md:w-3/5"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                    variants={{
                        hidden: { opacity: 0, x: -50 },
                        visible: { opacity: 1, x: 0 },
                    }}
                >
                    <HText>MORE THAN JUST <span className="text-primary-100">SERVICES</span></HText>
                    <p className="my-5 text-sm">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore animi molestias excepturi quibusdam iure temporibus saepe tenetur sunt ea suscipit aliqui.
                    </p>
                </motion.div> */}
        {/* BENEFITS */}
        {/* <motion.div
                    className="mt-5 items-center justify-between gap-1 md:flex"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={container}
                >
                    {benefits.map((benefit: BenefitType) => (
                        <Benefit
                            key={benefit.title}
                            icon={benefit.icon}
                            title={benefit.title}
                            description={benefit.description}
                            setSelectedPage={setSelectedPage}
                        />
                    ))}
                </motion.div> */}
        {/* GRAPHICS AND DESCRIPTION */}
        <div className=" mt-16 items-center justify-between gap-20 md:mt-28 md:flex">
          {/* GRAPHIC */}
          <Image
            className="w-full sm:w-1/2 mx-auto"
            alt="benefits-page-graphic"
            src={
              data?.webtoggle ? BenefitsPageGraphic : BenefitsPageGraphicQuiz
            }
          />
          {/* DESCRIPTION */}
          <div className="w-full md:w-1/2">
            {/* TITLE */}
            <div className="relative">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                variants={{
                  hidden: { opacity: 0, x: 50 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 95.854 95.66"
                  className="hidden w-12 h-12 md:block absolute top-[-2rem] left-[-4rem] z-[1] rotate-45 fill-gray-800"
                >
                  <path d="M95.85,47.79a.208.208,0,0,1,0,.08,5.071,5.071,0,0,1-.04.68,3.417,3.417,0,0,1-.09.63c-.02.1-.04.2-.07.3a2,2,0,0,1-.09.35.122.122,0,0,1-.03.09l-.01.02c-.09.27-.19.54-.3.8a8.01,8.01,0,0,1-.63,1.1,1.292,1.292,0,0,1-.25.34c-.09.11-.18.22-.27.32a1.935,1.935,0,0,1-.27.31l-.11.11L53,93.6a7.046,7.046,0,0,1-9.96-9.97L71.79,54.88H7.05a7.045,7.045,0,0,1,0-14.09H71.8L43.04,12.03A7.046,7.046,0,0,1,53,2.06l40.8,40.8c.21.21.4.43.58.65a3.175,3.175,0,0,1,.27.37c.07.1.37.65.45.82.03.05.06.11.09.17s.06.14.09.22a.974.974,0,0,0,.05.11.3.3,0,0,1,.04.1.564.564,0,0,1,.04.12c.05.11.3.99.31,1.06a3.416,3.416,0,0,1,.09.63,5.17,5.17,0,0,1,.04.68Z" />
                </svg>
                <HText>
                  <span className="text-primary-100">RATAN MATKA: </span>{" "}
                  {data?.webtoggle
                    ? `Leading Satta Matka Platform`
                    : `Leading Quiz Game Platform`}
                </HText>
              </motion.div>
            </div>

            {/* DESCRIPT */}
            <div>
              <p className="my-5 leading-7">
                {data?.webtoggle
                  ? `RATAN MATKA is one of the leading and most trusted websites
                in the satta matka industry. Here, you can play a variety of
                satta matka games such as Kalyan Matka, ratan matka, Satta King,
                Rajdhani Matka, Madhur Matka, Milan Day & Night, Mumbai Matka,
                Tara Matka, and other popular satta games. We take pride in
                being one of the oldest platforms in the industry.`
                  : `Welcome to RATAN MATKA, your ultimate destination for
                engaging and challenging quiz games. Our platform offers a wide
                variety of quiz games that test your knowledge across multiple
                subjects and topics. Whether you're a trivia buff or just
                looking for some fun, RATAN MATKA has something for everyone.`}
              </p>
              <p className="mb-5 leading-7">
                {data?.webtoggle
                  ? `With a growing player base and evolving gameplay, we
                continuously optimize our platform to ensure the best experience
                for our players. We have been maintaining game charts for many
                years, providing the most updated and comprehensive records of
                various game types. Our platform features detailed charts
                including the Time Chart, Kalyan Chart, Milan Day Chart, Milan
                Night Chart, Rajdhani Day Chart, Rajdhani Night Chart, Kalyan
                Night Chart, Main Bazar Chart, Time Penal Chart, Kalyan Penal
                Chart, Main Bazar Penal Chart, Milan Day Penal Chart, Rajdhani
                Day Penal Chart, Rajdhani Night Penal Chart, Kalyan Night Penal
                Chart, and other popular game charts`
                  : `Our platform is designed to provide an exciting and seamless
                experience for all players. We continuously optimize our
                gameplay and user interface to ensure the best possible
                experience. With a growing player base, we are committed to
                keeping our content fresh and up-to-date.`}
              </p>
              <p className="mb-5 leading-7">
                {data?.webtoggle
                  ? `Satta Matka is a game that has over fifty variants and is played
                all over the world and in multiple regions of India. Players
                worldwide search for a platform that allows them to view satta
                matka results of various game genres. RATAN MATKA is the best
                site to view the fastest online matka results. We have created a
                special section where current game results are published, and
                results of past games of that particular day are saved below. We
                ensure that we provide genuine results for Kalyan Matka, ratan matka,
                Satta Matta Matka, Satta King, and other games. `
                  : `At RATAN MATKA, you can participate in various quiz games and
                challenges. Our platform features detailed leaderboards,
                allowing you to track your progress and compare your scores with
                other players. Compete in real-time quizzes, daily challenges,
                and special themed events to earn points and rewards.`}
              </p>
              <p className="mb-5 leading-7">
                {data?.webtoggle
                  ? `We are always improving the player experience and sharing
                helpful information with our community. In the past, we catered
                to a wide audience in various satta matka games, allowing
                players to access everything in one location. We also provide
                matka guessing forums and VIP forums for participants at RATAN MATKA. This makes the game easier to understand, and if
                players have trouble finding numbers, they can rely on our
                forum. Our professionals, with over thirty years of expertise in
                the kalyan matka sector, predict outcomes and share them with
                our users on the forum.`
                  : `We understand the importance of accurate and timely information,
                which is why we maintain comprehensive records of quiz results
                and player statistics. Our platform includes various charts and
                leaderboards, such as the Daily Leaderboard, Weekly Leaderboard,
                Monthly Leaderboard, and All-Time Leaderboard, to help you stay
                informed and motivated.`}
              </p>
            </div>

            {/* BUTTON */}
            <div className="relative mt-16 z-10">
              <ActionButton
                setSelectedPage={setSelectedPage}
                page={SelectedPageEnum.ContactUs}
                label="Contact Now"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutUs;
