const json = (req,res,next) =>{
    let data = ``
    req.on("data",(chunk) => {
        data += chunk.toString();
    })
    req.on("end",() => {
        req.body = JSON.parse(data);
        res.end();
        next()
    })
    req.on("error",(err) => {
        console.log("error from json",err);
    })
}
module.exports = {json}