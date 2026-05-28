export function formatDisplayDate(dateValue) {
  if (!dateValue) return "";

  const [year, month, day] = dateValue.split("-");
  if (!year || !month || !day) return dateValue;

  return `${day}/${month}/${year}`;
}

export function getTodayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}
