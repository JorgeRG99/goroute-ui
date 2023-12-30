export function TagTooltip() {
  return (
    <div className="flex flex-col gap-[1em] w-[30em] p-[1em]">
      <h3 className="text-[1em] font-semibold">¿Qué son los Tags?</h3>
      <p>
        Los tags o etiquetas son palabras clave que ayudan a categorizar y
        encontrar tus publicaciones más fácilmente.
      </p>
      <h3 className="text-[1em] font-semibold">¿Cómo usarlos?</h3>
      <p>
        Introduce los tags de forma continua, separándolos con el símbolo #. Por
        ejemplo: #Senderismo#Deporte#Futbol. Recuerda que cada tag debe empezar
        con # para que sea reconocido correctamente.
      </p>
    </div>
  );
}
