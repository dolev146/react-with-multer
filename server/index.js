//imports
const express = require("express")
const cors = require("cors")
const path = require("path")

const app = express()

// mw
app.use(cors())
app.use(express.json())
app.use("/users", require("./routes/users"))
app.use("/vacations", require("./routes/vacations"))
app.use("/orders", require("./routes/orders"))
app.use("/search", require("./routes/search"))
app.use("/images", express.static("images"))

// Serve static assets if in porduction
if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("../build"))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client',
            'build', 'index.html'))
    })

}

// listiner
const port = process.env.PORT || 1000
app.listen(port, () => console.log(`up and running on ${port}`))


