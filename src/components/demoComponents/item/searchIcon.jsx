import React from 'react';

const SearchIcon = ({ color }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.25 15.75C13.7353 15.75 15.75 13.7353 15.75 11.25C15.75 8.76472 13.7353 6.75 11.25 6.75C8.76472 6.75 6.75 8.76472 6.75 11.25C6.75 13.7353 8.76472 15.75 11.25 15.75Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.25 17.25L15 15"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="1"
        y="1"
        width="22"
        height="22"
        rx="7"
        stroke="white"
        strokeWidth="2"
      />
    </svg>
  );
};

export default SearchIcon;