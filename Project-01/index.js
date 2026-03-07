const express = require("express");
const app = express();
const PORT = 8000;
const data = require("./data.json");

app.use(express.json());

//Defining routes and path of our express app

//Middleware Plugin

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); //This will call the next function automatically and doesn't block the req/re cycle
});

//HTML route
app.get("/users", (req, res) => {
  const html = `<div>
    <ul>
    ${data.map((data) => `<li>${data.firstName}</li>`).join("")}
    </ul>
    </div>`;

  res.send(html);
});

// REST API
app.get("/api/users", (req, res) => {
  res.json(data);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = data.find((user) => user.id === id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(user);
  })
  .put((req, res) => {
    //Edit user with his id
    return res.json({ status: "Pending" });
  })
  .delete((req, res) => {
    //Delete user with his id
    return res.json({ status: "Pending" });
  });

//Setting up the server
app.listen(PORT, () => console.log(`Server started at ${PORT}`));
