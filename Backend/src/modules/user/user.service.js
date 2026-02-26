export const getProfile = (req, res , next) =>{
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
}
//  Search Users Route
export const searchUsers = (req , res , next) =>{
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
}
// Update User Profile Route
export const updateProfile = (req , res , next) =>{
    const {id} = req.params;
    const {firstName , DOB} = req.body;
    const sql = "UPDATE USERS SET u_DOB=? , u_firstName=? WHERE u_id=?";
    connection.execute(sql , [DOB , firstName , id] , (error , data) => {
        if(error){
            return res.status(500).json({message: "Error updating user profile", error: error});
        }
    return data.affectedRows? res.status(200).json({message: "User profile updated successfully", data: data}) : res.status(404).json({message: "User not found"});
    })
}
// Delete User Route
export const deleteUser = (req , res , next) =>{
    const {id} = req.params;
    const sql = "delete from users where u_id=?";
    connection.execute(sql , [id] , (error , data) => {
        if(error){
            return res.status(500).json({message: "Error deleting user", error: error});
        }
    return data.affectedRows? res.status(200).json({message: "User deleted successfully", data: data}) : res.status(404).json({message: "User not found"});
    })
}
