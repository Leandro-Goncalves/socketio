import { random2dPosition } from "../utils/randomPosition.js";

export const worldFactory = (world) => {
  const newFactoryWorld = new Map(Object.entries(world));

  const myLayer = findLayerByType(world.layers, "objectgroup");
  if (myLayer) {
    const initialSpawn = findObjectByType(myLayer.objects, "initialSpawn");
    if (initialSpawn) {
      newFactoryWorld.set(
        "initialSpawn",
        random2dPosition({
          minX: initialSpawn.x,
          maxX: initialSpawn.x + initialSpawn.width,
          minY: initialSpawn.y,
          maxY: initialSpawn.y + initialSpawn.height,
        })
      );
    }
  }

  return Object.fromEntries(newFactoryWorld);
};

const findLayerByType = (layers, type) => {
  return layers.find((l) => l.type === type);
};

const findObjectByType = (objects, type) => {
  return objects.find((o) => o.type === type);
};
