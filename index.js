const express = require("express")
const app = express()
const path = require("path")
const PORT = 8080

app.use(express.static(path.join(__dirname + "/public")))
app.get("/", (req, res, next) =>
  res.sendFile(path.join(__dirname + "/index.html"))
)

app.listen(PORT, () => console.log(`connect server is : ${PORT}`))
