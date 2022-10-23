import express from "express";
const app = express();
import world1 from "./worlds/world1.json" assert { type: "json" };
import world2 from "./worlds/world2.json" assert { type: "json" };
import { worldFactory } from "./factory/worldFactory.js";
import cors from "cors";

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

app.post("/world2", (req, res) => {
  const { id } = req.body;
  const findMyUser = Object.entries(users).map(([key, value]) => {
    const level = value.find((user) => user.id === id);
    return level ?? {};
  })[0];

  console.log(users);
  console.log(users.level2);

  users = removeUserToArray(id);
  console.log(users);

  res.json({
    myCurrentWorld: world2,
    initialUsersPositions: users.level2.map((u) => ({
      id: u.id,
      x: u.x,
      y: u.y,
    })),
  });
});

http.listen(3000, () => console.log("Run on port 3000"));
