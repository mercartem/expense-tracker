# Expense Tracker API
API for Expense Tracker App.

## Usage

- **User**
    - [Register](https://github.com/mercartem/expense-tracker/tree/develop/backend#register)
    - [Login](https://github.com/mercartem/expense-tracker/tree/develop/backend#login)
    - [Change Password](https://github.com/mercartem/expense-tracker/tree/develop/backend#change-password)
    - [Upload Image](https://github.com/mercartem/expense-tracker/tree/develop/backend#upload-image)
- **Balance**
    - [Set Balance](https://github.com/mercartem/expense-tracker/tree/develop/backend#set-balance)
    - [Get Balance](https://github.com/mercartem/expense-tracker/tree/develop/backend#get-balance)
- **Transactions**
    - [Create Transactions](https://github.com/mercartem/expense-tracker/tree/develop/backend#create-transactions)
    - [Get Transactions](https://github.com/mercartem/expense-tracker/tree/develop/backend#get-transactions)
    - [Get Transaction](https://github.com/mercartem/expense-tracker/tree/develop/backend#get-transaction)
    - [Update Transaction](https://github.com/mercartem/expense-tracker/tree/develop/backend#update-transaction)
    - [Delete Transaction](https://github.com/mercartem/expense-tracker/tree/develop/backend#delete-transaction)


**Register**
----
Allows to sign up to Expense Tracker App.

<details>

* **URL**

    /auth/register

* **Method:**

    `POST`

* **Headers:**

    None

* **Data Params:**

    ```json
      {
        "email": "user@mail.ru",
        "fullName": "user",
        "password": "12345"
      }
    ```

* **Query Params**

    None

* **URL Params**

    None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    ```json
      {
        "fullName": "user",
        "email": "user@mail.ru",
        "_id": "63f3c3489231626a3ef0f14d",
        "createdAt": "2023-02-20T19:00:24.088Z",
        "updatedAt": "2023-02-20T19:00:24.088Z",
        "__v": 0,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2YzYzM0ODkyMzE2MjZhM2VmMGYxNGQiLCJpYXQiOjE2NzY5MTk2MjQsImV4cCI6MTY3OTUxMTYyNH0.7MietBSm0tGNu_o9JfQ4FF0tPVuSNRWuRlLGz6ae8yI"
      }
    ```
</details>


**Login**
----
Log in to Expense Tracker App.

<details>

* **URL**

    /auth/login

* **Method:**

    `POST`

* **Headers:**

    None

* **Data Params:**

    ```json
      {
        "email": "user@mail.ru",
        "password": "12345"
      }
    ```

* **Query Params**

    None

* **URL Params**

    None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    ```json
      {
        "_id": "63f3c3489231626a3ef0f14d",
        "fullName": "user",
        "email": "user@mail.ru",
        "createdAt": "2023-02-20T19:00:24.088Z",
        "updatedAt": "2023-02-20T19:00:24.088Z",
        "__v": 0,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2YzYzM0ODkyMzE2MjZhM2VmMGYxNGQiLCJpYXQiOjE2NzY5MTk2MjQsImV4cCI6MTY3OTUxMTYyNH0.7MietBSm0tGNu_o9JfQ4FF0tPVuSNRWuRlLGz6ae8yI"
      }
    ```
</details>


**Change Password**
----
Change user's current password.

<details>

* **URL**

    /auth/me

* **Method:**

    `PATCH`

* **Headers:**

    {
      'Content-Type': 'application/json',
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2Q5NzQxNjllZGVkMGYxNTY3ZjI2NmMiLCJpYXQiOjE2NzU1MTQ0MDksImV4cCI6MTY3ODEwNjQwOX0.wLwSS7A_qTXqHACn4-aXCKn3l8IA72DcOlATZvXulJ8,
    }

* **Data Params:**

    ```json
      {
        "password": "67890"
      }
    ```

* **Query Params**

    None

* **URL Params**

    None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    ```json
      {
          "message": "Password changed successfully",
          "newToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzY5MjA5ODYsImV4cCI6MTY3OTUxMjk4Nn0.6P4lpVbqbDQ0BWdu8w9edXUtkkXaRomLErfZbDvDlqY"
      }
    ```
</details>


**Upload Image**
----
Set user's avatar.

<details>

* **URL**

    /upload

* **Method:**

    `POST`

* **Headers:**

    {
      'Content-Type': 'application/json',
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2Q5NzQxNjllZGVkMGYxNTY3ZjI2NmMiLCJpYXQiOjE2NzU1MTQ0MDksImV4cCI6MTY3ODEwNjQwOX0.wLwSS7A_qTXqHACn4-aXCKn3l8IA72DcOlATZvXulJ8,
    }

* **Data Params:**

    `form-data`
    **KEY:** image <br />
    **Value:** your picture

* **Query Params**

    None

* **URL Params**

    None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    ```json
      {
        "url": "/uploads/63f3c3489231626a3ef0f14d.jpg"
      }
    ```
</details>


**Set Balance**
----
Set user's initial balance.

<details>

* **URL**

    /balance/:id

* **Method:**

    `POST`

* **Headers:**

    {
      'Content-Type': 'application/json',
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2Q5NzQxNjllZGVkMGYxNTY3ZjI2NmMiLCJpYXQiOjE2NzU1MTQ0MDksImV4cCI6MTY3ODEwNjQwOX0.wLwSS7A_qTXqHACn4-aXCKn3l8IA72DcOlATZvXulJ8,
    }

* **Data Params:**

    ```json
      {
         "balance": 200
      }
    ```

* **URL Params:**

    `id=[user_id]`

* **Query Params**

    None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    ```json
      {
        "success": true
      }
    ```
</details>


**Get Balance**
----
Get user's current balance.

<details>

* **URL**

    /balance

* **Method:**

    `GET`

* **Headers:**

    {
      'Content-Type': 'application/json',
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2Q5NzQxNjllZGVkMGYxNTY3ZjI2NmMiLCJpYXQiOjE2NzU1MTQ0MDksImV4cCI6MTY3ODEwNjQwOX0.wLwSS7A_qTXqHACn4-aXCKn3l8IA72DcOlATZvXulJ8,
    }

* **Data Params:**

    None

* **Query Params**

    None

* **URL Params**

    None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 600

</details>


**Create Transaction**
----
Сreate a user transaction specifying certain parameters.

<details>

* **URL**

    /transactions

* **Method:**

    `POST`

* **Headers:**

    {
      'Content-Type': 'application/json',
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2Q5NzQxNjllZGVkMGYxNTY3ZjI2NmMiLCJpYXQiOjE2NzU1MTQ0MDksImV4cCI6MTY3ODEwNjQwOX0.wLwSS7A_qTXqHACn4-aXCKn3l8IA72DcOlATZvXulJ8,
    }

* **Data Params:**

     ```json
      {
        "category": "food",
        "description": "Vkusno I Tochka",
        "amount": 800,
        "paymentMode": "visa",
        "transactionType": "expense",
        "date": "2023-03-09T21:00:00.000Z",
        "time": "21:03"
      }
    ```

* **Query Params**

    None

* **URL Params**

    None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    ```json
      {
        "category": "food",
        "description": "Vkusno I Tochka",
        "amount": 800,
        "paymentMode": "visa",
        "transactionType": "expense",
        "date": "2023-03-09T21:00:00.000Z",
        "time": "21:03",
        "user": "63f3c3489231626a3ef0f14d",
        "_id": "63f3cea29231626a3ef0f15c",
        "createdAt": "2023-02-20T19:48:50.939Z",
        "updatedAt": "2023-02-20T19:48:50.939Z",
        "__v": 0
      }
    ```
</details>


**Get Transactions**
----
Get all user's transactions.

<details>

* **URL**

    /user/transactions

* **Method:**

    `GET`

* **Headers:**

    {
      'Content-Type': 'application/json',
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2Q5NzQxNjllZGVkMGYxNTY3ZjI2NmMiLCJpYXQiOjE2NzU1MTQ0MDksImV4cCI6MTY3ODEwNjQwOX0.wLwSS7A_qTXqHACn4-aXCKn3l8IA72DcOlATZvXulJ8,
    }

* **Data Params:**

    None

* **Query Params**

    **Required:**

      `_limit=[integer]`

    **Optional:**

      `_page=[integer]`

      `_from=[dateISO]`
      `_to=[dateISO]`

      `_search=[string]`

      `_category=[string]`
      `_description=[string]`
      `_amount=[integer]`
      `_paymentMode=[string]`
      `_transactionType=['income' | 'expense']`

    If `_limit` param is equal to 0 you will receive all your transactions.

    If you're using `_from` param you should use `_to` and conversely.

* **URL Params**

    None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    ```json
      [
        {
          "category": "food",
          "description": "Vkusno I Tochka",
          "amount": 800,
          "paymentMode": "visa",
          "transactionType": "expense",
          "date": "2023-03-09T21:00:00.000Z",
          "time": "21:03",
          "user": "63f3c3489231626a3ef0f14d",
          "_id": "63f3cea29231626a3ef0f15c",
          "createdAt": "2023-02-20T19:48:50.939Z",
          "updatedAt": "2023-02-20T19:48:50.939Z",
          "__v": 0
        }
      ]
    ```
</details>


**Get Transaction**
----
Get one user's transaction by its id.

<details>

* **URL**

    /transactions/:id

* **Method:**

    `GET`

* **Headers:**

    {
      'Content-Type': 'application/json',
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2Q5NzQxNjllZGVkMGYxNTY3ZjI2NmMiLCJpYXQiOjE2NzU1MTQ0MDksImV4cCI6MTY3ODEwNjQwOX0.wLwSS7A_qTXqHACn4-aXCKn3l8IA72DcOlATZvXulJ8,
    }

* **Data Params:**

    None

* **Query Params**

    None

* **URL Params**

    `id=[transaction_id]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    ```json
      {
        "category": "food",
        "description": "Vkusno I Tochka",
        "amount": 800,
        "paymentMode": "visa",
        "transactionType": "expense",
        "date": "2023-03-09T21:00:00.000Z",
        "time": "21:03",
        "user": "63f3c3489231626a3ef0f14d",
        "_id": "63f3cea29231626a3ef0f15c",
        "createdAt": "2023-02-20T19:48:50.939Z",
        "updatedAt": "2023-02-20T19:48:50.939Z",
        "__v": 0
      }
    ```
</details>


**Update Transaction**
----
Change user's transaction specifying certain parameters.

<details>

* **URL**

    /transactions/:id

* **Method:**

    `PATCH`

* **Headers:**

    {
      'Content-Type': 'application/json',
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2Q5NzQxNjllZGVkMGYxNTY3ZjI2NmMiLCJpYXQiOjE2NzU1MTQ0MDksImV4cCI6MTY3ODEwNjQwOX0.wLwSS7A_qTXqHACn4-aXCKn3l8IA72DcOlATZvXulJ8,
    }

* **Data Params:**

     ```json
      {
        "category": "food",
        "description": "KFC",
        "amount": 1800,
        "paymentMode": "mastercard",
        "transactionType": "expense",
        "date": "2023-03-09T21:00:00.000Z",
      }
    ```

    All fields are optional.

* **Query Params**

    None

* **URL Params**

    `id=[transaction_id]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    ```json
      {
        "success": "true",
      }
    ```
</details>


**Delete Transaction**
----
Delete certain user's transaction.

<details>

* **URL**

    /transactions/:id

* **Method:**

    `DELETE`

* **Headers:**

    {
      'Content-Type': 'application/json',
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2Q5NzQxNjllZGVkMGYxNTY3ZjI2NmMiLCJpYXQiOjE2NzU1MTQ0MDksImV4cCI6MTY3ODEwNjQwOX0.wLwSS7A_qTXqHACn4-aXCKn3l8IA72DcOlATZvXulJ8,
    }

* **Data Params:**

    None

* **Query Params**

    None

* **URL Params**

    `id=[transaction_id]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    ```json
      {
        "success": "true",
      }
    ```
</details>


