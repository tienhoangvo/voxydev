// @react
import { useMemo } from "react";

// @next/
import { useRouter } from "next/router";

// @props-types
import PropTypes from "prop-types";

const useActivePath = ({ level = 0 }) => {
  const { pathname } = useRouter();

  console.log("PATHNAME", pathname);

  const activePath = useMemo(() => {
    if (!pathname) return "/";

    const index = level + 1;

    const paths = pathname.split("/");

    if (!paths[index]) return "/";

    return `/${paths[index]}`;
  }, [pathname]);

  return activePath;
};

useActivePath.PropTypes = {
  level: PropTypes.number.isRequired,
};

export default useActivePath;
