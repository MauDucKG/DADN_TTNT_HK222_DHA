const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const historySchema = new Schema(
  {
    lockID: {
      type: Schema.Types.ObjectId,
      ref: "locks",
    },
    userID: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    adminID: {
      type: Schema.Types.ObjectId,
      ref: "admins",
    },
    time: {
      type: Date,
      default: Date.now,
      unique: true,
    },
    open: {
      type: Boolean,
      required: true,
    },
    valid: {
      type: Boolean,
      required: true,
    },
  },
  {
    collection: "historys",
  }
);

const history = mongoose.model("historys", historySchema);

module.exports = history;
