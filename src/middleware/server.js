const express = require("express");
const app = express();

const PORT = process.env.REACT_APP_PORT || 5000;

app.use(express.static("src"));

app.get("/", (request, response) => {
  response.send("");
});

app.listen(PORT, () => {
  console.log("server running on" + `${PORT}`);
});
