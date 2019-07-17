import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
// eslint-disable-next-line import/no-unresolved
import swaggerUI from 'swagger-ui-express';
import routes from './routes';
import docs from '../openapi.json';
import Respond from './helpers/ResponseHandler';

dotenv.config();
// response helper func
const { response } = Respond;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
const PORT = process.env.PORT || 3000;
app.use('/documentation/v2/', swaggerUI.serve, swaggerUI.setup(docs));

app.use('/api/v2/', routes);

// catch 404 routes
app.use('*', (req, res) => {
  return response(res, 404, 'Route Not Found!', true);
});

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`server running on port ${PORT}...`));

export default app;
