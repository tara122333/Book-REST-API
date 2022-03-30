const { response } = require("express");
const express =require("express");

const database = require("./DataBase/index.js");


const tara = express();

//root

tara.get("/",(request,response)=>{
    return response.json({tara : "This is nice"});
});

tara.get("/:isbn",(req,res)=>{
    const getBooksISBN = database.books.filter((book)=>book.ISBN===req.params.isbn);
    if(getBooksISBN.length===0){
        return res.json({error : "There is no ISBN availabasubdu"});
    }
    return res.json({book : getBooksISBN});

});


tara.get("/c/:category",(req,res)=>{
    const getSpecificBook = database.books.filter((book)=>book.category.includes(req.params.category));
    if(getSpecificBook.length===0){
        return res.json({error : "There is no category of book"});
    }
    return res.json({book : getSpecificBook});
});







// server Listen
tara.listen(3000,()=>{
    console.log("Server has been running on port 3000");
})