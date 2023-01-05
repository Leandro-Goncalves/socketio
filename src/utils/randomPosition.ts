export const randomPosition = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

interface IRandom2dPosition {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export const random2dPosition = ({
  minX,
  maxX,
  minY,
  maxY,
}: IRandom2dPosition) => {
  const randomX = randomPosition(minX, maxX);
  const randomY = randomPosition(minY, maxY);

  return {
    x: randomX,
    y: randomY,
  };
};
