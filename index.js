const express = require("express");
const cors = require("cors");
const { resolve } = require("path");
const PORT = process.env.PORT || 9000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(resolve(__dirname, "client", "dist")));

require('./routes/api')(app);
require('./routes/auth')(app);

app.get("*", (req, res) => {
    res.sendFile(resolve(__dirname, "client", "dist", "index.html"));
});

app.listen(PORT, () => {
    console.log("Server running at localhost:" + PORT);
}).on("error", (err) => {
    console.log("Server Error:", err.message);
    console.log("Do you already have a server running on PORT:" + PORT + "?");
});
