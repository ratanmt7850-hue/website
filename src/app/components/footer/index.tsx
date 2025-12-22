import Logo from "../../../../public/img/svg/MATKA_WEB_LOGO.svg";
import HText from "@/app/shared/HText";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowTopRightOnSquareIcon,
  LinkIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Copyright from "./Copyright";
import playStore from "../../../../public/img/pngwing.com.png";

const Footer = () => {
  const [data, setData] = useState({
    webtoggle: false,
    app_link: "https://google.com",
    whatsapp: "9887685099",
    mobile: "9887685099",
    telegram: "milanprime50",
    email_1: "-",
    email_2: "-",
    web_app_link: "https://ratanmatkas.com",
    twitter: "",
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
    <footer className="bg-gray-900 py-16">
      <div className="mx-auto w-5/6 md:pb-10 pb-0">
        <HText>
          <span className="text-primary-100">Find</span> us in
        </HText>
        <div className="gap-4 sm:flex my-5">
          <a
            className="flex gap-3 justify-center items-center rounded-md bg-primary-300 px-10 py-2 cursor-pointer transition duration-500 hover:bg-primary-500 hover:text-white mb-4"
            href={`https://wa.me/${data?.whatsapp}`}
            target="_blank"
          >
            <span>WhatsApp</span>
            <ArrowTopRightOnSquareIcon className="w-5 h-5" />
          </a>
          <a
            className="flex gap-3 justify-center items-center rounded-md bg-primary-300 px-10 py-2 cursor-pointer transition duration-500 hover:bg-primary-500 hover:text-white mb-4"
            href={`https://t.me/${data?.telegram}`}
            target="_blank"
          >
            <span>Telegram</span>
            <ArrowTopRightOnSquareIcon className="w-5 h-5" />
          </a>
          <a
            className="flex gap-3 justify-center items-center rounded-md bg-primary-300 px-10 py-2 cursor-pointer transition duration-500 hover:bg-primary-500 hover:text-white mb-4"
            href={data?.twitter}
            target="_blank"
          >
            <span>Twitter</span>
            <ArrowTopRightOnSquareIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
      <div className="justify-content mx-auto w-5/6 gap-16 md:flex">
        <div className="mt-16 basis-1/2 md:mt-0">
          <Image alt="logo" src={Logo} className="h-5 w-auto" />
          {data?.webtoggle && (
            <p className="my-5 text-gray-200">
              You Are Viewing This Site On Your Own Risk. We Are Not Responsible
              For Any Kind Of Froad. Gambling Is Banned In India. If You Are Not
              Satisfied With Our Terms You Should Quit This Site Right Now.
            </p>
          )}
          <Copyright label="All rights reserved © " />
        </div>
        <div className="mt-16 basis-1/4 md:mt-0 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <LinkIcon className="w-5 h-5" />
            <h4 className="font-bold">Links</h4>
          </div>
          <Link
            href="/privacypolicy"
            title="Footer link"
            className="hover:text-primary-100 transition duration-500"
          >
            Privacy Policy
          </Link>
          {data?.webtoggle && (
            <Link
              href="/tramsandcondition"
              title="Footer link"
              className="hover:text-primary-100 transition duration-500"
            >
              Trams & Condition
            </Link>
          )}
        </div>
        <div className="mt-16 basis-1/4 md:mt-0">
          <div className="flex items-center gap-2">
            <PhoneIcon className="w-5 h-5" />
            <h4 className="font-bold">Contact Us</h4>
          </div>
          <a href={`tel:${data?.mobile}`}>
            <p>{data?.mobile}</p>
          </a>
          <br />
          <a target="_blank" href={data?.app_link}>
            <Image
              className="cursor-pointer rounded-md shadow-lg w-48 h-14"
              src={playStore}
              alt={"Play Store button"}
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
