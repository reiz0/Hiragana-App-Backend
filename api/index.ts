import express from "express";
import { createServer } from "http";
import mongoose from "mongoose";
import { UserRouter } from "./routes/users.routes";
import "dotenv/config";

const uri = process.env.MONGO_URI;

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", UserRouter);
app.get("/", (req, res) => res.redirect("/user/66c557fb7218ac869ac8d252"));

if (uri) {
  mongoose.connect(uri).catch((reason) => {
    console.log("filed connecting database", reason);
  });
}



server.listen(process.env.PORT, () =>
  console.log(`[Server]: http://${process.env.HOST}:${process.env.PORT}`)
);

module.exports = app;