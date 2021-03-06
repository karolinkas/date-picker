var Queue = require("./../queue.js");

var fixture = require("./fixture.js");

var expect  = require('chai').expect;

describe('Check all functionalities of request queue', function() {

  var request = {
    id: 1,
    type: "pdf",
    processTime: 5000
  };

  it('should increase the length for the queue when adding new requests', function() {
    
    var instance = new Queue();

    instance.addRequest(request);

    expect(instance.queue.length).to.equal(1);
  });

  it('should throw error for invalid requests', function() {
    
    var instance = new Queue();
     
    const incompleteRequest = {id: 1};

    expect(instance.addRequest.bind(instance, incompleteRequest)).to.throw();

  });

  it('should only add valid requests', function() {
    
    var instance = new Queue();

    const incompleteRequest = {id: 1};

    // look at that! just learned that today! funny, no?
    expect(instance.queue).to.to.be.an('array').that.is.empty;
  });

  it('should start processing once request has been added', function() {
    
    var instance = new Queue();

    instance.addRequest(request);
    instance.processRequest();

    expect(instance.requesting).to.equal(true);
  });

  it('should prioritise faster conversions', function() {

    // by comparing the proccessing time of the last added element with the current one
    var instance = new Queue();
    var fasterOne = {
      id: 2,
      type: "html",
      processTime: 1000
    };

    var last = {
      id: 1,
      type: "pdf",
      processTime: 5000
    };

    expect(instance.prioritise(fasterOne, last)).to.equal(fasterOne);
  });

  it('should not prioritise when following request is taking longer', function() {

    // by comparing the proccessing time of the last added element with the current one
    var instance = new Queue();
    var requests = [{
      id: 1,
      type: "html",
      processTime: 1000
    }, {
      id: 2,
      type: "pdf",
      processTime: 5000
    }];

    requests.forEach(function(request) {
      instance.addRequest(request);
    });

    expect(instance.queue).deep.equal(requests);
  });

   it('should add sort multiple reqests in the correct order', function() {

    // by comparing the proccessing time of the last added element with the current one
    var instance = new Queue();

    fixture.exampleRequest.forEach(function (request){
      instance.addRequest(request);
      instance.processRequest();
    });
    expect(instance.queue).deep.equal(fixture.expectedOrder);
  });

});
