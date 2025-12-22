import { useForm } from "react-hook-form";
import { SelectedPageEnum } from "@/app/shared/typesEnum";
import { motion } from "framer-motion";
import axios from "axios";
import { useState, useEffect } from "react";
import ContactUsPageGraphic from "../../../../public/img/contact_us_page_graphic.png";
import ContactUsPageGraphicQuiz from "../../../../public/img/contact_us_page_graphic_quiz.png";
import backgroundSparkles from "../../../../public/img/background_sparkles.png";
import HText from "@/app/shared/HText";
import Image from "next/image";

type Props = {
  setSelectedPage: (value: SelectedPageEnum) => void;
};

const ContactUs: React.FC<Props> = ({ setSelectedPage }: Props) => {
  const inputStyles = `mb-5 w-full rounded-lg bg-primary-50 border border-primary-200
  px-5 py-3 placeholder-gray-600 placeholder:font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent`;

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
  } = useForm();

  const [formResponse, setFormResponse] = useState<string | null>(null);

  const onSubmit = async (data: any, e: any) => {
    const isValid = await trigger();
    if (!isValid) {
      e.preventDefault();
      return;
    }

    try {
      const response = await axios.post(
        "https://api.ratanmatkas.com/api/v1/enquiry/create",
        {
          name: data.name,
          mobile: data.mobile,
          message: data.message,
        }
      );
      setFormResponse(
        "Thank you for your enquiry. We will get back to you soon."
      );
      reset(); // Clear the form fields after successful submission
    } catch (error) {
      console.error("Error submitting the form:", error);
      setFormResponse(
        "Sorry, there was an issue submitting your enquiry. Please try again later."
      );
    }
  };

  const [apiData, setApiData] = useState({
    webtoggle: false,
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.ratanmatkas.com/api/v1/public/link`
      );
      console.log("ContactUs component API response:", response.data);
      if (response.data) {
        setApiData({
          webtoggle: Boolean(response.data.webtoggle ?? false),
        });
      }
    } catch (error) {
      console.error("Error fetching data in ContactUs component:", error);
      // Keep default state on error
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section id="contactus" className="mx-auto w-5/6 pt-24">
      <motion.div
        onViewportEnter={() => setSelectedPage(SelectedPageEnum.ContactUs)}
      >
        {/* HEADER */}
        <motion.div
          className="md:w-3/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <HText>
            <span className="text-primary-600">Need Help? </span> Get In Touch
            US NOW!
          </HText>
          {/* <p className="my-5">
            Congue adipiscing risus commodo placerat. Tellus et in feugiat nisl
            sapien vel rhoncus. Placerat at in enim pellentesque. Nulla
            adipiscing leo egestas nisi elit risus sit. Nunc cursus sagittis.
          </p> */}
        </motion.div>

        {/* FORM AND IMAGE */}
        <div className="mt-10 justify-between gap-8 md:flex">
          <motion.div
            className="mt-10 basis-3/5 md:mt-0 relative z-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              {errors.name && (
                <p className="mt-1 text-red-500">
                  {errors.name.type === "required" && "This field is required."}
                  {errors.name.type === "maxLength" &&
                    "Max length is 100 char."}
                </p>
              )}
              <input
                className={inputStyles}
                type="text"
                placeholder="NAME"
                {...register("name", {
                  required: true,
                  maxLength: 100,
                })}
              />
              {errors.mobile && (
                <p className="mt-1 text-red-500">
                  {errors.mobile.type === "required" &&
                    "This field is required."}
                  {errors.mobile.type === "pattern" && "Invalid mobile number."}
                </p>
              )}
              <input
                className={inputStyles}
                type="text"
                placeholder="MOBILE"
                {...register("mobile", {
                  required: true,
                  pattern: /^[0-9]{10}$/,
                })}
              />
              {errors.message && (
                <p className="mt-1 text-red-500">
                  {errors.message.type === "required" &&
                    "This field is required."}
                  {errors.message.type === "maxLength" &&
                    "Max length is 2000 char."}
                </p>
              )}
              <textarea
                className={inputStyles}
                placeholder="MESSAGE"
                rows={4}
                cols={50}
                {...register("message", {
                  required: true,
                  maxLength: 2000,
                })}
              />

              <button
                type="submit"
                className="mt-5 rounded-lg bg-primary-500 hover:bg-primary-600 px-10 py-3 transition duration-500 text-white"
              >
                SUBMIT
              </button>
            </form>

            {formResponse && (
              <p className="mt-5 text-center text-lg text-primary-600">
                {formResponse}
              </p>
            )}
          </motion.div>

          <motion.div
            className="relative mt-16 basis-2/5 md:mt-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Image
              className="w-full absolute bottom-20 right-10 opacity-40"
              alt="background sparkles img"
              src={backgroundSparkles}
              style={{ zIndex: 0 }}
            />
            <div className="w-full relative">
              <Image
                className="max-w-sm 2xl:max-w-full w-full relative z-10 mx-auto object-contain"
                alt="contact-us-page-graphic"
                src={
                  apiData?.webtoggle
                    ? ContactUsPageGraphic
                    : ContactUsPageGraphicQuiz
                }
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactUs;
