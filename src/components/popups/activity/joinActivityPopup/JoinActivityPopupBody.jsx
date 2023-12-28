import { Divider } from "@nextui-org/react";
import { Clock } from "../../../icons/Clock";
import { getUserById } from "../../../../services/user";
import PropTypes from "prop-types";
import { useUserSessionStore } from "../../../../store/userSession";
import { Suspense, lazy, useEffect, useState } from "react";

const UserSmallCard = lazy(() => import("../../../cards/UserSmallCard"));

export function JoinActivityPopupBody({
  sport,
  hour,
  description,
  participants,
  max_participants,
  date,
  name,
  user_id,
}) {
  const [profileData, setProfileData] = useState(null);
  const authToken = useUserSessionStore((state) => state.authToken);

  useEffect(() => {
    const getProfileData = async () => {
      const data = await getUserById(authToken, user_id);

      setProfileData(data);
    };

    getProfileData();
  }, []);

  return (
    <>
      <span className="flex justify-between">
        <span className="font-light">
          <h2 className="text-black capitalize font-bold text-[1.1em]">
            {name}
          </h2>
          <h3 className="text-[0.9em]">{sport}</h3>
        </span>
        <span className="font-light">
          <h3 className="capitalize text-[1em]">{date}</h3>
          <span className="flex items-center justify-end gap-[.5em]">
            <h3 className="text-end text-[0.9em]">{hour.slice(0, 5)}</h3>
            <Clock />
          </span>
        </span>
      </span>
      <Divider />
      <div className="flex flex-col gap-[1.5em]">
        <p className="text-[1em]">{description}</p>
        <span className="flex justify-between text-[.9em]">
          <p>Participantes</p>
          <p className="font-extralight">
            {participants && participants.length} de {max_participants}{" "}
            participantes
          </p>
        </span>
        {profileData && (
          <Suspense>
            <UserSmallCard user={profileData} />
          </Suspense>
        )}
      </div>
    </>
  );
}

JoinActivityPopupBody.propTypes = {
  name: PropTypes.string.isRequired,
  sport: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  hour: PropTypes.string.isRequired,
  participants: PropTypes.array.isRequired,
  description: PropTypes.string.isRequired,
  max_participants: PropTypes.number.isRequired,
  user_id: PropTypes.string.isRequired,
};
