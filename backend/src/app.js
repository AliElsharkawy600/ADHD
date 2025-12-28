const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const scoreRoutes = require("./routes/score.routes");
dotenv.config();
connectDB();

const app = express();
app.use(cors());

// app.use(cors({
//     origin: "*", // بيسمح لأي موقع يكلم الباك إند
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
//     credentials: true // مهم لو بتبعت كوكيز أو توكن
// }));

// // هيدر إضافي للأمان عشان Serveo ساعات بيحجب الطلبات
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     next();
// });
// app.options('*', cors()); // بيسمح بطلبات الـ Pre-flight لكل المسارات

app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/scores", scoreRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
