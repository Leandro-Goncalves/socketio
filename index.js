import express from "express";
const app = express();
// import world1 from  assert { type: "json" };
import { worldFactory } from "./factory/worldFactory.js";
import { createRequire } from "module";

app.use(express.json());

import Http from "http";
const http = Http.createServer();

import { Server } from "socket.io";
const io = new Server(http, {
  cors: { origin: "*" },
});

const users = new Set();

const removeUserToArray = (userId) => {
  const currentUser = Array.from(users).find((e) => e.id === userId);
  return users.delete(currentUser);
};

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    removeUserToArray(socket.id);
    io.emit("disconnectUser", socket.id);
  });

  socket.on("joinInFirstRoom", (callback) => {
    const require1 = createRequire(import.meta.url);
    const world1 = require1("./worlds/world1.json");
    socket.join("fistRoom");
    const world = worldFactory(world1);

    const newUser = {
      id: socket.id,
      x: world?.initialSpawn?.x ?? 0,
      y: world?.initialSpawn?.y ?? 0,
    };
    callback({
      myCurrentWorld: world,
      initialUsersPositions: [...users],
    });

    users.add(newUser);

    socket.to("fistRoom").emit("aNewUserEnterInRoom", newUser);
  });

  socket.on("sendMessage", (message) => {
    socket.to("fistRoom").emit("userSendMessage", { message, id: socket.id });
  });

  socket.on("userChangePosition", ({ id, x, y }) => {
    const currentUser = Array.from(users).find((e) => e.id === id);
    currentUser.x = x;
    currentUser.y = y;

    socket.to("fistRoom").emit("updatePositions", {
      id,
      x,
      y,
    });
  });
});

http.listen(3000, () => console.log("Run on port 3000"));
