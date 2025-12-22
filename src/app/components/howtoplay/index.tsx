import { useState, useEffect } from "react";
import axios from "axios";
import { SelectedPageEnum, ServiceType } from "@/app/shared/typesEnum";
import { motion } from "framer-motion";
import HText from "@/app/shared/HText";
import ServiceItem from "./ServiceItem";

const category: Array<ServiceType> = [
  {
    name: "Download RATAN MATKA App",
    description:
      "This service involves creating, designing, and developing software applications for different purposes, such as desktop or mobile applications, web applications, and custom software solutions.",
  },
  {
    name: "Click On SignIn",
    description:
      "This service involves testing the software to ensure that it meets the necessary standards and requirements, and that it works correctly.",
  },
  {
    name: "Recharge Your Wallet",
    description:
      "This service involves providing ongoing maintenance and support to ensure that the software continues to function correctly and that any issues that arise are addressed promptly.",
  },
  {
    name: "Play RATAN MATKA Betting",
    description:
      "This service involves overseeing the development process and ensuring that the project is completed on time, within budget, and to the required standard.",
  },
  {
    name: "Win Huge Real Cash",
    description:
      "This service involves designing software that is user-friendly, intuitive, and easy to use.",
  },
  {
    name: "Public Relations and Media Outreach",
    description:
      "This service involves providing expert advice and guidance to clients on issues such as software development strategies, project management, and software integration.",
  },
];

const category_quiz: Array<ServiceType> = [
  {
    name: "Download RATAN MATKA App",
    description:
      "Easily download the RATAN MATKA app to start enjoying a variety of engaging quiz games right from your mobile device. Stay connected and play anywhere, anytime.",
  },
  {
    name: "Click On Sign In",
    description:
      "Sign in to your RATAN MATKA account to access all features, track your progress, and participate in exciting quiz challenges. Enjoy a personalized gaming experience.",
  },
  {
    name: "Play RATAN MATKA Quiz",
    description:
      "Join the fun and start playing our wide range of quiz games. Challenge your knowledge, compete with others, and climb the leaderboards to win fantastic prizes.",
  },
  {
    name: "Public Relations and Media Outreach",
    description:
      "Stay informed with the latest updates and news from RATAN MATKA. Our public relations and media outreach keep you updated on new games, events, and special offers.",
  },
];

type Props = {
  setSelectedPage: (value: SelectedPageEnum) => void;
};

const HowToPlay: React.FC<Props> = ({ setSelectedPage }: Props) => {
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

  const selectedCategory = data.webtoggle ? category : category_quiz;

  return (
    <section id="howtoplay" className="w-full bg-gray-800 pt-24 pb-32">
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
          <div className="md:w-3/5">
            <HText>
              HOW TO<span className="text-primary-100"> PLAY?</span>
            </HText>
            <p className="py-5">Find out How to play that amazing Quiz Game</p>
          </div>
        </motion.div>
        <div className="mt-10 mx-auto h-auto w-5/6">
          <ul className="flex flex-wrap justify-center gap-1">
            {selectedCategory.map((item: ServiceType, index) => (
              <ServiceItem
                key={`${item.name}-${index}`}
                name={item.name}
                description={item.description}
              />
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
};

export default HowToPlay;
