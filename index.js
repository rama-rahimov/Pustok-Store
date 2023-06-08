const express = require('express');
const app = express();
const register =  require('./routers/register');
const categories = require('./routers/categories');
const login = require('./routers/login');
const searchBook = require('./routers/search-book');
const users = require('./routers/getUser');
const author = require('./routers/author');
const imageBook =  require('./routers/image_book');
const order = require('./routers/order');
const orderDetail = require('./routers/order_detail');
const publisher = require('./routers/publisher');
const tag = require('./routers/tag');
const addToCart = require('./routers/basket');
const adress = require('./routers/adress');
const addInformationUser = require('./routers/addInfoUser');
const authorBook = require('./routers/authorBooks');
const categoryBook = require('./routers/categoryBooks');
const productDetail = require('./routers/productDetail');
const tagBook = require('./routers/tagBooks');
const book = require('./routers/book');
const getUserOne = require('./routers/getOneUser');
const deleteUser =  require('./routers/deleteUser');
const updatePassword = require('./routers/updatePassword');

const PORT = process.env.PORT || 3000 ;
app.use(express.json());
app.use('/api', register);
app.use('/api', categories);
app.use('/api', searchBook);
app.use('/api', login);
app.use('/api', users);
app.use('/api', author);
app.use('/api', imageBook);
app.use('/api', order);
app.use('/api', orderDetail);
app.use('/api', publisher);
app.use('/api', tag);
app.use('/api', addToCart);
app.use('/api', adress);
app.use('/api', addInformationUser);
app.use('/api', authorBook);
app.use('/api', categoryBook);
app.use('/api', productDetail);
app.use('/api', tagBook);
app.use('/api', book);
app.use('/api', getUserOne);
app.use('/api', deleteUser);
app.use('/api', updatePassword);

const start = () =>{
    try{
     app.listen(PORT, '192.168.1.94' , () => {
        console.log(`Running on: ${PORT}`);
    });
    
    }catch(e){
        console.log(e);
    }
}

start();