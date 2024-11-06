export const getRaitingColor = (raitng: number): string => {
  if (raitng <= 5) {
    return 'red';
  } else if (raitng <= 7) {
    return 'gray';
  } else if (raitng <= 8) {
    return 'green';
  } else {
    return 'gold';
  }
}
