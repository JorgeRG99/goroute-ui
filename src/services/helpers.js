const MONTH_NAMES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

export const ACTIVITY_HOURS = ["08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22"]
export const ACTIVITY_MINUTES = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"]

export const getUserCreationDate = (year, month) => {
  const dateObject = new Date(`01/${month}/${year}`)

  return `Usuario desde ${MONTH_NAMES[dateObject.getMonth()]} de ${year}`
}

export const formatActivityDate = (date) => {
  const parts = date.split('-');
  const newDate = new Date(parts[0], parts[1] - 1, parts[2]);

  const day = newDate.getDate();
  const month = MONTH_NAMES[newDate.getMonth()];
  const year = newDate.getFullYear();

  return `${day} de ${month} de ${year}`;
}

export const userInitials = (name, surname) => {
  return `${name[0]}${surname[0]}`.toUpperCase()
}