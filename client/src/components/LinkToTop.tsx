import { MouseEventHandler, ReactNode } from "react";
import { Link } from "react-router-dom";
import { useNavigateToTop } from "../hooks/useNavigateToTop";

interface Props {
  children: ReactNode;
  className?: string;
  to: string;
}

export const LinkToTop = (props: Props) => {
  const navigateToTop = useNavigateToTop();

  const navigateAndReset: MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();
    navigateToTop(props.to);
  };

  return (
    <Link className={props.className} onClick={navigateAndReset} to={props.to}>
      {props.children}
    </Link>
  );
};