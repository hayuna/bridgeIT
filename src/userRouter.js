import { Router } from 'express';
import UserModel from './Model';

const router = Router();

router.get('/', (req, res) => {
    res.send('Working');
});

router.post('/', async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;

    try{
        await UserModel.insertUser(username, email);
        res.send({
            status: 200,
            message: 'User Created'
        });
    }catch(e){
        console.error(e);
        res.send({
            status: 500,
            message: e
        });
    }
});

router.get('/all', async (req, res) => {
    try{
        const userCollection = await UserModel.getAllUsers();
        res.send({
            status: 200,
            data: userCollection,
            message: 'success'
        });
    }catch(e){
        console.error(e);
        res.send({
            status: 500,
            message: e
        });
    }
});

export default router;