import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

export default function OthersNoPublications({ type }) {
  const { username } = useParams();

  return (
    <span className="w-[90%] flex flex-col items-center gap-[1em] pt-[4em]">
      <h2>
        <span className="text-primary text-semibold">{`@${username}`}</span>
        {` aún no tiene ${type} publicadas :(`}
      </h2>
    </span>
  );
}

OthersNoPublications.propTypes = {
  type: PropTypes.string.isRequired,
};
