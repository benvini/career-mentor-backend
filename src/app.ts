import express from "express";
import cors from "cors";

import userRoutes from "./routes/userRoutes";
import surveyRoutes from "./routes/surveyRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/surveys", surveyRoutes);

export default app;
