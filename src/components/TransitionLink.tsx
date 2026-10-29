"use client";

import React from "react";
import { useTransition } from "./PageTransition";

interface TransitionLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "title"> {
  href: string;
  title: string;
  className?: string;
  children: React.ReactNode;
}

export default function TransitionLink({
  href,
  title,
  className = "",
  children,
  ...props
}: TransitionLinkProps) {
  const { transitionTo } = useTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    transitionTo(href, title);
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}
