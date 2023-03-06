
const adminId = ObjectId();
const userId = ObjectId();


db = db.getSiblingDB('dashboard');

db.roles.insertMany([
   {"_id" : userId,  name: "ROLE_USER" },
   { "_id" : adminId, name: "ROLE_ADMIN" },
])


db.users.insertOne(
   {
     _id: ObjectId("6405eeb96b477f3e04f8d86b"),
     username: 'admin',
     email: 'admin@admin.com',
     password: '$2a$10$R5OvPjsV7AApxyCQKvjgleohiBZT/vsv99w1pULwPl8R4JEkmrVBO', // admin
     roles: [
       DBRef("roles", adminId),
       DBRef("roles", userId)
     ],
     _class: 'com.app.dashboardapi.model.User'
   }
 )


