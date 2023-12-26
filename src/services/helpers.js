const MONTH_NAMES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

export const ACTIVITY_HOURS = ["08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22"]
export const ACTIVITY_MINUTES = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"]

const softColors = [
  "#FFC3A0",
  "#FFB7B2",
  "#AED9E0",
  "#B5EAD7",
  "#FFDAC1",
  "#B5EAD7",
  "#FFB6B9",
  "#A7C5EB",
  "#FFC8A2",
  "#D0ECEA",
  "#FFC3A0",
  "#FFB7B2",
  "#AED9E0",
  "#B5EAD7",
  "#FFDAC1",
  "#B5EAD7",
  "#FFB6B9",
  "#A7C5EB",
  "#FFC8A2",
  "#D0ECEA",
  "#FFC3A0",
  "#FFB7B2",
  "#AED9E0",
  "#B5EAD7",
  "#FFDAC1",
  "#B5EAD7",
  "#FFB6B9",
  "#A7C5EB",
  "#FFC8A2",
  "#D0ECEA" 
];

export const getUserCreationDate = (date) => {
  const parts = date.split('-');
  const dateObject = new Date(parts[0], parts[1] - 1, parts[2])
  
  const month = MONTH_NAMES[dateObject.getMonth()];
  const year = dateObject.getFullYear();

  return `Usuario desde ${month} de ${year}`
}

export const formatActivityDate = (date) => {
  const parts = date.split('-');
  const newDate = new Date(parts[0], parts[1] - 1, parts[2]);

  const day = newDate.getDate();
  const month = MONTH_NAMES[newDate.getMonth()];
  const year = newDate.getFullYear();

  return `${day} ${month} ${year}`;
}

export const formatActivityDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60); 
  
  if(minutes === 0) return `${hours} horas`
  if(hours === 0) return `${minutes} minutos`

  return `${hours}h ${minutes}m`;
}

export const userInitials = (name, surname) => {
  return `${name[0]}${surname[0]}`.toUpperCase()
}

export const randomProfileColorPicker = () => {
  const randomIndex = Math.floor(Math.random() * softColors.length);
  return softColors[randomIndex];
}

export const daysUntilTargetDate = (date) => {
  const targetDate = new Date(date);
  const currentDate = new Date();

  const timeDifference = targetDate.getTime() - currentDate.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

  if (daysDifference <= 30) {
      return `Quedan ${daysDifference + (daysDifference === 1 ? " día" : " días")}`;
  } 
  else if (daysDifference <= 365) {
      const months = Math.floor(daysDifference / 30);
      return `dentro de ${months} mes${months > 1 ? 'es' : ''}`;
  } 
  else {
      const years = Math.floor(daysDifference / 365);
      return `dentro de ${years} año${years > 1 ? 's' : ''}`;
  }
}

export const getActivitySport = (sportId, sports) => {
  const sport = sports.find((sport) => sport.id === sportId);

  return sport.name;
};