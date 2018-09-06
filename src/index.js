const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let nodeId = 42;

function getCurrentState() {
    return JSON.stringify({
        nodes: [
            {id: 1, label: 'Node 1'},
            {id: 2, label: 'Node 2'},
            {id: 3, label: 'Node 3'},
            {id: 4, label: 'Node 4'},
            {id: 5, label: 'Node 5'}
        ],
        edges: [
            {from: 1, to: 3},
            {from: 1, to: 2},
            {from: 2, to: 4},
            {from: 2, to: 5}
        ]
    });
}

function sendNode(ws) {
    ws.send(JSON.stringify({
        nodes: [
            {id: nodeId, label: `Node ${nodeId}`}
        ],
        edges: [
            {from: 2, to: nodeId}
        ]
    }));
    nodeId += 1;
}

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send(getCurrentState());
  var timerId = setInterval(() => sendNode(ws), 2000);
  setTimeout(() => { clearInterval(timerId); console.info('stop'); }, 21000);

});

console.info('started');
