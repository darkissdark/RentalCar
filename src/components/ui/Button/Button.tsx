import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary";

interface BaseButtonProps {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
}

interface ButtonAsButtonProps
  extends BaseButtonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  as?: "button";
}

interface ButtonAsLinkProps
  extends BaseButtonProps,
    Omit<LinkProps, "className" | "children"> {
  as: "link";
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

export function Button(props: ButtonProps) {
  const { variant = "primary", className = "", children, ...restProps } = props;
  const classes = [styles[variant], className].filter(Boolean).join(" ");

  if ("as" in restProps && restProps.as === "link") {
    const { ...linkProps } = restProps;
    return (
      <Link className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...restProps}>
      {children}
    </button>
  );
}

export default Button;
