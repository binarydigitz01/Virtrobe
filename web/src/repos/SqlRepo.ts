import { randomUUID, UUID } from 'crypto';
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database("src/repos/users.db");

// db.get(
//   'SELECT ID, username FROM users',
//   (_: any, res:any) => console.log(res)
// );

export function register(username: String, email: String, password: String, gender: String, SpecialAbled: String){
  db.serialize(() =>{
    db.run(`INSERT INTO users ( username, email, password, gender, sa) VALUES ('${username}', '${email}', '${password}','${gender}','${SpecialAbled}')`)
  });
}

export function login(username: String, password: String): UUID{
  let uuid = randomUUID();
  db.serialize(()=>{
    db.get(`SELECT * FROM users WHERE username='${username}' AND password='${password}'`,(err: any,row:any) => {
      if(!row){
        throw new Error("Invalid Login");
      }
      db.run("REPLACE INTO authentication(ID,token) VALUES(?,?)", row.ID, uuid);
    })
  })
  return uuid;
}

export function close(){
  db.close();
}
