import { connection } from "../../DB/connection.db.js";

export const signup = ((req , res , next) => {
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

export const login = (req, res, next) => {
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
};
