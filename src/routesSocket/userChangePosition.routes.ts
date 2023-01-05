import { Socket } from "socket.io";

import { IUser, Users } from "@utils/users";

export const UserChangePosition = (
  socket: Socket,
  { id, x, y, animationName }: IUser
) => {
  const users = Users.getInstance();
  const currentUser = users.getUser(socket.id);
  currentUser.x = x;
  currentUser.y = y;
  currentUser.animationName = animationName;

  socket.to("fistRoom").emit("updatePositions", {
    id,
    x,
    y,
    animationName,
  });
};
