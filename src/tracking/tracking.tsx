import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import localLog from "./localLog";

export const usePageTracking = (): void => {
  const location = useLocation();

  useEffect(() => {
    localLog("Tracking page view", location.pathname + location.search);

    window.ga("event", "page_view", {
      page_path: location.pathname + location.search + location.hash,
      page_search: location.search,
      page_hash: location.hash,
    });
  }, [location]);
};

//window.ga or window.gtag? https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/google.analytics/google.analytics-tests.ts
