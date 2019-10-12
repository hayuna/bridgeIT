import express from 'express';
import path from 'path';
import config from './config';
import { role, test, user } from './server/routes';
import 'dotenv/config';

const app = express();


config.useMiddleware(app);
config.useMongo();
config.initNodeMailer();
config.kickstartScheduler();

app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/api/test', test);
app.use('/api/role', role);
app.use('/api/user', user);


app.get('*', (req, res) => {
    res.send(`Hello`);
    // res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

console.log(process.env)
const port = process.env.PORT || 5000;
const server = app.listen(port, err => {
    if(err) throw err;
    console.log(`> Ready on port ${port}`);
});
export default server;