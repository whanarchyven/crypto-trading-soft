export const getRandomValue = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};
