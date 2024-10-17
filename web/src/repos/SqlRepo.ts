import { randomUUID, UUID } from 'crypto';
import sqlite3 from 'sqlite3';

export const db = new sqlite3.Database("src/repos/users.db");

// db.get(
//   'SELECT ID, username FROM users',
//   (_: any, res:any) => console.log(res)
// );

export function register(username: String, email: String, password: String, gender: String, SpecialAbled: String) {
  db.serialize(() => {
    db.run(`INSERT INTO users ( username, email, password, gender, sa) VALUES ('${username}', '${email}', '${password}','${gender}','${SpecialAbled}')`)
  });
}

export function login(username: String, password: String): UUID {
  let uuid = randomUUID();
  db.serialize(() => {
    db.get(`SELECT * FROM users WHERE username='${username}' AND password='${password}'`, (err: any, row: any) => {
      if (!row) {
        throw new Error("Invalid Login");
      }
      db.run("REPLACE INTO authentication(ID,token) VALUES(?,?)", row.ID, uuid);
    })
  })
  return uuid;
}

export function fetchUser(token: number) {
  db.serialize(() => {
    db.get("select ID from authentication where token=?", token, (err, res: any) => {
      console.log(`fetchUser: ${JSON.stringify(res)}`)
      db.get("select * from users where ID=?", res.ID, (err, res2) => {
        if (err) {
          console.log(err);
          throw new Error("Invalid ID");
        }
        if (res) {
          console.log(`fetchUser2: ${JSON.stringify(res2)}`);
          return res2;
        }
      });

    })

  })
}

export function fetchOutfit(id: number){
  db.serialize(()=>{
    db.get("select * from outfits where ID=?", id,(err,res)=>{
      if(res)
        return res;
      else
        console.log(err);
    })
  })
}

export function like(user: any,outfit: any){
  db.serialize(()=>{
    db.get("select 1 from likes where user_id=? and outfit_id=?",[user.ID, outfit.ID],
      (err, res)=>{
        if(err)
          {
            console.log(err);
          }
        if(!res){
          db.run("UPDATE outfits set likes=likes+1 where ID=?",outfit.ID)
          db.run("INSERT into likes(user_id,outfit_id) VALUES(?,?)",[user.ID, outfit.ID])
        }
        else{
          db.run("UPDATE outfits set likes = likes-1 where ID=?",outfit.ID);
          db.run("DELETE FROM likes where user_id=? AND outfit_id=?", user.ID, outfit.ID);
        }
    })
  })
}

export function close() {
  db.close();
}
