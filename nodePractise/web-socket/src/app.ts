import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { Server, Socket } from "socket.io";

enum UserType {
  CUSTOMER = "customer",
  AGENT = "agent",
}

interface User {
  id: string;
  socket: Socket;
  type: "customer" | "agent";
  pairedWith?: string;
}

const users: Map<string, User> = new Map();

dotenv.config();
const app = express();
const PORT = process.env.PORT || 2999;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

io.on("connection", (socket: Socket) => {
  const { id } = socket;
  console.log(`New connection: ${id}`);

  socket.on("register", (type: User["type"]) => {
    console.log(`Register for type: ${type} id: ${id} socket:${socket}`);
    const user: User = {
      id,
      socket,
      type,
    };
    users.set(id, user);

    if (type === UserType.AGENT) {
      socket.emit("status", { message: "waiting for a customer..." });
    } else if (type === UserType.CUSTOMER) {
      pairCustomer(id);
    }
    console.log(
      `Register INIT with type : ${type} users: ${JSON.stringify(users.keys())}`
    );
  });

  socket.on("message", (data: { message: string }) => {
    const user = users.get(id);
    console.log(`Message by user: ${user}`);
    if (user?.pairedWith) {
      const pairedUser = users.get(user.pairedWith);
      if (pairedUser) {
        pairedUser.socket.emit("message", {
          sender: user.type,
          message: data.message,
          timeStamp: new Date().toISOString(),
        });

        socket.emit("message", {
          sender: user.type,
          message: data.message,
          timestamp: new Date().toISOString(),
        });
      }
    }
  });

  socket.on("disconnect", () => {
    const user = users.get(id);
    console.log(`Disconnected by user: ${user}`);
    if (user) {
      if (user.pairedWith) {
        const pairedUser = users.get(user.pairedWith);
        if (pairedUser) {
          pairedUser.socket.emit("status", {
            message: `${user.type} disconnected`,
          });
          pairedUser.pairedWith = undefined;
          if (pairedUser.type === UserType.AGENT) {
            // availableAgents.set(pairedUser.id, pairedUser);
            pairedUser.socket.emit("status", {
              message: "Waiting for a customer...",
            });
          }
        }
      }
      users.delete(id);
      console.log(`User disconnected: ${socket.id}`);
    }
  });
});

const pairCustomer = (customerID: string) => {
  const customer = users.get(customerID);
  if (!customer) return;

  if (availableAgents.size > 0) {
    const agentID = availableAgents.keys().next().value;
    if (agentID) {
      const agent = users.get(agentID);
      if (agent) {
        customer.pairedWith = agentID;
        agent.pairedWith = customerID;
        customer.socket.emit("status", { message: "Connected to an agent" });
        customer.socket.emit("status", { message: "Connected to a customer" });
      }
    }
  } else {
    customer.socket.emit("status", {
      message: "No agents available. Please wait ...",
    });
  }
};

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
