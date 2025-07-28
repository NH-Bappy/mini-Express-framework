const framework = require("./app");
const app = new framework();
const {json} = require('./package');
const bryct = require("./bryct");
const {hashPassword ,verifyPassword} = new bryct;
const path = require('path');
const fs = require('fs');
const { log } = require("console");
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
    res.end("res is working")
});



app.post("/data",( req, res) => {
    const {name , email ,password} = req.body;
    if(!name){
        res.end("Your name is missing !");
    }else if(!email){
        res.end("Your email is missing !");
    }
    else if(!password){
        res.end("Your password is missing !");
    }

    // now hash the password
    const {salt , hash} = hashPassword(password)

    const userInfo = {};
    userInfo.userName = name;
    userInfo.userEmail = email;
    userInfo.hashPassword = hash;
    userInfo.salt = salt;
    userInfo.createAT = new Date().toDateString();
// read data
    const tragetPath = path.join(__dirname , "db.json");
    fs.readFile(tragetPath , "utf-8" , (err , data) => {
        if(err) return res.end("error from read file" ,err);
        const previousData = JSON.parse(data);
        previousData.push(userInfo);
        log(previousData)


// write data
    fs.writeFile(tragetPath , JSON.stringify(previousData) ,(err) => {
        if(err) return res.end("error from read file" ,err);
        log("save data into database")
    })

    })
    // fs.appendFile(tragetPath , `\n${JSON.stringify(userInfo)}\n` , (err) => {
    //     if(err){
    //         return res.end("registration error" , err)
    //     }
    // })
    res.end("Registration successfully complete")
})






app.post("/login" , (req,res) => {
    // log("from login routes" ,req.body)
    const {email , password} = req.body
    const tragetPath = path.join(__dirname , "db.json");
    fs.readFile(tragetPath , "utf-8" ,(err , data) => {
        if(err) return res.end("error from post login read file" ,err);
        const previousData = JSON.parse(data)
        const findUser = previousData.find((item) => item.userEmail == email)
        // log(findUser)
        const {hashPassword , salt} = findUser;
        const result = verifyPassword (password , salt , hashPassword)
        log(result)
        if(result){
            res.end("Login successful");
        }else{
            res.end("Your password or email Invalid")
        }
    })
})






app.listen(port,() => {
    console.log(`server is running on http://localhost:${port}`)
})