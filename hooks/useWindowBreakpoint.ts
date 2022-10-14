import { useEffect, useState } from "react";
import { ResolvableTo, ScreensConfig } from "tailwindcss/types/config";
import tailwindConfig from "../tailwind.config";

export const useWindowBreakpoint = () => {
  const [width, setWidth] = useState<number>();

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isCurrentBreakpoint = (breakpoint: string) => {
    const screensConfig = tailwindConfig.theme?.screens;
    if (screensConfig && width) {
      const breakpointValue = screensConfig[
        breakpoint as keyof ResolvableTo<ScreensConfig>
      ] as string;
      if (width > parseInt(breakpointValue.replace("px", ""))) {
        return true;
      } else {
        return false;
      }
    }
  };

  return {
    isCurrentBreakpoint,
  };
};
