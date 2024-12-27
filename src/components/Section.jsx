import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const Section = ({ title, items, icons, className }) => {
  return (
    <div className={className}>
      <h2 className="text-lg md:text-xl font-semibold mb-1 text-blue-900 dark:text-[#c0d6e4]">
        {title}
      </h2>
      <ul className="list-none">
        {items.map((item, index) => (
          <li key={index} className="mb-1">
            <FontAwesomeIcon icon={icons[index]} className="mr-2 text-sm" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  icons: PropTypes.array.isRequired,
  className: PropTypes.string,
};

Section.defaultProps = {
  className: "",
};

export default Section;