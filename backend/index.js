require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
const initializedatabase = require('./config/db');
const UserRoutes = require("./routes/UserRoutes");
const TaskRoutes = require("./routes/TaskRoutes");

const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};

app.get("/", (req, res) => {
    res.send("Api is working !!!");
})

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/users", UserRoutes)
app.use("/api/tasks", TaskRoutes)

initializedatabase();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`)
})