const app = require("express")();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRouter = require("./user/user.router");
const adminRouter = require("./admin/admin.router");
const lockRouter = require("./lock/lock.router");
const allowRouter = require("./allow/allow.router");
const historyRouter = require("./history/history.router");
const historyModel = require("./history/history.model");
const userModel = require("./user/user.model");
const adminModel = require("./admin/admin.model");
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
  "https://io.adafruit.com/api/v2/minhduco19/feeds/detect-raw/data";
const options = {
  headers: {
    "X-AIO-Key": "aio_fZSE33xOwNlN3MtYt1XWDcrHr6WJ",
  },
};

const feedUrl1 =
  "https://io.adafruit.com/api/v2/minhduco19/feeds/hardware-status.lock-status/data";

const mqtt = require("mqtt");
// Kết nối MQTT với Adafruit IO
const client = mqtt.connect("mqtt://io.adafruit.com", {
  username: "minhduco19",
  password: "aio_fZSE33xOwNlN3MtYt1XWDcrHr6WJ",
});

// Xác nhận kết nối thành công
client.on("connect", () => {
  console.log("Connected to Adafruit IO MQTT");
});

// Đăng ký các chủ đề (topics) để nhận dữ liệu mới
client.subscribe("minhduco19/feeds/detect-raw");
client.on("message", (topic, message) => {
  console.log("Received new data:", message.toString());
  request.get(feedUrl, options, async (error, response, body) => {
    if (error) {
      console.log("Error:", error);
      response.status(500).send(error);
    } else {
      history = JSON.parse(body)[JSON.parse(body).length - 1];
      console.log(body);
      let parts = history.value.split(";");
      let name = parts[0];
      let status = parseInt(parts[1]);

      status = status === 1 ? true : false;
      if (status == false) {
        const newHistory = new historyModel({
          time: history.created_at,
          open: status,
          valid: status,
        });
        try {
          newHistory.save();
          console.log("Feed saved:", newHistory);
          io.emit("dataUpdated", { data: "new data" });
        } catch (error) {
          console.log("Error saving feed:", error);
        }
        return;
      }
      let userinfo = await userModel.findOne({ ten: name });
      let admininfo = await adminModel.findOne({ userID: userinfo._id });
      let dub = await historyModel.findOne({ time: history.created_at });
      if (dub) {
        console.log("Error saving feed");
        return;
      }

      if (userinfo._id && admininfo._id) {
        const newHistory = new historyModel({
          lockID: "642497aa1723b6f0a529046d",
          userID: userinfo._id,
          time: history.created_at,
          open: status,
          valid: status,
        });
        try {
          newHistory.save();
          console.log("Feed saved:", newHistory);
        } catch (error) {
          console.log("Error saving feed:", error);
        }
      }
    }
  });
});
const client1 = mqtt.connect("mqtt://io.adafruit.com", {
  username: "minhduco19",
  password: "aio_fZSE33xOwNlN3MtYt1XWDcrHr6WJ",
});

// Xác nhận kết nối thành công
client1.on("connect", () => {
  console.log("Connected to Adafruit IO MQTT");
});
client1.subscribe("minhduco19/feeds/hardware-status.lock-status");
client1.on("message", (topic, message) => {
  console.log("Received new data:", message.toString());
  request.get(feedUrl1, options, async (error, response, body) => {
    if (error) {
      console.log("Error:", error);
      response.status(500).send(error);
    } else {
      history = JSON.parse(body)[0];
      console.log(history);
      let status = parseInt(history.value);

      status = status === 1 ? true : false;
      if (status) {
        let dub = await historyModel.findOne({ time: history.created_at });
        if (dub) {
          console.log("Error saving feed");
          return;
        }
        const newHistory = new historyModel({
          lockID: "64377e558bdf9fac813f7086",
          adminID: "6434fb7eb392e124fed22d70",
          time: history.created_at,
          open: status,
          valid: false,
        });
        try {
          newHistory.save();
          console.log("Feed saved:", newHistory);
        } catch (error) {
          console.log("Error saving feed:", error);
        }
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

const client2 = mqtt.connect("mqtt://io.adafruit.com", {
  username: "minhduco19",
  password: "aio_fZSE33xOwNlN3MtYt1XWDcrHr6WJ",
});

// Xác nhận kết nối thành công
client2.on("connect", () => {
  console.log("Connected to Adafruit IO MQTT");
});
client2.subscribe("minhduco19/feeds/hardware-status.light-intensity");
var light_value = 0
client2.on("message", (topic, message) => {
  console.log("Received new data:", message.toString());
  light_value = parseInt(message.toString())
});
function handleRequest(req, res) {
  res.send({ light_value: light_value });
}

app.get("/lightvalue", handleRequest);
