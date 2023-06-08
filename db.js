const {Sequelize, DataTypes} = require('sequelize');
const sequelize =  new Sequelize('couch', 'root', '123456', {
    dialect: 'mysql',
});

const Adress = sequelize.define('adress', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    country: {
      type:  DataTypes.STRING
    },
    city: {
      type:  DataTypes.STRING
    },
    region: {
      type:  DataTypes.STRING
    },
    street: {
      type:  DataTypes.STRING
    },
    home: {
      type:  DataTypes.INTEGER
    }
});

const Author = sequelize.define('author', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name:{
        type: DataTypes.STRING
    },
    last_name: {
        type: DataTypes.STRING
    },
    biography: {
        type: DataTypes.TEXT
    },
    slug: {
        type: DataTypes.STRING
    }
});


const Author_book = sequelize.define('author_book', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
});

const Book = sequelize.define('book', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    page_count: {
        type: DataTypes.INTEGER
    },
    publication_date:{
        type: DataTypes.STRING
    },
    appear_date:{
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.DECIMAL(8,2)
    },
    discount: {
        type: DataTypes.DECIMAL(8, 2)
    },
    description: {
        type:DataTypes.TEXT
    },
    isbn:{
        type: DataTypes.INTEGER
    }
});

const Category = sequelize.define('category', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING
    },
    parent_id: {
        type: DataTypes.INTEGER
    },
    slug: {
        type: DataTypes.STRING
    }
});

const Category_book = sequelize.define('category_book', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
});

const Image_book = sequelize.define('image_book', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    image:{
        type: DataTypes.STRING
    }
});

const Order = sequelize.define('order', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    order_date: {
        type: DataTypes.DATE ,
        defaultValue: Sequelize.fn('NOW')
    },
    required_date: {
        type: DataTypes.DATE
    },
    shipped_date: {
        type: DataTypes.DATE
    }
});

const Order_detail = sequelize.define('order_detail', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    unit_price: {
        type: DataTypes.DECIMAL(8, 2)
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    discount:{
        type: DataTypes.DECIMAL(8, 2)
    },
    book_name:{
        type: DataTypes.STRING
    }
});

const Publisher = sequelize.define('publisher', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT
    }
});

const Role = sequelize.define('role', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    value: {
        type: DataTypes.STRING
    }
},{timestamps: false});

const Tag = sequelize.define('tag', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING
    },
    slug: {
        type: DataTypes.STRING
    }
});


const Tag_book = sequelize.define('tag_book', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    } 
});

const User = sequelize.define('user', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
   full_name:{
    type: DataTypes.STRING,
    allowNull: false
   } ,
   password:{
    type: DataTypes.STRING,
    allowNull: false
   } ,
   email:{
    type: DataTypes.STRING,
    allowNull: false
   } ,
   tel: {
    type: DataTypes.STRING
   }
});

const Product_detail = sequelize.define('product_detail', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    brands:{
        type: DataTypes.STRING
    },
    product_code:{
        type: DataTypes.INTEGER
    },
    reward_points:{
        type: DataTypes.INTEGER
    },
    ex_tax: {
        type: DataTypes.DECIMAL(8, 2)
    }
});

const Basket = sequelize.define('basket', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    amount:{
        type: DataTypes.INTEGER ,
        defaultValue: 1
    }
});

Book.belongsToMany(Category, {through: Category_book});
Category.belongsToMany(Book, {through: Category_book});

Author.belongsToMany(Book, {through: Author_book});
Book.belongsToMany(Author, {through: Author_book});

Book.belongsToMany(Tag, {through: Tag_book});
Tag.belongsToMany(Book, {through: Tag_book});

Publisher.hasMany(Book, {onDelete: 'SET NULL', onUpdate: 'CASCADE'});
Book.belongsTo(Publisher, {onDelete: 'SET NULL', onUpdate: 'CASCADE'});
Book.hasMany(Image_book, {onDelete: 'SET NULL', onUpdate: 'CASCADE'});
Image_book.belongsTo(Book, {onDelete: 'SET NULL', onUpdate: 'CASCADE'});

Adress.hasMany(User, {onDelete: 'SET NULL', onUpdate: 'CASCADE'});
User.belongsTo(Adress, {onDelete: 'SET NULL', onUpdate: 'CASCADE'});
Role.hasMany(User, {onDelete: 'SET NULL', onUpdate: 'CASCADE'});
User.belongsTo(Role, {onDelete: 'SET NULL', onUpdate: 'CASCADE'});

User.hasMany(Order);
Order.belongsTo(User)
Adress.hasMany(Order);
Order.belongsTo(Adress);

Order.hasOne(Order_detail, {onDelete: 'SET NULL', onUpdate: 'CASCADE'});
Order_detail.belongsTo(Order, {onDelete: 'SET NULL', onUpdate: 'CASCADE'});

Product_detail.hasMany(Image_book, {onDelete: 'SET NULL', onUpdate: 'CASCADE'});
Image_book.belongsTo(Product_detail, {onDelete: 'SET NULL', onUpdate: 'CASCADE'});
Book.hasOne(Product_detail, {onDelete: 'SET NULL', onUpdate: 'CASCADE'});
Product_detail.belongsTo(Book, {onDelete: 'SET NULL', onUpdate: 'CASCADE'});
User.hasMany(Basket, {onDelete: 'SET NULL', onUpdate: 'CASCADE'});
Basket.belongsTo(User, {onDelete: 'SET NULL', onUpdate: 'CASCADE'});
Book.hasOne(Basket, {onDelete: 'SET NULL', onUpdate: 'CASCADE'});
Basket.belongsTo(Book, {onDelete: 'SET NULL', onUpdate: 'CASCADE'});
sequelize.sync();
module.exports = {Adress ,Author, Author_book ,User, Role, Book, Category, Image_book, Order, Order_detail, Publisher, Tag, Basket, Category_book, Product_detail, Tag_book} ;