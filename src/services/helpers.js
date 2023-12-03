const MONTH_NAMES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

export const getUserCreationDate = (year, month) => {
    const dateObject = new Date(`01/${month}/${year}`)

    return `Usuario desde ${MONTH_NAMES[dateObject.getMonth()]} de ${year}`
}

export const formatAvtivityDate = (date) => {
  const parts = date.split('-');
  const newDate = new Date(parts[0], parts[1] - 1, parts[2]);

  const day = newDate.getDate();
  const month = MONTH_NAMES[newDate.getMonth()];
  const year = newDate.getFullYear();

  return `${day} de ${month} de ${year}`;
}