import express from 'express';
import {handler} from './index.mjs';
import fs from 'fs';
import https from 'https';

const app = express();
const port = 3000;


app.get('/api/random', async (req, res) => {
    let isWarm = false;
    fs.readFile('/tmp/status.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const status = JSON.parse(data);
        isWarm = status?.chatApplication_HandleQuery !== 'shutdown';
        console.log(`isWarm: ${isWarm}`);
    }
    );
    if (isWarm) {
        const response = await fetch('https://bed2bkcc2b.execute-api.ap-south-1.amazonaws.com/api/random');
        const data = await response.json();
        res.send(data);
    }
    else {
        https.get('https://bed2bkcc2b.execute-api.ap-south-1.amazonaws.com/api/handle/ping');
        https.get('https://bed2bkcc2b.execute-api.ap-south-1.amazonaws.com/api/store/ping');
        https.get('https://bed2bkcc2b.execute-api.ap-south-1.amazonaws.com/api/getquery/ping');

        const event = {
            routeKey: 'GET /api/random'
        };
        const response = await handler(event);
        res.send(response.body);
    }
}
);

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
}
);