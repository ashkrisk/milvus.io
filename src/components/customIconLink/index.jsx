import React from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import clsx from "clsx";
import * as styles from "./CustomIconLink.module.less";

export default function CustomIconLink(props) {
  const { to, customIcon, className = "", showIcon = true, children } = props;

  const Icon = customIcon || OpenInNewIcon;
  return (
    <a
      target="_blank"
      href={to}
      rel="noopener noreferrer"
      className={clsx("CustomIconLink", styles.link, className)}
    >
      {showIcon && (
        <span className={clsx("CustomIconLink-wrapper")}>
          <Icon className="CustomIconLink-icon" />
        </span>
      )}
      {children}
    </a>
  );
}
