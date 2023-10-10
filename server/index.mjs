import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import restaurants from "./routes/restaurants.mjs";
import users from "./routes/users.mjs";

const PORT = 5050;
const app = express();

app.use(cors());
app.use(express.json());

// Load the /restaurants routes
app.use("/restaurants", restaurants);

// Load the /users routes
app.use("/users", users);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
