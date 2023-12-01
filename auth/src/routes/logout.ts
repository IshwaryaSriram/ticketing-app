import  express from "express";

const router = express.Router();

router.get('/api/users/logout' ,async(req,res) => {
    res.send('Hi');

});

export { router as logOutRouter } ;

