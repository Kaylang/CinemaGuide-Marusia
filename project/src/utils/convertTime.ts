export const convertToHours = (time: number): string => {
  const minutes = time % 60;
  const hours = (time - minutes) / 60;
  return (hours === 0 ? '' : `${hours} ч `) + (`${minutes} мин`);
}
