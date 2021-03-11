# Hack The North 2021 Backend Challenge

This is a REST API made with Express and SQLite for Hack the North's backend coding challenge. By default, the application is hosted locally at http://localhost:5000.

### Users Endpoints

---

`GET /users/` - Returns information on all users

- **Response JSON Schema:**

  ```json
    [
      {
        "id": <int>,
        "name": <string>,
        "picture": <string>,
        "company": <string>,
        "email": <string>,
        "phone": <string>,
        "skills": [
          {
            "id": <int>,
            "name": <string>,
            "rating": <int>,
            "user_id": <int>
          }
        ]
      }
    ]
  ```

`POST /users/` - Create a new user

- **Response JSON Schema:**

  ```json
    {
      "id": <int>,
      "name": <string>,
      "picture": <string>,
      "company": <string>,
      "email": <string>,
      "phone": <string>,
      "skills": [
        {
          "id": <int>,
          "name": <string>,
          "rating": <int>,
          "user_id": <int>
        }
      ]
    }
  ```

- **Body JSON Schema:**

  ```json
    {
      "id": <int>,
      "name": <string>,
      "picture": <string>,
      "company": <string>,
      "email": <string>,
      "phone": <string>,
      "skills": [
        {
          "id": <int>,
          "name": <string>,
          "rating": <int>,
          "user_id": <int>
        }
      ]
    }
  ```

  - name and email fields are required; all other fields are optional

`PUT /users/:id` - Update user information

- **Route params**:
  - **id**: id of row in database, corresponding to "id" column
- **Response JSON Schema:**

  ```json
    {
      "id": <int>,
      "name": <string>,
      "picture": <string>,
      "company": <string>,
      "email": <string>,
      "phone": <string>,
      "skills": [
        {
          "id": <int>,
          "name": <string>,
          "rating": <int>,
          "user_id": <int>
        }
      ]
    }
  ```

- **Body JSON Schema:**

  ```json
    {
      "id": <int>,
      "name": <string>,
      "picture": <string>,
      "company": <string>,
      "email": <string>,
      "phone": <string>,
      "skills": [
        {
          "id": <int>,
          "name": <string>,
          "rating": <int>,
          "user_id": <int>
        }
      ]
    }
  ```

  - all fields are optional; only given fields are updated

`DELETE /users/:id` - Delete user from database

- **Route params**:
  - **id**: id of row in database, corresponding to "id" column
- **Response JSON Schema:**

  ```json
    {
      "id": <int>,
      "name": <string>,
      "picture": <string>,
      "company": <string>,
      "email": <string>,
      "phone": <string>,
      "skills": [
        {
          "id": <int>,
          "name": <string>,
          "rating": <int>,
          "user_id": <int>
        }
      ]
    }
  ```

### Skills Endpoints

---

`GET /skills/` - Returns information on all users

- **Query params:**

  - **min_frequency**: `<int>`
    - only skills with at least (inclusive) this many occurrences will be returned
  - **max_frequency**: `<int>`
    - only skills with at most (inclusive) this many occurrences will be returned

- **Response JSON Schema:**

  ```json
    [
      {
        "name": <string>,
        "frequency": <int>
      }
    ]
  ```

- **Example:**
  - `GET localhost:5000/skills/?min_frequency=5&max_frequency=10`

### Database Schemas

---

For this challenge, the SQLite database schema consists of two tables: users and skills. The schemas are as follows:

#### **User**

| id        | name   | picture | company | email  | phone  |
| --------- | ------ | ------- | ------- | ------ | ------ |
| `INTEGER` | `TEXT` | `TEXT`  | `TEXT`  | `TEXT` | `TEXT` |

Notes:

- `id` is the primary key and is auto-incremented.
- `email` is not nullable, and must be unique.

#### **Skills**

| id        | name   | rating    | user_id   |
| --------- | ------ | --------- | --------- |
| `INTEGER` | `TEXT` | `INTEGER` | `INTEGER` |

Notes:

- `id` is the primary key and is auto-incremented.
- `user_id` is a foreign key which references the `User` table's `id` key. On deletion, the skill cascades (i.e. deleting a user will delete all associated skills).

### Local Installation

---

1. Download the repository
2. cd to the directory and `npm install` the dependencies:

```
    "cors"
    "dotenv"
    "express"
    "sequelize"
    "sqlite3"
```

3. Run `npm run dbpopulate` to create and populate the local SQLite database.
4. Run `npm run build` and `npm start` to run the application in production mode or run `npm run dev` to run the application in development mode.
5. The API should now be running on http://localhost:5000. Try out some API calls on postman or however else you feel!
