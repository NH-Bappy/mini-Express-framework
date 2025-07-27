const framework = require("./app");
const app = new framework();
const {json} = require('./package');
const port = 3000;



app.use((req,res,next) => {
    console.log("the middleware function 1")
    next()
})
app.use((req,res,next) => {
    console.log("the middleware function 2")
    next()
    
})

app.use((req,res,next) => {
    json(req,res,next)
})

app.get("/home",(req,res) => {
    console.log("hello bappy")
});
app.post("/data",(req,res) => {
    console.log(req.body);
    res.end("data received")
})

app.listen(port,() => {
    console.log(`server is running on http://localhost:${port}`)
})