import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user";
import { Button, User } from "@nextui-org/react";
import { Popups, usePopups } from "../../hooks/usePopups";
import { getUserCreationDate, userInitials } from "../../services/helpers";
import PropTypes from "prop-types";

export function UserProfile({ userActivities }) {
  const { userData } = useContext(UserContext);
  const [userSince, setUserSince] = useState("");

  const { togglePopup } = usePopups();

  useEffect(() => {
    if (userData.created_at) {
      const year = userData.created_at.slice(0, 4);
      const month = userData.created_at.slice(5, 7);

      setUserSince(getUserCreationDate(year, month));
    }
  }, [userData.created_at]);

  return (
    <section className="flex-none sticky top-[4rem] h-[20em] z-40 px-[1em]">
      <header className="flex items-center gap-[30px]">
        <User
          name={`${userData.name} ${userData.surname}`}
          description={`@${userData.username}`}
          classNames={{
            name: "text-[1.3em] font-light",
            base: "gap-[20px]",
            description: "text-[.97em] text-primary font-extralight",
          }}
          avatarProps={{
            src: userData.avatar || undefined,
            name: userInitials(userData.name, userData.surname),
            isBordered: true,
            classNames: {
              base: "w-[60px] h-[60px]",
              name: "text-[20px] font-extralight",
            },
          }}
        />
      </header>
      <main className="flex flex-col gap-[.5em] py-[2em]">
        <span className="flex gap-[5px] items-end text-[.9em]">
          <p>{!userActivities ? 0 : userActivities.length}</p>
          <p className="font-bold mr-[1em]">Actividades</p>
          <p>0</p>
          <p className="font-bold mr-[1em]">Publicaciones</p>
          <p>
            {!userData.followers || !userData.followers.entries
              ? 0
              : userData.followers.length}
          </p>
          <p className="font-bold mr-[1em]">Seguidores</p>
          <p>
            {!userData.follows || !userData.follows.entries
              ? 0
              : userData.follows.length}
          </p>
          <p className="font-bold">Seguidos</p>
        </span>
        <span className="ml-[.6em] flex flex-col gap-[8px]">
          <p className="text-[.85em] text-[#8c8c8c]">{userSince}</p>
          <p className="text-[.95em]">{userData.biography}</p>
        </span>
      </main>
      <footer className="flex items-center">
        <Button
          size="sm"
          onPress={() => togglePopup(Popups.Edit)}
          color="secondary"
          variant="flat"
        >
          Editar Perfil
        </Button>
      </footer>
    </section>
  );
}
UserProfile.propTypes = {
  userActivities: PropTypes.array.isRequired,
};
