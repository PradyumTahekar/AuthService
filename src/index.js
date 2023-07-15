const express = require('express');
const bodyParser = require('body-parser');

const {PORT} = require('./config/serverConfig');
const apiRoutes = require('./routes/index');  


// const UserRepository = require('./repository/user-repository');
// const UserService = require('./services/user-service');


const app = express();

const prepareAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api', apiRoutes);

    app.listen(PORT, async () => {
        console.log(`Server has started on the port ${PORT}`);

        // const repo = new UserRepository();
        // const user =  await repo.get(1);
        // console.log(user);

        // const repo = new UserService();
        // const newToken = repo.createToken({email:"pradyum.tahekar@gmail.com",id:1});
        // console.log("new token is ",newToken);  
        // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYWR5dW0udGFoZWthckBnbWFpbC5jb20iLCJpZCI6MSwiaWF0IjoxNjg5NDEwNjQ0LCJleHAiOjE2ODk0MTQyNDR9.cCRBA0ZvC2eCBg7YALq12rlACLIAQIu57k2HcWhGTdU";
        // const response = repo.verifyToke(token);
        // console.log(response);
    });
} 

prepareAndStartServer();