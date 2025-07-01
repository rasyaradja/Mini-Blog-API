# Mini Blog API

A simple Express.js REST API for a mini blog, demonstrating layered middleware, role-based authentication, request validation, and error handling.

## Features

- **Layered Middleware**: Logging, response timing, authentication, validation, timestamping, and global error handling.
- **Role-based Access**: Editor and admin roles for protected routes.
- **Mock Data**: In-memory posts with `id`, `title`, `content`, and `author`.
- **Postman Collection**: Provided for easy API testing.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v12+ recommended)
- [npm](https://www.npmjs.com/)

### Installation

```bash
git clone [https://github.com/rasyaradja/Mini-Blog-AP](https://github.com/rasyaradja/Mini-Blog-API)
cd mini-blog-api
npm install
```

### Running the Server

```bash
npm start
```

The server will start on [http://localhost:3000](http://localhost:3000) by default.

## API Endpoints

### GET `/posts`

- **Middleware**: `logger` → `timing`
- **Description**: Returns all blog posts.
- **Access**: Public

### POST `/posts`

- **Middleware**: `logger` → `auth('editor')` → `validateBody(['title','content'])` → `attachTimestamp`
- **Description**: Create a new post. Requires `x-user-role: editor` header.
- **Body**:
  ```json
  {
    "title": "Post Title",
    "content": "Post content",
    "author": "Author Name"
  }
  ```
- **Access**: Editor only

### PUT `/posts/:id`

- **Middleware**: `logger` → `auth('editor')` → `validateBody(['title'])` → `attachTimestamp`
- **Description**: Update a post's title. Requires `x-user-role: editor` header.
- **Body**:
  ```json
  {
    "title": "New Title"
  }
  ```
- **Access**: Editor only

### DELETE `/posts/:id`

- **Middleware**: `logger` → `auth('admin')` → `attachTimestamp`
- **Description**: Delete a post. Requires `x-user-role: admin` header.
- **Access**: Admin only

## Middleware Overview

- **logger**: Logs request method and URL.
- **timing**: Logs response duration.
- **auth(role)**: Validates `x-user-role` header for required role.
- **validateBody(keys)**: Ensures request body has required keys.
- **attachTimestamp**: Adds `req.timestamp = new Date()`.
- **errorHandler**: Catches and returns all errors as JSON.

## Mock Data

Located in [`data/posts.js`](data/posts.js):

```js
[
  { id: 1, title: 'First Post', content: 'aku bingung', author: 'Haqi' },
  { id: 2, title: 'Second Post', content: 'aku pengen pulang', author: 'Nanda' },
  { id: 3, title: 'Third Post', content: 'aku masih mikir', author: 'Rasya' },
  { id: 4, title: 'Fourth Post', content: 'aku lagi mikir', author: 'Riyan' },
  { id: 5, title: 'Fifth Post', content: 'aku laper', author: 'Septian' }
]
```

## Testing with Postman

A ready-to-import collection is provided:  
**`mini-blog-api.postman_collection.json`**

- Import it into Postman via "File" or "Raw Text".
- Test all endpoints, including role-based and validation errors.

## Project Structure

```
mini-blog-api/
  app.js
  bin/www
  data/posts.js
  middleware/
    logger.js
    timing.js
    auth.js
    validateBody.js
    attachTimestamp.js
    errorHandler.js
  routes/
    index.js
    users.js
    posts.js
  public/
  package.json
  .gitignore
```

## License

MIT 
