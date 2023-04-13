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

const socketIO = require("socket.io");

const io = socketIO(http);

// khi có kết nối mới
io.on("connection", (socket) => {
  console.log("New client connected");

  // khi client ngắt kết nối
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

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
    "X-AIO-Key": "aio_ZXeO05Y8uFjn3rp9rxXkJKHSnQ4w",
  },
};

const mqtt = require("mqtt");
// Kết nối MQTT với Adafruit IO
const client = mqtt.connect("mqtt://io.adafruit.com", {
  username: "minhduco19",
  password: "aio_jnQg58mXPpvTfxkabPiB81iOhhES",
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
          io.emit("dataUpdated", {data: "new data"});
        } catch (error) {
          console.log("Error saving feed:", error);
        }
        return
      }
      let userinfo = await userModel.findOne({ ten: name });
      let admininfo = await adminModel.findOne({ userID: userinfo._id });
      let dub = await historyModel.findOne({time: history.created_at})
      if (dub) {
        console.log("Error saving feed")
        return
      }
    
      if (userinfo._id && admininfo._id) {
        const newHistory = new historyModel({
          lockID: "642497aa1723b6f0a529046d",
          userID: userinfo._id,
          adminID: admininfo._id,
          time: history.created_at,
          open: status,
          valid: status,
        });
        try {
          newHistory.save();
          console.log("Feed saved:", newHistory);
          io.emit("dataUpdated", newHistory);
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

app.get('/events', function(req, res) {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  
  setInterval(function() {
    res.write('event: message\n')
    res.write('data: Hello, world!\n\n')
  }, 1000)
})