const express = require('express');
const bodyParser = require('body-parser');
const messages = require('./controllers/messages_controller.js')

const app = express();

app.use(bodyParser.json());

app.post('/api/messages', messages.create);
app.get('/api/messages', messages.read);
app.put('/api/messages/:id', messages.update);
app.delete('/api/messages/:id', messages.delete);


const port = 3005;

app.listen(port, () => console.log(`Listening on port ${port}`))

app.use(express.static( __dirname + '/../public/build'))