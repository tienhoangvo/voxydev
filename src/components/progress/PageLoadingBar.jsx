// @react/
import { useCallback, useEffect, useState } from "react";

// @mui/material
import LinearProgress from "@mui/material/LinearProgress";

// @next
import Router from "next/router";

const PageLoadingBar = () => {
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    let timerId;
    Router.events.on("routeChangeStart", () => {
      console.log("debug beforeHistoryChange");

      if (timerId) {
        clearTimeout(timerId);
      }

      setPageLoading(true);
    });

    Router.events.on("routeChangeComplete", () => {
      timerId = setTimeout(() => {
        setPageLoading(false);
      }, 300);
    });

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  const renderTopLoadingBar = useCallback(() => {
    return pageLoading ? (
      <LinearProgress
        sx={{
          position: "fixed",
          zIndex: (theme) => theme.zIndex.drawer + 2,
          width: "100%",

          ["& .MuiLinearProgress-bar"]: {
            transition: "none",
          },
        }}
      />
    ) : null;
  }, [pageLoading]);

  return <>{renderTopLoadingBar()}</>;
};

export default PageLoadingBar;
