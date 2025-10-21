import { useCallback, useEffect, useState } from "react";

export const useResponsiveSidebar = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleResize = () => {
      const isMobile = window.innerWidth < 640;
      setIsMobileView(isMobile);
      setIsSidebarCollapsed(isMobile);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarCollapsed((prev) => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setIsSidebarCollapsed(true);
  }, []);

  const openSidebar = useCallback(() => {
    setIsSidebarCollapsed(false);
  }, []);

  return {
    isSidebarCollapsed,
    isMobileView,
    toggleSidebar,
    closeSidebar,
    openSidebar,
    setIsSidebarCollapsed,
  };
};
