import "./App.css";
import { Header } from "./components/Header";
import { Categories } from "./components/Categories";
import { categories, videos } from "./data/home";
import { useState } from "react";
import { VideoGridItem } from "./components/VideoGridItem";
import { SideBar } from "./components/SideBar";
import { SideBarProvider } from "./contexts/SideBarProvider";

// overflow-auto allows that div to scroll down while the other components stay static, independant scrolling for each component

function App() {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);

  return (
    <SideBarProvider>
      <div className="max-h-screen flex flex-col fixed">
        <Header />
        <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
          <SideBar />
          <div className="overflow-x-hidden px-8 pb-4">
            <div className="sticky top-0 bg-white z-10 pb-4">
              <Categories
                categories={categories}
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
              />
            </div>
            {/* The css in the next div is basically saying that I want this grid to auto-fill with items when there's space to do it. Never have an item smaller than 300px but put more items on each row if there's space for it. The max size of each item is 1 fraction of the column, that way u can add more without growing the sizes of the items */}
            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
              {videos.map((video) => {
                return (
                  <VideoGridItem
                    id={video.id}
                    title={video.title}
                    channel={video.channel}
                    views={video.views}
                    postedAt={video.postedAt}
                    duration={video.duration}
                    thumbnailUrl={video.thumbnailUrl}
                    videoUrl={video.videoUrl}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </SideBarProvider>
  );
}

export default App;
