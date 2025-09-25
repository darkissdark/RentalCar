import { Link, type LinkProps } from "react-router-dom";
import styles from "../Button/Button.module.css";

type ButtonVariant = "primary" | "secondary";

interface LinkButtonProps extends Omit<LinkProps, "className"> {
  variant?: ButtonVariant;
  className?: string;
}

export function LinkButton({
  variant = "primary",
  className = "",
  children,
  ...props
}: LinkButtonProps) {
  const classes = [styles[variant], className].filter(Boolean).join(" ");

  return (
    <Link className={classes} {...props}>
      {children}
    </Link>
  );
}

export default LinkButton;
