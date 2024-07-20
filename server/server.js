import express from "express";
import items from "./routes/items.js";
import errorHandler from "./middleware/error.js";
import notFound from "./middleware/notFound.js";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/items", items);

// Error handlers
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
