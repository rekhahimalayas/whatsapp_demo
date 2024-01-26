const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
	cors: { origin: [] },
});

let users: any = {};

io.on("connection", (socket: any) => {
	users[socket.handshake.query.user] = socket.id;
	io.emit("users", users);

	socket.on("message", (data: any) => io.to(data.user).emit("message", data));

	socket.on("clear", () => {
		users = {};
		io.emit("users", users);
	});

	socket.on("disconnect", () => console.log(`User disconnected ${socket.id}`));
});

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
