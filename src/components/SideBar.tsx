import {
  Home,
  Repeat,
  Clapperboard,
  Library,
  ChevronDown,
  ChevronUp,
  History,
  PlaySquare,
  Clock,
  ListVideo,
  Flame,
  ShoppingBag,
  Music2,
  Film,
  Radio,
  Gamepad2,
  Newspaper,
  Trophy,
  Lightbulb,
  Shirt,
  Podcast,
} from "lucide-react";
import { ElementType, ReactNode, useState } from "react";
import { buttonStyle } from "./Button";
import { twMerge } from "tailwind-merge";
import React from "react";
import { Button } from "./Button";
import { playlists, subscriptions } from "../data/sideBarItems";
import { useSideBar } from "../contexts/SideBarProvider";
import { HeaderTopSection } from "./Header";

export const SideBar = () => {
  const { isLargeOpen, isSmallOpen, close } = useSideBar();

  return (
    <>
      <aside
        className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-0 ${
          isLargeOpen ? "lg:hidden" : "lg:flex"
        }`}
      >
        <SmallSideBarItem Icon={Home} title="Home" url="/" />
        <SmallSideBarItem Icon={Repeat} title="Shorts" url="/shorts" />
        <SmallSideBarItem
          Icon={Clapperboard}
          title="Subscriptions"
          url="/subscriptions"
        />
        <SmallSideBarItem Icon={Library} title="Library" url="/library" />
      </aside>
      {isSmallOpen && (
        <div
          onClick={close}
          className="fixed inset-0 lg:hidden z-[999] bg-secondary-dark opacity-50"
        ></div>
      )}
      <aside
        className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 mb-8 ${
          isLargeOpen ? "lg:flex" : "lg:hidden"
        } ${isSmallOpen ? "flex z-[999] bg-white max-h-screen" : "hidden"}`}
      >
        <div className={`lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white`}>
          <HeaderTopSection />
        </div>
        <LargeSideBarSection>
          <LargeSideBarItem isActive IconOrImgUrl={Home} title="Home" url="/" />
          <LargeSideBarItem
            IconOrImgUrl={Clapperboard}
            title="Subscriptions"
            url="/subscriptions"
          />
        </LargeSideBarSection>
        <hr /> {/* Acts as a divider between sections */}
        <LargeSideBarSection visibleItemCount={5}>
          <LargeSideBarItem
            IconOrImgUrl={Library}
            title="Library"
            url="/Library"
          />
          <LargeSideBarItem
            IconOrImgUrl={History}
            title="History"
            url="/History"
          />
          <LargeSideBarItem
            IconOrImgUrl={PlaySquare}
            title="Your Videos"
            url="/your-videos"
          />
          <LargeSideBarItem
            IconOrImgUrl={Clock}
            title="Watch Later"
            url="/playlist?list=WL"
          />
          {playlists.map((playlist) => {
            return (
              <LargeSideBarItem
                key={playlist.id}
                IconOrImgUrl={ListVideo}
                title={playlist.name}
                url={`/playlist?list=${playlist.id}`}
              />
            );
          })}
        </LargeSideBarSection>
        <hr />
        <LargeSideBarSection title="Subscriptions">
          {subscriptions.map((subscription) => {
            return (
              <LargeSideBarItem
                key={subscription.id}
                IconOrImgUrl={subscription.imgUrl}
                title={subscription.channelName}
                url={`/@${subscription.id}`}
              />
            );
          })}
        </LargeSideBarSection>
        <hr />
        <LargeSideBarSection title="Explore">
          <LargeSideBarItem
            IconOrImgUrl={Flame}
            title="Trending"
            url="/trending"
          />
          <LargeSideBarItem
            IconOrImgUrl={ShoppingBag}
            title="Shopping"
            url="/shopping"
          />
          <LargeSideBarItem IconOrImgUrl={Music2} title="Music" url="/music" />
          <LargeSideBarItem
            IconOrImgUrl={Film}
            title="Movies & TV"
            url="/movies-tv"
          />
          <LargeSideBarItem IconOrImgUrl={Radio} title="Live" url="/live" />
          <LargeSideBarItem
            IconOrImgUrl={Gamepad2}
            title="Gaming"
            url="/gaming"
          />
          <LargeSideBarItem IconOrImgUrl={Newspaper} title="News" url="/news" />
          <LargeSideBarItem
            IconOrImgUrl={Trophy}
            title="Sports"
            url="/sports"
          />
          <LargeSideBarItem
            IconOrImgUrl={Lightbulb}
            title="Learning"
            url="/learning"
          />
          <LargeSideBarItem
            IconOrImgUrl={Shirt}
            title="Fashion & Beauty"
            url="/fashion-beauty"
          />
          <LargeSideBarItem
            IconOrImgUrl={Podcast}
            title="Podcasts"
            url="/podcasts"
          />
        </LargeSideBarSection>
      </aside>
    </>
  );
};

interface SmallProps {
  Icon: ElementType;
  title: string;
  url: string;
}

function SmallSideBarItem({ Icon, title, url }: SmallProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyle({ buttonType: "noBackground" }),
        "py-4 px-1 flex flex-col items-center rounded-lg gap-1"
      )}
    >
      <Icon className="w-6 h-6" />
      <div className="text-sm">{title}</div>
    </a>
  );
}

interface LargeSectionProps {
  children: ReactNode;
  title?: string; // ? means there could not be any title give as prop
  visibleItemCount?: number;
}

function LargeSideBarSection({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
}: LargeSectionProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const childrenArray = React.Children.toArray(children).flat();
  const visibleChildren = isExpanded
    ? childrenArray
    : childrenArray.slice(0, visibleItemCount);
  const showExpandButton = childrenArray.length > visibleItemCount;
  const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;
  return (
    <div>
      {title && (
        <div className="mt-2 mb-1 ml-4 text-lg text-justify">{title}</div>
      )}
      {visibleChildren}
      {showExpandButton && (
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          buttonType="noBackground"
          className="flex items-center w-full gap-4 p-3 rounded-lg"
        >
          <ButtonIcon className="w-6 h-6" />
          <div>{isExpanded ? "Show Less" : "Show More"}</div>
        </Button>
      )}
    </div>
  );
}

interface LargeProps {
  IconOrImgUrl: ElementType | string;
  title: string;
  url: string;
  isActive?: boolean;
}

function LargeSideBarItem({
  IconOrImgUrl,
  title,
  url,
  isActive = false,
}: LargeProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyle({ buttonType: "noBackground" }),
        `w-full flex items-center rounded-lg gap-4 p-3 ${
          isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined
        }`
      )}
    >
      {typeof IconOrImgUrl === "string" ? (
        <img
          src={IconOrImgUrl}
          alt="Channel Profile Picture"
          className="w-6 h-6 rounded-full"
        />
      ) : (
        <IconOrImgUrl className="w-6 h-6" />
      )}

      <div className="overflow-hidden whitespace-nowrap text-ellipsis">
        {title}
      </div>
    </a>
  );
}
