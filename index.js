const mySql2 = require('mysql2');
const express = require('express');
const app = express();
const port = 3000;

const connection = mySql2.createConnection({
  database: "Blog App",
  port: '3306',
  password: "",
  user: "root",
});

connection.connect((err) =>{
    if(err) 
        console.error('Error connecting to the database:', err);
    else
        console.log('Connected to the database successfully!');
})

app.use(express.json());
app.get('/', (req, res) => {
    const sql = "SELECT * FROM USERS";
    connection.execute(sql , (error , results) => {
        if(error){
            return res.status(500).json({message: "Error fetching users", error: error});
        }
        res.json({message: "Users fetched successfully", data: results});
    });   
});
// Signup Route
app.post('/auth/signup', (req , res , next) => {
    const {
      firstName,
      middleName,
      lastName,
      email,
      password,
      confirmPassword,
    } = req.body;
    if(password !== confirmPassword){
        return res.status(400).json({message: "Password and confirm password do not match"});
    }
    const sql = "SELECT * FROM USERS WHERE  u_email=?";
    connection.execute(sql , [email], (error, results)=>{
        if(error){
            return res.status(500).json({message: "Error checking existing user", error: error});
        }
        if(results.length){
            return res.status(409).json({message: "User with this email already exists"});
        }
        const insertQuery =
          "INSERT INTO USERS (u_firstName, u_middleName, u_lastName, u_email, u_password) VALUES (?, ?, ?, ?, ?)";
        connection.execute(insertQuery, [
          firstName,
          middleName,
          lastName,
          email,
          password,
        ], (error , data) =>{
            if(error) {
                return res.status(500).json({message: "Error creating user", error: error});
            }
            return res.status(201).json({message: "Signup successful", data: data});
        });

    })
})
// Login Route
app.post('/auth/login', (req, res, next) => {
    const {email , password} = req.body;
    // console.log({email, password});
    const sql = "SELECT * FROM USERS WHERE u_email=? AND u_password=?";
    connection.execute(sql ,[email , password] , (error , data) =>{
        if(error){
            return res.status(500).json({message: "Error during login", error: error});
        }
        if(!data.length){
            return res.status(404).json({message: "Invalid email or password"});
        }  
        return res.status(200).json({message: "Login successful", data: data});
    })
});

// User Profile Route
app.get('/user/:id/profile' , (req, res , next) =>{
    const {id} = req.params;
    console.log({id});
    const sql = `
    SELECT concat(u_firstName , ' ', u_middleName, ' ', u_lastName) as fullName, u_email,u_id, convert(DATEDIFF(NOW() , u_DOB) / 365.5, int) as age
    from USERS WHERE u_id=?
    `
    connection.execute(sql , [id] , (error , data) => {
        if(error) {
            return res.status(500).json({message: "Error fetching user profile", error: error});
        }
        data.length? res.status(200).json({message: "User profile fetched successfully", data: data}) : res.status(404).json({message: "User not found"});
    })  
})
//  Search Users Route
app.get('/user/search', (req , res , next) =>{
    const { searchKey } = req.query;
    const sql = `
        SELECT * FROM USERS WHERE u_firstName like ?
    `
    connection.execute(sql, ['%' + searchKey + '%'], (error, data) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "Error searching users", error: error });
      }
      data.length
        ? res
            .status(200)
            .json({ message: "Users found successfully", data: data })
        : res.status(404).json({ message: "No users found" });
    });
})
// Update User Profile Route
app.patch("/user/:id" , (req , res , next) =>{
    const {id} = req.params;
    const {firstName , DOB} = req.body;
    const sql = "UPDATE USERS SET u_DOB=? , u_firstName=? WHERE u_id=?";
    connection.execute(sql , [DOB , firstName , id] , (error , data) => {
        if(error){
            return res.status(500).json({message: "Error updating user profile", error: error});
        }
    return data.affectedRows? res.status(200).json({message: "User profile updated successfully", data: data}) : res.status(404).json({message: "User not found"});
    })
})
// Delete User Route
app.delete("/user/:id" , (req , res , next) =>{
    const {id} = req.params;
    const sql = "delete from users where u_id=?";
    connection.execute(sql , [id] , (error , data) => {
        if(error){
            return res.status(500).json({message: "Error deleting user", error: error});
        }
    return data.affectedRows? res.status(200).json({message: "User deleted successfully", data: data}) : res.status(404).json({message: "User not found"});
    })
})
// Create Blog Route
app.post("/blog" , (req , res , next) => {
    const {title , content , authorId} = req.body;
    console.log({title , content , authorId});
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
})

// List Blogs
app.get("/blog" , (req , res , next) =>{
    const sql = `select users.u_firstName, blogs.* from users left join blogs on users.u_id = blogs.b_author_id`;
    connection.execute(sql, (error, data) => {
      if (error) {
        return res.status(500).json({ message: "Error creating blog", error: error });
      }
      return res.status(201).json({ message: "Blogs fetched successfully", data });
}) 
})





app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});