const http = require('http');
const { resolve } = require('path');

class framework{

    constructor(){
        this.routes = [];
        this.middleWare = [];
    }

    use(middlewareFn){
        this.middleWare.push(middlewareFn)
    };

    get(path , callbackFn){
        this.routes.push({method : "GET",path,callbackFn})
    };

    post(path , callbackFn){
        this.routes.push({method : "POST",path,callbackFn})
    };

    async executeMiddleware (req,res){
        for (let mF of this.middleWare){
            await new Promise((resolve) => {
                mF(req ,res ,() =>{
                    resolve()
                })
            })
        };
    };






    listen(port ,callbackFn){
        const server = http.createServer(async (req ,res) => {
            console.log(req.url)
        try{
            await this.executeMiddleware(req,res);
            const isMatch = this.routes.find((route) => route.method == req.method && route.path == req.url);
            if(isMatch){
                isMatch.callbackFn(req,res)
            }else{
                res.writeHead(401);
                res.end("routes do not match")
            }
        }
        catch(error){
            console.log("error from server" , server)
        }
        })
    server.listen(port ,callbackFn)
    }

}


module.exports = framework