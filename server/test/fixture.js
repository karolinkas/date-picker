/* // Requests
'pdf #1', 'pdf #2', 'html #3', 'html #4', 'html #5', 'html #6', 'html #7', 'html #8', 'pdf #9', 'html #10'

// Processing order

'pdf #1', 'html #3', 'html #4', 'html #5', 'html #6', 'html #7','pdf #2', 'html #8', 'html #10', 'pdf #9'
 */


// creating fixtures from example requests
var request = [{
        id: 1,
        type: "pdf",
        processTime: 3000
    }, {
        id: 2,
        type: "pdf",
        processTime: 3000    
    }, {
        id: 3,
        type: "html",
        processTime: 1000
    }, {
        id: 4,
        type: "html",
        processTime: 1000    
    }, {
        id: 5,
        type: "html",
        processTime: 1000
    }, {
        id: 6,
        type: "html",
        processTime: 1000    
    }, {
        id: 7,
        type: "html",
        processTime: 1000
    }, {
        id: 2,
        type: "pdf",
        processTime: 3000    
    },{
        id: 8,
        type: "html",
        processTime: 1000    
    }, {
        id: 9,
        type: "pdf",
        processTime: 3000
    }, {
        id: 10,
        type: "html",
        processTime: 1000    
}];

var expectedOrder = [{
    id: 1,
    type: "pdf",
    processTime: 3000
}, {
    id: 3,
    type: "html",
    processTime: 1000
}, {
    id: 4,
    type: "html",
    processTime: 1000    
}, {
    id: 5,
    type: "html",
    processTime: 1000
}, {
    id: 6,
    type: "html",
    processTime: 1000    
}, {
    id: 7,
    type: "html",
    processTime: 1000
}, {
    id: 8,
    type: "html",
    processTime: 1000    
}, {
    id: 10,
    type: "html",
    processTime: 1000    
}, {
    id: 9,
    type: "pdf",
    processTime: 3000
}];

exports.expectedOrder = expectedOrder;

exports.exampleRequest = request;