const fs = require("fs");

exports.authorize = function (userName, password) {
  let usersDB = JSON.parse(fs.readFileSync(__dirname + "\\db\\users.json"));
  const user = usersDB.find(
    (user) => user.userName === userName && user.password === password
  );
  if (user) {
    user.connected = true;
    fs.writeFileSync(__dirname + "\\db\\users.json", JSON.stringify(usersDB));
    return true;
  }
};

exports.getConnectedUsers = function () {
  const usersDB = JSON.parse(fs.readFileSync(__dirname + "\\db\\users.json"));
  const connectedUsers = usersDB.filter((user) => user.connected === true);
  return connectedUsers;
};
