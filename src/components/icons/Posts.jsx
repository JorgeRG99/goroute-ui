import PropTypes from "prop-types";

export function Posts({ color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="23"
      viewBox="0 0 384 512"
    >
      <path
        fill={color}
        d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"
      />
    </svg>
  );
}
Posts.propTypes = {
  color: PropTypes.string.isRequired,
};
