import { Socket } from "socket.io";

import { worldFactory } from "@utils/factory/worldFactory";
import { Users } from "@utils/users";

import world1 from "../worlds/world1.json";

export const joinInFirstRoom = (
  socket: Socket,
  callback: (props: any) => any
) => {
  const users = Users.getInstance();
  socket.join("fistRoom");
  const world = worldFactory(world1);
  if (!world.initialSpawn) {
    throw new Error("missing initial Spawn");
  }

  callback({
    myCurrentWorld: world,
    initialUsersPositions: [...users.users],
  });

  const newUser = {
    id: socket.id,
    x: world?.initialSpawn?.x ?? 0,
    y: world?.initialSpawn?.y ?? 0,
  };
  users.addUser(newUser);
  socket.to("fistRoom").emit("aNewUserEnterInRoom", newUser);
};
