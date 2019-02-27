##Clone the project 


##cd /hope



##npm i 
Make sure to install typescript,mongo,npx,node
in project folder run npx tsc
and then run nodemon start



####http://localhost:3000/users/fetch-users ==>method Post ==> to fetch all the users from json_placeholder and save in database
for simplicity I have taken only 4 to 5 fields


####http://localhost:3000/users  ==>method get ==> to fetch all users from mongodb

####http://localhost:3000/users/update-avatar method post and send {"userId :1,"avatar": "base64string"} to update the avatar

####http://localhost:3000/posts/fetch-posts ==>method post to fetch all the posts from json placeholder and save in mongodb with comments.








####http://localhost:3000/posts/get-user-post ===>method post  ==> send {"userId:1} to get all the post related to particular users in database with comment

