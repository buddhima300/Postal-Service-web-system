const uuid = require("uuid");

//generate a unique id
var uniqueId = uuid.v4();

exports.keyGenerator = (req, res) => {
  //   console.log("generated key: ", uniqueId);
  res.send(uniqueId);
};
