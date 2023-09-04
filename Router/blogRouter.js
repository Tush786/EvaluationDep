const {Router} = require("express");

const {BlogModel} = require("../model/blogModel")
const {UserModel} = require("../model/userModel")

const BlogRoutes = Router();

BlogRoutes.get("/", async (req, res)=>{

    let FiltersData = {};
    if (req.query.category) {
        FiltersData.category = req.query.category;
    }

    if (req.query.author) {
        FiltersData.author = req.query.author;
    }
    const blogs = await BlogModel.find(FiltersData);
    res.send('Your blog')
})

BlogRoutes.post("/create", async(req,res)=>{
    const {Title, Category, Content,Image} = req.body;
    console.log(req.body)

    const userId = req.userId;
    console.log(userId)
    const user = await UserModel.findOne({_id: userId})

    const Create_blog = new BlogModel({
        Title,
        Category,
        Content,
        Image,
        email:user.email,
        Author: user.name,
    })
    console.log(Create_blog)
    await new_blog.save();
    res.end("Blog Created")
})

BlogRoutes.delete("/delete/:blogiD", async(req,res)=>{
    const blogiD = req.params.blogiD;
    const user_id = req.userId;
    const user = await UserModel.findOne({_id: user_id})
        await BlogModel.findByIdAndDelete(blogiD)
        res.send(`blog ${blogiD} deleted`)
})

BlogRoutes.put("/edit/:blogiD", async(req,res)=>{
    const blogiD = req.params.blogiD;
    const UpdatatedData  = req.body;
    const user_id = req.userId;
    const user = await UserModel.findOne({_id: user_id})
    await BlogModel.findByIdAndUpdate(blogiD, UpdatatedData)
    res.send(`blog ${blogiD} updated`)
    
})

module.exports = {BlogRoutes}