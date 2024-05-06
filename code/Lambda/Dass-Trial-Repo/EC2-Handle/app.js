import express from 'express';
import { handler } from './handle.mjs';
import { store } from './store.mjs';
import { getquery } from './getquery.mjs';
import fs from 'fs';
import https from 'https';
import bodyParser from 'body-parser';

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}
);

app.get('/api/random', async (req, res) => {
    let isWarm = false;
    const status = JSON.parse(fs.readFileSync('/tmp/status.json', 'utf8'));
    isWarm = status?.chatApplication_HandleQuery !== 'shutdown';
    console.log(`isWarm: ${isWarm}`);
    if (isWarm) {
        const response = await fetch('https://lr4f1g8ok3.execute-api.ap-south-1.amazonaws.com/api/random');
        const data = await response.json();
        res.send(data);
    }
    else {
        https.get('https://lr4f1g8ok3.execute-api.ap-south-1.amazonaws.com/api/handle/ping');
        https.get('https://lr4f1g8ok3.execute-api.ap-south-1.amazonaws.com/api/store/ping');
        https.get('https://lr4f1g8ok3.execute-api.ap-south-1.amazonaws.com/api/getquery/ping');

        const event = {
            routeKey: 'GET /api/random'
        };
        const response = await handler(event);
        res.send(response.body);
    }
}
);

app.post('/api/query', async (req, res) => {
    let isWarm = false;
    const status = JSON.parse(fs.readFileSync('/tmp/status.json', 'utf8'));
    isWarm = status?.chatApplication_StoreQuery !== 'shutdown';
    console.log(`isWarm: ${isWarm}`);
    if (isWarm) {
        const response = await fetch('https://lr4f1g8ok3.execute-api.ap-south-1.amazonaws.com/api/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        });
        const data = await response.json();
        res.send(data);
    }
    else {
        https.get('https://lr4f1g8ok3.execute-api.ap-south-1.amazonaws.com/api/handle/ping');
        https.get('https://lr4f1g8ok3.execute-api.ap-south-1.amazonaws.com/api/store/ping');
        https.get('https://lr4f1g8ok3.execute-api.ap-south-1.amazonaws.com/api/getquery/ping');

        const event = {
            routeKey: 'POST /api/query',
            body: JSON.stringify(req.body)
        };
        const response = await store(event);
        res.send(response.body);
    }
}
);

app.get('/api/queries', async (req, res) => {
    let isWarm = false;
    const status = JSON.parse(fs.readFileSync('/tmp/status.json', 'utf8'));
    isWarm = status?.chatApplication_GetQuery !== 'shutdown';
    console.log(`isWarm: ${isWarm}`);
    if (isWarm) {
        const response = await fetch('https://lr4f1g8ok3.execute-api.ap-south-1.amazonaws.com/api/queries');
        const data = await response.json();
        res.send(data);
    }
    else {
        https.get('https://lr4f1g8ok3.execute-api.ap-south-1.amazonaws.com/api/handle/ping');
        https.get('https://lr4f1g8ok3.execute-api.ap-south-1.amazonaws.com/api/store/ping');
        https.get('https://lr4f1g8ok3.execute-api.ap-south-1.amazonaws.com/api/getquery/ping');

        const event = {
            routeKey: 'GET /api/queries'
        };
        const response = await getquery(event);
        res.send(response.body);
    }
}
);


app.listen(port, () => {
    console.log(`app listening on port ${port}`);
}
);