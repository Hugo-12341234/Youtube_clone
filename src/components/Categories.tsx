import { useState, useRef } from "react";
import { Button } from "./Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Categories {
  categories: string[] | null;
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

const TRANSLATE = 300;

export const Categories = ({
  categories,
  activeCategory,
  onSelectCategory,
}: Categories) => {
  const [translate, setTranslate] = useState(0);
  const [isLeftVisible, setIsLeftVisible] = useState<boolean>(false);
  const [isRightVisible, setIsRightVisible] = useState<boolean>(true);
  const containerLength = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerLength} className="relative overflow-x-hidden">
      <div
        className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]"
        style={{ transform: `translateX(-${translate}px)` }}
      >
        {categories?.map((category, id) => {
          return (
            <Button
              key={id}
              buttonType={activeCategory === category ? "dark" : "default"}
              className="px-3 py-1 rounded-lg whitespace-nowrap"
              onClick={() => onSelectCategory(category)}
            >
              {category}
            </Button>
          );
        })}
      </div>
      {isLeftVisible && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full">
          <Button
            buttonType="noBackground"
            size="icon"
            className="h-full aspect-square w-auto p-1.5"
            onClick={() => {
              setTranslate((translate) => {
                setIsRightVisible(true);

                const newTranslate = translate - TRANSLATE;
                if (newTranslate <= 0) {
                  setIsLeftVisible(false);
                  return 0;
                }
                return newTranslate;
              });
            }}
          >
            <ChevronLeft />
          </Button>
        </div>
      )}
      {isRightVisible && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full flex justify-end">
          <Button
            buttonType="noBackground"
            size="icon"
            className="h-full aspect-square w-auto p-1.5"
            onClick={() => {
              setTranslate((translate) => {
                if (containerLength.current == null) {
                  return translate; // Because that means there's an error somewhere and my container doesn't exist anymore
                }
                const newTranslate = translate + TRANSLATE;
                const arrayWidth = containerLength.current.scrollWidth; // Determines what my current container's full width is (even the hidden overflow part)

                const clientWidth = containerLength.current.clientWidth; // Determines the width of the dive that the user sees on the screen

                setIsLeftVisible(true);

                if (newTranslate + clientWidth >= arrayWidth) {
                  setIsRightVisible(false);
                  return arrayWidth - clientWidth;
                }

                return newTranslate;
              });
            }}
          >
            <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
};
