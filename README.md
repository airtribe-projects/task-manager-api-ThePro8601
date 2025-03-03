# task-manager-api-airtribe-assignment
This repository was made to submit the task manager API assignment from Airtribe for the backend engineering launchpad program and it features CRUD operations

# Task Management API

This is a simple **RESTful API** built using **Node.js** and **Express.js** for managing tasks.  
It supports **CRUD operations**, **input validation**, **error handling**, **filtering, sorting**, and **task prioritization**.

## Features
- Create, Read, Update, and Delete (CRUD) tasks.
- Input validation (title required, priority validation, boolean status check).
- Error handling (404 for missing tasks, 400 for invalid input).
- Filtering tasks by completion status.
- Sorting tasks by creation date.
- Task prioritization (`low`, `medium`, `high`).
- Retrieve tasks by priority.

## Installation & Setup

### Clone the repository
```sh
git clone https://github.com/ThePro8601/task-manager-api-airtribe-assignment.git
cd task-api
```

### Install dependencies
```sh
npm install
```

### Run the server
```sh
node index.js
```

The server runs on **`http://localhost:3000`**.

## API Endpoints

### Create a New Task
- **Endpoint:** `POST /tasks`
- **Request Body:**
```json
{
  "title": "Buy groceries",
  "description": "Get milk, eggs, and bread",
  "completed": false,
  "priority": "high"
}
```
- **Response (201 Created):**
```json
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Get milk, eggs, and bread",
  "completed": false,
  "priority": "high",
  "createdAt": "2025-03-02T14:00:00.000Z"
}
```

### Get All Tasks
- **Endpoint:** `GET /tasks`
- **Query Parameters (Optional):**
  - `completed=true` → Get completed tasks.
  - `sort=createdAt` → Sort tasks by creation date.
- **Example Request:**  
  `GET /tasks?completed=false&sort=createdAt`

- **Response (200 OK):**
```json
[
  {
    "id": 1,
    "title": "Buy groceries",
    "description": "Get milk, eggs, and bread",
    "completed": false,
    "priority": "high",
    "createdAt": "2025-03-02T14:00:00.000Z"
  }
]
```

### Get a Single Task
- **Endpoint:** `GET /tasks/:id`
- **Example Request:** `GET /tasks/1`
- **Response (200 OK):**
```json
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Get milk, eggs, and bread",
  "completed": false,
  "priority": "high",
  "createdAt": "2025-03-02T14:00:00.000Z"
}
```

### Update a Task
- **Endpoint:** `PUT /tasks/:id`
- **Request Body (Partial update allowed):**
```json
{
  "completed": true,
  "priority": "medium"
}
```
- **Response (200 OK):**
```json
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Get milk, eggs, and bread",
  "completed": true,
  "priority": "medium",
  "createdAt": "2025-03-02T14:00:00.000Z"
}
```

### Delete a Task
- **Endpoint:** `DELETE /tasks/:id`
- **Example Request:** `DELETE /tasks/1`
- **Response (204 No Content)**

### Get Tasks by Priority
- **Endpoint:** `GET /tasks/priority/:level`
- **Example Request:** `GET /tasks/priority/high`
- **Response (200 OK):**
```json
[
  {
    "id": 1,
    "title": "Buy groceries",
    "description": "Get milk, eggs, and bread",
    "completed": false,
    "priority": "high",
    "createdAt": "2025-03-02T14:00:00.000Z"
  }
]
```

## Testing the API (Postman or curl)
You can test the API using **Postman** or **curl**:

### Create a Task using curl
```sh
curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"title":"Learn Node.js","completed":false,"priority":"medium"}'
```

### Get All Tasks using curl
```sh
curl -X GET http://localhost:3000/tasks
```

## Future Enhancements
- Save tasks in a **database** (e.g., MongoDB, MySQL).
- Add **user authentication** with JWT.
- Implement **pagination** for large task lists.

## Author
- **Rudransh Singh**
- **GitHub:** [GitHub Profile](https://github.com/ThePro8601)
