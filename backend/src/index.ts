import express from 'express';
import router from './routes';
import { createServer } from 'http';
import { Server } from 'socket.io'
const app = express();
const PORT = process.env.PORT || 3001;




app.use(express.json());

const server = createServer(app);

export const ioServer = new Server(server);


ioServer.on('connection', (socket) => {
  console.log('a user connected');
});

ioServer.on('interaction', (data) => {
});



// Mount all routes
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
