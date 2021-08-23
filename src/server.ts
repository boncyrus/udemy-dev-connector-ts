import express from 'express';
import UsersApi from './api/UsersApi';
import PostsApi from './api/PostsApi';
import AuthApi from './api/AuthApi';
import PorfileApi from './api/ProfileApi';
import { connectMongoDb } from './db/connections/MongoConnection';

const app = express();
const port = process.env.API_PORT || 3001;

connectMongoDb();

app.use(express.json());
app.use('/api/users', UsersApi);
app.use('/api/posts', PostsApi);
app.use('/api/profile', PorfileApi);
app.use('/api/auth', AuthApi);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
