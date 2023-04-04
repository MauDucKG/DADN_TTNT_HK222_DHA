const app = require("express")();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRouter = require("./user/user.router");
const adminRouter = require("./admin/admin.router");
const lockRouter = require("./lock/lock.router");
const allowRouter = require("./allow/allow.router");
const historyRouter = require("./history/history.router");
const http = require("http").createServer(app);
const cors = require("cors");
const request = require("request");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require("dotenv").config();

const mongoDB_url =
  "mongodb+srv://mauduckg:mauduckg@cluster0.liowy3n.mongodb.net/test";
mongoose
  .connect(mongoDB_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err));

http.listen(4000, function () {
  console.log("listening on port 4000");
});

const feedUrl =
  "https://io.adafruit.com/api/v2/mauduckg/feeds/welcome-feed/data/last";
const options = {
  headers: {
    "X-AIO-Key": "aio_LBxX23hKr9V1PhAYI9qz8PKmFsh6",
  },
};

request.get(feedUrl, options, async (error, response, body) => {
  if (error) {
    console.log("Error:", error);
    response.status(500).send(error);
  } else {
    // const newhistory = JSON.parse(body);
    // const newHistory = new historyModel({
    //   name: newhistory.name,
    //   description: newhistory.description,
    //   key: newhistory.key,
    //   created_at: newhistory.created_at,
    //   updated_at: newhistory.updated_at,
    // });
    // try {
    //   await newHistory.save();
    //   console.log("Feed saved:", newHistory);
    // } catch (error) {
    //   console.log("Error saving feed:", error);
    // }
  }
});

const mqtt = require("mqtt");

// Kết nối MQTT với Adafruit IO
const client = mqtt.connect("mqtt://io.adafruit.com", {
  username: "mauduckg",
  password: "aio_LBxX23hKr9V1PhAYI9qz8PKmFsh6",
});

// Xác nhận kết nối thành công
client.on("connect", () => {
  console.log("Connected to Adafruit IO MQTT");
});

// Đăng ký các chủ đề (topics) để nhận dữ liệu mới
client.subscribe("mauduckg/feeds/welcome-feed");
client.on("message", (topic, message) => {
  console.log("Received new data:", message.toString());
  request.get(feedUrl, options, async (error, response, body) => {
    if (error) {
      console.log("Error:", error);
      response.status(500).send(error);
    } else {
      const newFeed = JSON.parse(body);
      console.log(newFeed)
      const newfeed = new Feed({
        value: newFeed.value,
        created_at: newFeed.created_at,
      });
      try {
        await newfeed.save();
        console.log("Feed saved:", newfeed);
      } catch (error) {
        console.log("Error saving feed:", error);
      }
    }
  });
});

app.use(cors());
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/lock", lockRouter);
app.use("/allow", allowRouter);
app.use("/history", historyRouter);

const Schema = mongoose.Schema;

const feedSchema = new Schema({
  value: { type: String, required: true },
  created_at: { type: Date, required: true, unique: true },
});

const Feed = mongoose.model("Feed", feedSchema);

module.exports = Feed;
