Time Value Assessor App

The purpose of this app is to allow users to assess the value of their "neutral time" (i.e. time spent doing regular tasks outside of work) in order to determine if it would be more advantageous to outsource and pay a service provider for task completion, or continue to do the task(s) themselves.

This server is written in JavaScript. Data is persisted utilizing PostgreSQL and NodeJS ORM library (Sequelize). It uses database associations and has full CRUD for two items. It allows for user registration and login with JWT authentication (REST-ful API). There is also Role Based Access Control for admin users, as needed. 

This app is deployed through Heroku.