function fileConversion (processTime){

    return new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve("resolved");
        }, processTime);
    });
}


function Queue () {
    
    this.queue = [];
    this.requesting = false;
    this.delay = 0;
    this.fastConversion = 1000;
    this.slowConversion = 5000;

    this.validRequest = function (request) {

        if (!request ||  !request.type){
    
            throw new Error("Incomplete Request");
            return false;
    
        } else {
            
            return true;
        }    
    
    };

};

Queue.prototype.processRequest = function () {

    this.requesting = true;
    var that = this;

    const firstInQueue = this.queue[0];
        
    fileConversion(firstInQueue).then(function (){
            console.log("conversion done");
            that.queue.pop();
    });
        
}

Queue.prototype.addRequest = function (request) {
    try { 
        if (this.validRequest(request)){
            const last = this.getLast();
            if (last){
                const priority = this.prioritise(request, this.getLast());
                if (priority){
                    // switch position between prioritised element and last element
                    this.delay += 1000;
                    const removeLast = this.queue.pop();
                    this.queue.push(priority);
                    this.queue.push(removeLast);

                    //after slow conversion is done bring in response
                    if (this.delay === this.slowConversion + 1000){
                        this.preempt(this.queue, this.queue.length - 2, this.queue.length - 1);
                    }
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

Queue.prototype.preempt = function (array, indexA, indexB) {
    const temp = array[indexA];
    array[indexA] = array[indexB];
    array[indexB] = temp;
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