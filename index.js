const { response, json } = require("express");
//environment
require("dotenv").config();

//import MongoDb file
const BookModule = require("./DataBase/books");
const AuthorModule = require("./DataBase/authors");
const PublicationModule = require("./DataBase/publications");



// import express
const express =require("express");

// import mongoose
const mongoose = require("mongoose");
const { add } = require("nodemon/lib/rules");

//import localDataBase
// const database = require("./DataBase/index.js");

// name of app
const tara = express();
tara.use(express.json());

// connection DataBase
mongoose.connect(
    process.env.MONGO___URL,
).then(()=>console.log("Connection established 😎😎"));


//root

tara.get("/", async (request,response)=>{
    const getAllBooksData = await BookModule.find();
    return response.json(getAllBooksData);
});



/*
Route           /is
Description     Get specific books based on ISBN
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
tara.get("/is/:isbn",async (req,res)=>{

    // localDatabase
    // const getBooksISBN = database.books.filter((book)=>book.ISBN===req.params.isbn);
    
    // if(getBooksISBN.length===0){
    //     return res.json({error : "There is no ISBN availabasubdu"});
    // }

    // MongoDataBase
    const getBooksISBN = await BookModule.findOne({ISBN:req.params.isbn});
    if(!getBooksISBN) return res.json({error : "There is no ISBN availabasubdu"});

    return res.json({book : getBooksISBN});
});




/*
Route           /c
Description     Get specific books based on category
Access          PUBLIC
Parameter       category
Methods         GET
*/
tara.get("/c/:category",async (req,res)=>{
    // local DataBase
    // const getSpecificBook = database.books.filter((book)=>book.category.includes(req.params.category));
    // if(getSpecificBook.length===0){
    //     return res.json({error : "There is no category of book"});
    // }
    const getSpecificBook = await BookModule.findOne({category:req.params.category});
    if(!getSpecificBook) return res.json({error : "There is no category of book"});

    return res.json({book : getSpecificBook});
});


/*
Route           /a
Description     Get specific books based on Authors
Access          PUBLIC
Parameter       authors
Methods         GET
*/

tara.get("/a/:authors",async (req,res)=>{

    // localDatabase
    // const getAuthorBook = database.books.filter((book)=>book.authors.includes(JSON.parse(req.params.authors)));
    // if(getAuthorBook.length===0){
    //     return res.json({error : "There is no value find"});
    // }

    // MongoDataBase
    const getAuthorBook = await BookModule.findOne({authors:req.params.authors});
    if(!getAuthorBook) return res.json({error : "There is no Author Book find"});

    return res.json({Books : getAuthorBook});
});


/*
Route           /author
Description     get all authors
Access          PUBLIC
Parameter       NONE
Methods         GET
*/

tara.get("/author",async (req,res)=>{
    //localDataBase
    // const getAuthorData = database.authors;
    const getAuthorBookData = await AuthorModule.find();
    if(!getAuthorBookData) return res.json({error : "No Author Data Find"});

    return res.json({Author : getAuthorBookData});
});


/*
Route           /author
Description     get specific authors
Access          PUBLIC
Parameter       id
Methods         GET
*/

tara.get("/author/:id", async (req,res)=>{

    //MongoDb
    const getAuthorName = await AuthorModule.findOne({id : req.params.id});
    if(!getAuthorName) return res.json({error : "Can not find any specific author "})

    //localDataBase
    // const getAuthorName = database.authors.filter((name)=>name.name===req.params.name);
    // if(getAuthorName.length===0){
    //     return res.json({error : "Can not find any specific author name "})
    // }

    return res.json({Author : getAuthorName});
});



/*
Route           /author/book
Description     get all authors based on books
Access          PUBLIC
Parameter       isbn
Methods         GET
*/

tara.get("/author/book/:isbn",async (req,res)=>{

    //MongoDB

    const getAuthorBookData = await AuthorModule.findOne({book:req.params.isbn});
    if(!getAuthorBookData) return res.json({error : "there is no author book data"});

    //localDataBase
    // const getAuthorBookData = database.authors.filter((author)=>author.books.includes(req.params.isbn));
    // if(getAuthorBookData.length===0){
    //     return res.json({error : "there is no author book data"});
    // }
    return res.json({Books : getAuthorBookData});
});


/*
Route           /publication
Description     get all publication based on books
Access          PUBLIC
Parameter       NONE
Methods         GET
*/

tara.get("/publication",async (req,res)=>{
    // MongoDB
    const getPublicationData = await PublicationModule.find();
    if(!getPublicationData) return res.json({Error : "There is no All Author Data find"});

    //localDataBase
    // const getPublicationData = database.publications;
    return res.json({Publication : getPublicationData});
})


/*
Route           /publication
Description     get specific publication based id
Access          PUBLIC
Parameter       id
Methods         GET
*/
tara.get("/publication/:id",async (req,res)=>{

    //MongoDb
    const getSpecificPublicationData = await PublicationModule.findOne({id:req.params.id});
    if(!getSpecificPublicationData) return res.json({Error : "There is no specification Data Based on id"});

    // localDataBase
    // const getSpecificPublicationData = database.publications.filter((id)=>id.id==req.params.id);
    // if(getSpecificPublicationData.length===0){
    //     return res.json({error : "there is no specification Publication Data"});
    // }
    return res.json({Publication : getSpecificPublicationData});
});


/*
Route           /publication/book
Description     get all publication based on books
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
tara.get("/publication/book/:isbn",async(req,res)=>{

    // MongoDb
    const getSpecificISBNPublicationData = await PublicationModule.findOne({books:req.params.isbn});
    if(!getSpecificISBNPublicationData) return res.json({Error : "There is no specification Data Based on Book"});
    //localData
    // const getSpecificISBNPublicationData = database.publications.filter((publication)=>publication.books.includes(req.params.isbn));
    // if(getSpecificISBNPublicationData.length===0){
    //     return res.json({error : "There is not Found Specific Publication Author Book"});
    // }
    return res.json({Publication : getSpecificISBNPublicationData});
});

//------------------------------------------------------------------------------------



///-----------POST METHOD ---------------------------------------------------


tara.post("/book/new",async (req,res)=>{

    const {newBook,} = req.body;
    const addNewBooks = BookModule.create(newBook);
    // console.log(addNewBooks);
    return res.json({books : addNewBooks, message : "book Addede!!!"});
});


tara.post("/author/new",async (req,res)=>{
    const {newAuthor} = req.body;
    const addNewAuthor = AuthorModule.create(newAuthor);
    return res.json({author : addNewAuthor, message : "Author Addede!!!"});
});

tara.post("/publication/new",async (req,res)=>{
    const {addPublication} = req.body;
    const addNewPublication = PublicationModule.create(addPublication);
    return res.json({Publication : addNewPublication, Message : "Publication added!!!"});
});


// =========--------------=========------ PUT Method------==========-----------------=========
tara.put("/book/update/:isbn",async (req,res)=>{
    const updateBookDetail = await BookModule.findOneAndUpdate(
        {
            ISBN : req.params.isbn,
        },
        {
            title:req.body.updateTitle,
        },
        {
            new:true,
        },

        );
        return res.json({Book : updateBookDetail});
});


// server Listen
tara.listen(3000,()=>{
    console.log("Server has been running on port 3000");
});