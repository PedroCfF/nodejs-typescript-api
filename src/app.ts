import express from "express";
import apartmentsRouter from "./routes/apartmentsRouter";

const app = express();

const port = 3000;

app.listen(port, () => {
  console.log("App listening on port " + port);
});

app.use(express.json());
app.use("/api/apartments", apartmentsRouter);
