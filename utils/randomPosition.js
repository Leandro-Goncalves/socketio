export const randomPosition = (min, max) => {
  return Math.random() * (max - min) + min;
};

export const random2dPosition = ({ minX, maxX, minY, maxY }) => {
  const randomX = randomPosition(minX, maxX);
  const randomY = randomPosition(minY, maxY);

  return {
    x: randomX,
    y: randomY,
  };
};
