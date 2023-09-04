const mongoose = require("mongoose")


const blogSchema = mongoose.Schema(
    {
        Title:{type:"String", required:true},
        Category :{type:"String", required:true},
        Author :{type:"String", required:true},
         Content :{type:"String", required:true},
        Image :{type:"String"}
    }
)
const BlogModel = mongoose.model("Blog", blogSchema);


module.exports = {BlogModel}