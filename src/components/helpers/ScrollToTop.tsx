import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type Props = {
  children: JSX.Element;
};

const ScrollToTop = ({ children }: Props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{children}</>;
};

export default ScrollToTop;
