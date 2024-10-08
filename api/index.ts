import express from "express";
// import { createServer } from "http";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import { QuizRouter } from "./routes/quiz.routes";
import { UserRouter } from "./routes/users.routes";

const uri = process.env.MONGO_URI;

const app = express();
// const server = createServer(app);
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", UserRouter);
app.use("/quiz", QuizRouter);
app.get("/", (req, res) => res.send("Express on Vercel"));

if (uri) {
  mongoose.connect(uri).catch((reason) => {
    console.log("filed connecting database", reason);
  });
}

app.listen(4000, () => console.log("Server ready on port 3000."));

// server.listen(process.env.PORT, () =>
//   console.log(`[Server]: http://${process.env.HOST}:${process.env.PORT}`)
// );

module.exports = app;
