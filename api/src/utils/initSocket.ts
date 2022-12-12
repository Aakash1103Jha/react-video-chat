import { Server } from "socket.io";
import { server } from "./initApp";

export const io = new Server(server, { cors: { origin: "*" } });
