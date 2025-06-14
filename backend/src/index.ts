import express from 'express';
import router from './routes';
import { createServer } from 'http';
import { socketHandler } from './socket';
import cors from 'cors'
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors())

app.use('/api', router);

const server = createServer(app);
socketHandler(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
