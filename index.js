const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./db/db');
const  bodyParser = require("body-parser");
const postRouter = require('./routes/post.route');
const userRouter = require('./routes/user.route');
const cookieSession = require("cookie-session");


const port = process.env.PORT || 5000;
connectDB();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieSession({
    name: "Job-portal",
    secret: "COOKIE_SECRET",
    httpOnly: true
})
);

app.get("/", (req, res) => {
    res.json({message: `The API setup is working fine so far.`});
})
app.use(userRouter);
app.use(postRouter);

app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
}
);
