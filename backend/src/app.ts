import "dotenv/config";
import morgan from "morgan";
import express, { NextFunction, Request, Response } from "express";
import notesRoutes from "./routes/notes";
import createHttpError, {isHttpError} from "http-errors";
const app = express();
app.use(express.json());

app.use("/api/notes", notesRoutes);

app.use(morgan("dev"))

app.use((req, res, next) => {
  next(createHttpError(404, "Endopint not found"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = " An unknow error occured";
  let statusCode = 500;
  if(isHttpError(error)){
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
