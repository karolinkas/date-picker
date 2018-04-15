function fileConversion (processTime){

    console.log("processing");

    return new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve();
        }, processTime);
    });
}


function Queue () {
    
    this.queue = [];
    this.requesting = false;

    this.validRequest = function (request) {

        if (!request ||  !request.type){
    
            throw new Error("Incomplete Request");
            return false;
    
        } else {
            
            return true;
        }    
    
    };

};

Queue.prototype.processRequests = function (request) {

    this.requesting = true;
    var that = this;

    const promise =  Promise.all(this.queue.map( function (request) {
        
        return fileConversion(request.processTime).then(function (){
            that.queue.pop();
        });

    }));

    return promise;
}

Queue.prototype.addRequest = function (request) {

    try { 
        if (this.validRequest(request)){
            this.queue.push(request);
        }
    } catch (message){
        throw new Error(message);
    }

};


Queue.prototype.getLast = function () {
    
    return this.queue[this.queue.length - 1];

};

module.exports = Queue;