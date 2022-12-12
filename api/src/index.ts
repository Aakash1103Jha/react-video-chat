require("regenerator-runtime");
require("dotenv/config");

import { server } from "./utils/initApp";
import { io } from "./utils/initSocket";
import { EVENTS } from "./constants/events";

const PORT = process.env.PORT || 4003;

io.on(EVENTS.CONNECTION, (socket) => {
	socket.emit("me", socket.id);

	socket.on(EVENTS.NEW_CALL, (data) => {
		io.to(data.userToCall).emit(EVENTS.NEW_CALL, { signal: data.signalData, from: data.from, name: data.name });
	});

	socket.on(EVENTS.ANSWER_CALL, (data) => {
		io.to(data.to).emit(EVENTS.CALL_ACCEPTED, data.signal);
	});

	socket.on(EVENTS.DISCONNECT, () => {
		socket.broadcast.emit(EVENTS.CALL_ENDED);
	});
});

server.listen(PORT, () => console.info(`Server running on port ${PORT}`));

export default server;
