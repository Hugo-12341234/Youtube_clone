import logo from "../assets/youtube_logo.png";
import { Menu, Upload, Bell, User, Mic, Search, ArrowLeft } from "lucide-react";
import { Button } from "./Button";
import { useState } from "react";
import { useSideBar } from "../contexts/SideBarProvider";

export const Header = () => {
  const [fullSeachBar, setFullSearchBar] = useState<boolean>(false);

  return (
    <div className="flex justify-between gap-10 pt-2 mx-3 mb-6 lg:gap-20">
      <HeaderTopSection hidden={fullSeachBar} />
      <form
        className={`gap-4 flex-grow justify-center ${
          fullSeachBar ? "flex" : "hidden sm:flex"
        }`}
      >
        <Button
          buttonType="noBackground"
          size="icon"
          className={`flex-shrink-0 ${fullSeachBar ? "flex" : "hidden"}`}
          onClick={() => setFullSearchBar(false)}
        >
          <ArrowLeft />
        </Button>
        <div className="flex flex-row flex-grow max-w-[600px]">
          <input
            type="search"
            placeholder="Search"
            className="w-full px-4 py-1 text-lg border rounded-l-full shadow-inner outline-none border-secondary-border shadow-secondary focus:border-blue-500"
          />
          <Button className="flex-shrink-0 px-4 py-2 border border-l-0 rounded-r-full border-secondary-border">
            <Search />
          </Button>
        </div>
        <Button
          type="button"
          buttonType="default"
          size="icon"
          className="flex-shrink-0"
        >
          <Mic />
        </Button>
      </form>
      <div
        className={`flex flex-row flex-shrink-0 md:gap-2 ${
          fullSeachBar ? "hidden" : "flex"
        }`}
      >
        <Button
          buttonType="noBackground"
          size="icon"
          className="sm:hidden"
          onClick={() => setFullSearchBar(true)}
        >
          <Search />
        </Button>
        <Button buttonType="noBackground" size="icon" className="sm:hidden">
          <Mic />
        </Button>
        <Button buttonType="noBackground" size="icon">
          <Upload />
        </Button>
        <Button buttonType="noBackground" size="icon">
          <Bell />
        </Button>
        <Button buttonType="noBackground" size="icon">
          <User />
        </Button>
      </div>
    </div>
  );
};

interface HeaderTopSectionProps {
  hidden?: boolean;
}

export function HeaderTopSection({ hidden = false }: HeaderTopSectionProps) {
  const { toggle } = useSideBar();

  return (
    <div
      className={`flex flex-row gap-4 items-center flex-shrink-0 ${
        hidden ? "hidden" : "flex"
      }`}
    >
      <Button onClick={toggle} buttonType="noBackground" size="default">
        <Menu />
      </Button>
      <a href="/">
        <img src={logo} alt="Youtube Logo" className="h-12" />
      </a>
    </div>
  );
}
