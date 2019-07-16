import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
// eslint-disable-next-line import/no-unresolved
import swaggerUI from 'swagger-ui-express';
import routes from './routes';
import docs from '../openapi.json';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
const PORT = process.env.PORT || 3000;
app.use('/documentation/v1/', swaggerUI.serve, swaggerUI.setup(docs));

app.use('/api/v1/', routes);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`server running on port ${PORT}...`));

export default app;
