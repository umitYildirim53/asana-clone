const Mongoose = require("mongoose");
const logger = require("../scripts/logger/Projects");

const SectionSchema = new Mongoose.Schema(
  {
    name: String,
    user_id: {
      type: Mongoose.Types.ObjectId,
      ref: "user",
    },
    project_id: {
      type: Mongoose.Types.ObjectId,
      ref: "project",
    },
    order: Number,
  },
  { timestamps: true, versionKey: false }
);

SectionSchema.post("save", (doc) => {
  logger.log({
    level: "info",
    message: doc,
  });

  // kayıt edilmiştir.. loglama..
});

module.exports = Mongoose.model("section", SectionSchema);
