import mySql2 from "mysql2";

export const connection = mySql2.createConnection({
  database: "Blog App",
  port: '3306',
  password: "",
  user: "root",
});


export function stablishConnection(){
    connection.connect((err) =>{
    if(err) 
        console.error('Error connecting to the database:', err);
    else
        console.log('Connected to the database successfully!');
})
}

