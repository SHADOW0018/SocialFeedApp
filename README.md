Required SQL DDL Command to check DB
create database feed;(feed database name)
SELECT * FROM feed.posts;
SELECT * FROM feed.users;
desc feed.users;
desc feed.posts;
tables are created with hibernate.ddl-auto autmomatically

To Run the Project 
U can use Eclipse or intellij 
in backend go to the main (SocialMediaAppApplication.java) and run it as SpringBootApp after that 
open Frontend then at terminal check the dependencies are install if not then type -npm install it will install all the requried dependencies
after that type -npm start then project will run successfully 
