import * as React from 'react';

const Play = (props) => (
  <svg
    height={24}
    viewBox="0 0 24 24"
    width={24}
    xmlns="http://www.w3.org/2000/svg"
    // eslint-disable-next-line
    {...props}
  >
    <path
      d="M5,21 L5,3 C5,2.20883421 5.87524596,1.73099262 6.54075759,2.15882152 L20.5407576,11.1588215 C21.1530808,11.5524579 21.1530808,12.4475421 20.5407576,12.8411785 L6.54075759,21.8411785 C5.87524596,22.2690074 5,21.7911658 5,21 Z M7,19.1683345 L18.1507426,12 L7,4.8316655 L7,19.1683345 Z"
      fillRule="evenodd"
    />
  </svg>
);
export default Play;
