# Mongodb Blog
Training application - Blog system web-server based on Node.js + express framework"


### Run App:
1. Install all npm packages by "npm i"
2. Run: "npm start"


### Requests list:
Create (POST) - '/blogs':
---------------------------
Add body with fields:
* title: some title text,
* body: some body text
Create one blog item with title and main text.

Read (GET) - '/blogs':
---------------------------
Return list with blogs.

Read (GET) - '/blogs/{id}':
---------------------------
Return blog by id.

Update (PUT) - '/blogs/{id}':
---------------------------
Add body with fields:
* title: some title text,
* body: some body text
Update one blog item with new title and main text.

Delete (DELETE) - '/blogs/{id}':
---------------------------
Delete one item by id.


### logging
Also app create one log record in combined.log file once per each request.