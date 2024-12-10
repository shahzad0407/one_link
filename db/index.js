// import 'dotenv/config';
// import { drizzle } from 'drizzle-orm/node-postgres';
// import { eq } from 'drizzle-orm';
// import { userTable } from './schema';
// import { links } from './schema';
  
// const db = drizzle(process.env.DATABASE_URL);

//  async function main() {
//   const user = {
//     username: "shahzad",
//   email: "shahzadahmedsiddiqui04@gmail.com",
//   password: "123456",
//   verifyCode: "00000",
//   verifyCodeExpiry: new Date(),
//   };
//   const linkstoadd ={
//     link:"link 1",
//     linkText:"google.com",
//     userId:2
//   }

//   await db.insert(links).values(linkstoadd);
//   console.log('New user created!')

//   const users = await db.select().from(userTable);
//   const linksupdated = await db.select().from(links);
//   console.log('Getting all users from the database: ', users)
//   console.log('Getting all links from the database: ', links)
//   /*
//   const users: {
//     id: number;
//     name: string;
//     age: number;
//     email: string;
//   }[]
//   */

// //   await db
// //     .update(usersTable)
// //     .set({
// //       age: 31,
// //     })
// //     .where(eq(usersTable.email, user.email));
// //   console.log('User info updated!')

// //   await db.delete(usersTable).where(eq(usersTable.email, user.email));
// //   console.log('User deleted!')
// }

// main();
