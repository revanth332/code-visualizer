import express from 'express';
import bodyParser from 'body-parser';
import generateFlow  from './flowGenerator.js';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/generateFlow', async (req, res) => {
    try {
        const data = req.body.code;
        
        const result = await generateFlow(data);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/generateCode', async (req, res) => {
    try {
        const data = req.body.flowDiagramData;
        const result = await generateFlow(JSON.stringify(data));
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});