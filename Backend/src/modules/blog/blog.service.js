import { connection } from "../../DB/connection.db.js";

// Create Blog Route
export const createBlog = (req , res , next) => {
    const {title , content , authorId} = req.body;
    // console.log({title , content , authorId});
    const sql = `select * from users where u_id=?`;
    connection.execute(sql , [authorId] , (error , data) => {
        if(error) {
            return res.status(500).json({message: "Error creating blog", error: error});
        }
        if(!data.length){
            return res.status(404).json({message: "Author not found"});
        }
        const insertQuery = `INSERT INTO BLOGS (b_title, b_content, b_author_id) VALUES (?, ?, ?)`; 
        connection.execute(insertQuery , [title , content , authorId] , (error , data) => {
            if(error){
                return res.status(500).json({message: "Error creating blog", error: error});
            }
            return res.status(201).json({message: "Blog created successfully", data});
        })
    })
}

// List Blogs
export const listBlogs = (req , res , next) =>{
    const sql = `select users.u_firstName, blogs.* from users left join blogs on users.u_id = blogs.b_author_id`;
    connection.execute(sql, (error, data) => {
      if (error) {
        return res.status(500).json({ message: "Error creating blog", error: error });
      }
    return res.status(201).json({ message: "Blogs fetched successfully", data });
}) 
}
