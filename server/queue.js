
function Queue () {
    
    this.queue = [];

    this.validRequest = function (request) {

        if (!request ||  !request.type){
    
            throw new Error("Incomplete Request");
            return false;
    
        } else {
            
            return true;
        }
        
        
    
    };

};

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