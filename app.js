const http = require('http');

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

    listen(req,res){
        
    }

}