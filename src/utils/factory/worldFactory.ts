import { random2dPosition } from "@utils/randomPosition";

interface IObject {
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ITileLayer {
  data: string[];
  type: string;
}

interface IObjectLayer {
  type: string;
  objects?: IObject[];
}

type Layer = (ITileLayer | IObjectLayer)[];

interface IWorld {
  layers: Layer;
}

interface IWorldFactoryReturn extends IWorld {
  initialSpawn?: ReturnType<typeof random2dPosition>;
}

export const worldFactory = (world: IWorld): IWorldFactoryReturn => {
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

  return Object.fromEntries(newFactoryWorld) as IWorldFactoryReturn;
};

const findLayerByType = (layers: Layer, type: string): IObjectLayer => {
  return layers.find((l) => l.type === type) as IObjectLayer;
};

const findObjectByType = (objects: IObject[], type: string) => {
  return objects.find((o) => o.type === type);
};
