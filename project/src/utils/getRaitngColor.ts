export const getRaitingColor = (raiting: number): string => {
  if (raiting < 5) {
    return 'red';
  } else if (raiting < 7) {
    return 'gray';
  } else if (raiting < 8) {
    return 'green';
  } else {
    return 'gold';
  }
}
