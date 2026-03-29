const app = require("./src/app.js");
const connectToMongodb = require("./src/config/databse.js");

const startServer = async () => {
  try {
    await connectToMongodb();
    app.listen(8001, () =>
      console.log("Server is running at http://localhost:8001"),
    );
  } catch (err) {
    console.log("Failed to start the server", err);
  }
};

startServer();
