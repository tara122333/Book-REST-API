const { response, json } = require("express");
const express =require("express");

const database = require("./DataBase/index.js");


const tara = express();

//root

tara.get("/",(request,response)=>{
    return response.json({tara : database});
});


/*
Route           /is
Description     Get specific books based on ISBN
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
tara.get("/is/:isbn",(req,res)=>{
    const getBooksISBN = database.books.filter((book)=>book.ISBN===req.params.isbn);
    if(getBooksISBN.length===0){
        return res.json({error : "There is no ISBN availabasubdu"});
    }
    return res.json({book : getBooksISBN});

});

/*
Route           /c
Description     Get specific books based on category
Access          PUBLIC
Parameter       category
Methods         GET
*/
tara.get("/c/:category",(req,res)=>{
    const getSpecificBook = database.books.filter((book)=>book.category.includes(req.params.category));
    if(getSpecificBook.length===0){
        return res.json({error : "There is no category of book"});
    }
    return res.json({book : getSpecificBook});
});


/*
Route           /a
Description     Get specific books based on Authors
Access          PUBLIC
Parameter       authors
Methods         GET
*/

tara.get("/a/:authors",(req,res)=>{
    const getAuthorBook = database.books.filter((book)=>book.authors.includes(JSON.parse(req.params.authors)));
    if(getAuthorBook.length===0){
        return res.json({error : "There is no value find"});
    }
    return res.json({Books : getAuthorBook});
});


/*
Route           /author
Description     get all authors
Access          PUBLIC
Parameter       NONE
Methods         GET
*/

tara.get("/author",(req,res)=>{
    const getAuthorData = database.authors;
    return res.json({Author : getAuthorData});
});




/*
Route           /author
Description     get all authors based on books
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
tara.get("/author/:name",(req,res)=>{
    const getAuthorName = database.authors.filter((name)=>name.name===req.params.name);
    if(getAuthorName.length===0){
        return res.json({error : "Can not find any specific author name "})
    }
    return res.json({Author : getAuthorName});
});



/*
Route           /author/book
Description     get all authors based on books
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
tara.get("/author/book/:isbn",(req,res)=>{
    const getAuthorBookData = database.authors.filter((author)=>author.books.includes(req.params.isbn));
    if(getAuthorBookData.length===0){
        return res.json({error : "there is no author book data"});
    }
    return res.json({Books : getAuthorBookData});
});


/*
Route           /publication
Description     get all publication based on books
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
tara.get("/publication",(req,res)=>{
    const getPublicationData = database.publications;
    return res.json({Publication : getPublicationData});
})


/*
Route           /publication
Description     get all publication based on books
Access          PUBLIC
Parameter       id
Methods         GET
*/
tara.get("/publication/:id",(req,res)=>{
    const getSpecificPublicationData = database.publications.filter((id)=>id.id==req.params.id);
    if(getSpecificPublicationData.length===0){
        return res.json({error : "there is no specification Publication Data"});
    }
    return res.json({Publication : getSpecificPublicationData});
});



/*
Route           /publication/book
Description     get all publication based on books
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
tara.get("/publication/book/:isbn",(req,res)=>{
    const getSpecificISBNPublicationData = database.publications.filter((publication)=>publication.books.includes(req.params.isbn));
    if(getSpecificISBNPublicationData.length===0){
        return res.json({error : "There is not Found Specific Publication Author Book"});
    }
    return res.json({Publication : getSpecificISBNPublicationData});
});



// server Listen
tara.listen(3000,()=>{
    console.log("Server has been running on port 3000");
})