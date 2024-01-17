import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface SideBarProviderProps {
  children: ReactNode;
}

// I need both large and small open because the sideBar toggling acts differently whether its a large screen or a small screen
interface SideBarType {
  isLargeOpen: boolean;
  isSmallOpen: boolean;
  toggle: () => void;
  close: () => void;
}

const SideBarContext = createContext<SideBarType | null>(null);

export function useSideBar() {
  const value = useContext(SideBarContext);
  if (value == null) throw Error("Not inside SideBarProvider"); // Have to put this line for everything to work
  return value;
} // This function means I can retrieve all 4 values/functions anywhere in my project (inside the provider) and runs the functions which will run the code written here

export function SideBarProvider({ children }: SideBarProviderProps) {
  const [isLargeOpen, setIsLargeOpen] = useState<boolean>(true);
  const [isSmallOpen, setIsSmallOpen] = useState<boolean>(false);

  useEffect(() => {
    const handler = () => {
      if (!isScreenSmall()) {
        setIsSmallOpen(false);
      }
    };

    window.addEventListener("resize", handler);

    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);

  function isScreenSmall() {
    return window.innerWidth < 1024;
  }

  function toggle() {
    if (isScreenSmall()) {
      setIsSmallOpen(!isSmallOpen);
    } else {
      setIsLargeOpen(!isLargeOpen);
    }
  }

  function close() {
    if (isScreenSmall()) {
      setIsSmallOpen(false);
    } else {
      setIsLargeOpen(false);
    }
  }

  return (
    <SideBarContext.Provider
      value={{
        isLargeOpen,
        isSmallOpen,
        toggle,
        close,
      }}
    >
      {children}
    </SideBarContext.Provider>
  );
}
