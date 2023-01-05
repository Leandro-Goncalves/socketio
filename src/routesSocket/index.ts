import http from "http";
import { Server } from "socket.io";

import { IUser, Users } from "@utils/users";

import { joinInFirstRoom } from "./joinInFirstRoom.routes";
import { UserChangePosition } from "./userChangePosition.routes";
import { UserSendMessage } from "./userSendMessage.routes";

export const RouterSocket = (server: http.Server) => {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    const users = Users.getInstance();
    socket.on("joinInFirstRoom", (callback) =>
      joinInFirstRoom(socket, callback)
    );

    socket.on("sendMessage", (message) => UserSendMessage(socket, message));

    socket.on("userChangePosition", (user: IUser) =>
      UserChangePosition(socket, user)
    );

    socket.on("disconnect", () => {
      users.removeUser(socket.id);
      io.emit("disconnectUser", socket.id);
    });
  });
};
