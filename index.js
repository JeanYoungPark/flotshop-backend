import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

export const app = express();
const port = 3001;

/* front 주소 */
const corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }))

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});