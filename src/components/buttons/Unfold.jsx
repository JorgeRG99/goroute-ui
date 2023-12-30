import PropTypes from "prop-types";

export function Unfold({ isUnfolded, setIsUnfolded }) {
  const handleToggleFold = () => setIsUnfolded(!isUnfolded);

  return (
    <button className="text-secondary" onClick={handleToggleFold}>
      {isUnfolded ? "Leer menos..." : "Leer más..."}
    </button>
  );
}

Unfold.propTypes = {
  isUnfolded: PropTypes.bool.isRequired,
  setIsUnfolded: PropTypes.func.isRequired,
};
