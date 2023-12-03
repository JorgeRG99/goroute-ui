import SportImage from "../assets/sport.webp";
import { Button } from "@nextui-org/button";
import { Popups, usePopups } from "../hooks/usePopups";

export const GetStarted = () => {
  const { togglePopup } = usePopups();

  return (
    <section className="w-full h-[90vh] flex items-center justify-center">
      <span className="flex flex-col items-center justify-center gap-[1em] w-[40%]">
        <h1 className="font-[Kanit] text-[6em] text-[#508561]">GoRoute</h1>
        <p className="text-[1.2em]">Elevamos el juego, creamos recuerdos</p>
        <Button
          onPress={() => togglePopup(Popups.Login)}
          color="secondary"
          variant="shadow"
        >
          Get Started
        </Button>
      </span>
      <img className="w-[40%]" src={SportImage} alt="" />
    </section>
  );
};
