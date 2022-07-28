# Double-Call API
Double-Call API is an API that is used to get a specific movie poster. API resources are obtained from OMDB third party services.

Some of features include:
- get movie poster url
- add movie title to favorite movie data
- get favorite movie poster data

This project uses :
- express
- eslint to standardize code
- sequelize ORM
- Bearer authorization header
- using dummy data
- relational database like postgresql

## FOLDER STRUCTURE
* **src**
  * **config** | config of db and etc
  * **controller** | controller layer
  * **middlewares** | express middleware
  * **migrations** | migration files
  * **models** | model layer
  * **routes** | express router
  * **seeders** | seeder files
  * **services** | business logic
  * server.js | express server
* .env | environment file
* dummyData.json | some users dummy data
* getAccessToken.js | file that use to generate JWT Token




## HOW TO USE
1. Clone this repo
  ```
  $ git clone https://github.com/Ian-72/double-call-api.git
  $ cd double-call-api
  ```

2. Install pnpm package manager to make your storage more efficient
  ```
  $ npm install pnpm -g
  ```

3. Install the required modules
  ```
  $ pnpm install
  ```

4. Setup environment variable in .env file, make sure you have started postgresql service. example for development environment :
  ```
  # server configuration
  HOST=
  PORT=
  CORS=
  ENV=development

  # database configuration
  DEV_DB_USERNAME=devtes
  DEV_DB_PASSWORD=123
  DEV_DB_DATABASE=dbtes
  DEV_DB_HOST=localhost
  DEV_DB_DIALECT=postgres

  # cookie key
  COOKIE_KEY=8b60e9e5ed174f2224604047ec245177

  # jwt token key
  ACCESS_TOKEN_KEY=ec07ef27d7db533fb4f931019660377c1780ff4b4721327e0dde244c7f9bf33082a9b67b56222c7ebf51c8494ca607283e4fd6fb3689092f9150a6e8eb2af8e1

  # IMDB ID and OMDB API KEY
  IMDB_ID=
  OMDB_API_KEY=

  # example user dummy data
  TEST_USERNAME=john
  TEST_USERPASSWD=password123
  ```

  You need set IMDB_ID and OMDB_API_KEY to interact with OMDB third party API then you can use user dummy data based on dummyData.json file, if you don't set TEST_USERNAME and TEST_USERPASSWORD program will select data randomly based on the dummyData.json file in step 6. For cookie key you can use random string.

5. run migrate, and seeder
  ```
  $ npm run migrate
  $ npm run seed
  ```

6. Get your access token
  ```
  $ npm run get-jwt
  ```

7. Start server
  ```
  $ npm run start
  ```



## API DOC

| Method        | Path Endpoint         | Description                                           |
| ------------- | --------------------- | ----------------------------------------------------- |
| `GET`         | /movies               | disallowed endpoint (403 Forbidden)                   |
| `GET`         | /movies/{movie title} | Return poster url of that movie                       |
| `POST`        | /movies/favorite      | Insert into user’s favorite movies                    |
| `GET`         | /movies/favorite      | Return all poster url of that user’s favorite movies  |


*Note:*
- non-documented endpoints will return a 404 response
- request response using content type application/json
- using Authorization: Bearer
- Any request to endpoint should be authenticated using bearer token, otherwise return 403
- this API use cookie


**POST** /movies/favorite
payload :
- movieTitle :: String