const express = require("express");
const { Thing, data, sequelize } = require("./db");
const path = require("path");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use("/src", express.static(path.join(__dirname, "src")));

app.get("/", (req, res, next) =>
  res.sendFile(path.join(__dirname, "index.html"))
);

app.post("/", async (req, res, next) => {
  try {
    await Thing.create({ name: req.body.name });
    res.redirect(`/`);
  } catch (e) {
    next(e);
  }
});

app.delete("/api/employees/:id", async (req, res, next) => {
  try {
    const employee = await Thing.findByPk(req.params.id);
    await employee.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

app.get("/api/employees", async (req, res, next) => {
  try {
    res.send(await Thing.all());
  } catch {}
});

const start = async () => {
  try {
    await data();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`server listening at PORT ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
