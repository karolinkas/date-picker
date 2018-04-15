function fileConversion (processTime){

    console.log("processing");

    return new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve("resolved");
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

    const promises =  this.queue.map( function (request) {
        
        return fileConversion(request.processTime).then(function (){
            console.log("conversion done");
            that.queue.pop();
            return request;
        });
        
    });

    return promises;
}

Queue.prototype.addRequest = function (request) {
    try { 
        if (this.validRequest(request)){
            const last = this.getLast();
            if (last){
                const priority = this.prioritise(request, this.getLast());
                if (priority){
                    // switch position between prioritised element and last element
                    const removeLast = this.queue.pop();
                    this.queue.push(priority);
                    this.queue.push(removeLast);
                } else{  
                    this.queue.push(request);
                }
            } else {
                this.queue.push(request); 
            }
        }
    } catch (message){
        throw new Error(message);
    }

};


Queue.prototype.getLast = function () {
    
    if (this.queue){
        return this.queue[this.queue.length - 1];
    } else {
        return undefined;
    }

};

Queue.prototype.prioritise = function (current, last) {
    if (Number(current.processTime) < Number(last.processTime)){
        return current;
    } else {
        return undefined;
    }

};

module.exports = Queue;