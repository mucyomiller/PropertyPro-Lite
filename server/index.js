import express from 'express';
import dotenv from 'dotenv';
// eslint-disable-next-line import/no-unresolved
import routes from './routes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

app.use('/api/v1/', routes);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`server running on port ${PORT}...`));
