import { SelectedPageEnum } from "@/app/shared/typesEnum";
import Link from "next/link";

type Props = {
  page: string;
  selectedPage: SelectedPageEnum;
  setSelectedPage: (value: SelectedPageEnum) => void;
};

const MyLink: React.FC<Props> = ({
  page,
  selectedPage,
  setSelectedPage,
}: Props) => {
  const lowerCasePage = page
    .toLowerCase()
    .replace(/ /g, "") as SelectedPageEnum;
  return (
    <Link
      className={`${
        selectedPage === lowerCasePage ? "text-primary-600 font-semibold" : "text-gray-700"
      }
    transition duration-500 hover:text-primary-600 cursor-pointer
    `}
      href={`#${lowerCasePage}`}
      onClick={() => setSelectedPage(lowerCasePage)}
    >
      {page}
    </Link>
  );
};

export default MyLink;
