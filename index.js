console.log("Hello world!"); // Node.js node v12.16.1

// Fri Jun 18, 2021
// npm i sqlite3 // maybe not needed?
// https://www.npmjs.com/package/sqlite3
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

db.serialize(function() {
  db.run("CREATE TABLE lorem (info TEXT)");

  // https://stackoverflow.com/questions/8107856/how-to-determine-a-users-ip-address-in-node
  // npm i req
  var ip = req.headers['x-forwarded-for'] ||
    req.socket.remoteAddress ||
    null;

  var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + ip + " " + i);
  }

  stmt.finalize();

  db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
      console.log(row.id + ": " + row.info);
  });
});

db.close();