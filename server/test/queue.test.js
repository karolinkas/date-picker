var Queue = require("./../queue.js");

var fixture = require("./fixture.js");

var expect  = require('chai').expect;

//TODO: remove unused npm packages

describe('Check all functionalities of request queue', function() {

  var request = {
    id: 1,
    type: "pdf",
    processTime: 3000
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

    expect(instance.prioritise(fasterOne, last)).to.equal(fasterOne);
  });

/*   it('should add sort multiple reqests in the correct order', function() {

    // by comparing the proccessing time of the last added element with the current one
    var instance = new Queue();

    fixture.exampleRequest.forEach(function (request){
      instance.addRequest(request);
    });

    expect(instance.queue).to.equal(fixture.expectedOrder);
  }); */

});
