var cy = cytoscape({

  container: document.getElementById('cy'), // container to render in

  elements: [ // list of graph elements to start with
    { // node a
      data: { id: 'a' }
    },
    { // node b
      data: { id: 'b' }
    },
    { // edge ab
      data: { id: 'ab', source: 'a', target: 'b' }
    }
  ],

  style: [ // the stylesheet for the graph
    {
      selector: 'node',
      style: {
        'background-color': '#666',
        'label': 'data(id)'
      }
    },

    {
      selector: 'edge',
      style: {
        'width': 3,
        'line-color': '#ccc',
        'target-arrow-color': '#ccc',
        'target-arrow-shape': 'triangle'
      }
    }
  ],

  layout: {
    name: 'grid',
    rows: 1
  }

});

cy.on('mouseover', 'node', { foo: 'bar' }, function(evt){
  add(); // 'bar'

  var node = evt.cyTarget;
  node.style({
    'background-color': 'blue',
        'transition-property': 'background-color',
        'transition-duration': '0.5s'
      });
  console.log( 'tapped ' + node.id() );
});

cy.on('mouseout', 'node', { foo: 'bar' }, function(evt){
  add(); // 'bar'

  var node = evt.cyTarget;
  node.style({
    'background-color': 'red',
        'transition-property': 'background-color',
        'transition-duration': '0.5s'
      });
  console.log( 'tapped ' + node.id() );
});



function add() { cy.add([
  { group: "nodes", data: { id: "n0" }, position: { x: 200, y: 100 } },
  { group: "nodes", data: { id: "n1" }, position: { x: 200, y: 200 } },
  { group: "edges", data: { id: "e0", source: "a", target: "n1" } },
  { group: "edges", data: { id: "e1", source: "b", target: "n0" } }
]);
}
