import { Socket } from "socket.io";

export const UserSendMessage = (socket: Socket, message: string) => {
  socket.to("fistRoom").emit("userSendMessage", { message, id: socket.id });
};
