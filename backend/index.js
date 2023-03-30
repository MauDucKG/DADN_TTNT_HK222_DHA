const app = require("express")();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRouter = require('./user/user.router')
const adminRouter = require('./admin/admin.router')
const lockRouter = require('./lock/lock.router')
const allowRouter = require('./allow/allow.router')
const historyRouter = require('./history/history.router')
const http = require("http").createServer(app);
const cors = require("cors");
const request = require('request');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require('dotenv').config();

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

const feedUrl = 'https://io.adafruit.com/api/v2/minhduco19/feeds';
const options = {
  headers: {
    'X-AIO-Key': process.env.ADAFRUIT_IO_KEY
  }
};

request.get(feedUrl, options, async (error, response, body) => {
  if (error) {
    console.log('Error:', error);
    response.status(500).send(error);
  } else {
    const feeds = JSON.parse(body);
    for (const feed of feeds) {
      const newFeed = new Feed({
        name: feed.name,
        description: feed.description,
        key: feed.key,
        created_at: feed.created_at,
        updated_at: feed.updated_at
      });
      try {
        await newFeed.save();
        console.log('Feed saved:', newFeed);
      } catch (error) {
        console.log('Error saving feed:', error);
      }
    }
  }
});

app.use(cors());
app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/lock', lockRouter);
app.use('/allow', allowRouter);
app.use('/history', historyRouter);

const Schema = mongoose.Schema;

const feedSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  key: { type: String, required: true, unique: true },
  created_at: {type: Date, required: true, unique: true},
  updated_at: Date
});

const Feed = mongoose.model('Feed', feedSchema);

module.exports = Feed;