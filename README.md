# 🗓️ Meeting Scheduler Backend API

A clean and scalable backend API for scheduling meetings with **conflict prevention**, built using **Node.js, Express, MySQL, and Sequelize**.

This project was completed as part of a backend assignment with a focus on **RESTful design, validation, and clean architecture**.

---

##  Features

* User management
* Meeting scheduling
* Time conflict detection
* Filter meetings by user and date
* Full CRUD operations
* Request validation using middleware
* Clean separation of routes and logic
* Bonus-ready architecture for authentication

---

##  Tech Stack

* **Node.js**
* **Express.js**
* **MySQL**
* **Sequelize ORM**
* **Postman** (for API testing)

---

## 📁 Project Structure

```
src/
 ├── config/
 │    └── db.js
 ├── models/
 │    ├── user/
 │    │     └── User.js
 │    └── meeting/
 │          └── Meeting.js
 ├── routes/
 │    ├── user.routes.js
 │    └── meeting.routes.js
 ├── middlewares/
 │    └── validateMeeting.js
 ├── app.js
 └── server.js
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone <repository-url>
cd meeting-scheduler
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Database

Create a MySQL database:

```sql
CREATE DATABASE meetingScheduler;
```

Update credentials in `src/config/db.js`:

```js
const sequelize = new Sequelize(
  'meetingScheduler',
  'root',
  'your_password',
  {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
  }
);
```

### 4️⃣ Run Server

```bash
npm start
```

Server runs on:

```
http://localhost:3000
```

---

## 📌 API Endpoints

### 👤 Users

#### Create User

```
POST /users
```

```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

---

### 🗓️ Meetings

#### Create Meeting (with conflict check)

```
POST /meetings
```

```json
{
  "userId": 1,
  "title": "Tech Sync",
  "startTime": "2026-02-12T10:00:00",
  "endTime": "2026-02-12T11:00:00"
}
```

---

#### Get All Meetings (Filters supported)

```
GET /meetings?userId=1&date=2026-02-12
```

---

#### Get Meeting by ID

```
GET /meetings/:id
```

---

#### Update Meeting (Conflict-safe)

```
PUT /meetings/:id
```

> Prevents overlapping meetings by excluding the current meeting from conflict detection.

---

#### Delete Meeting

```
DELETE /meetings/:id
```

Returns `204 No Content` on success.

---

## 🛡️ Validation & Conflict Handling

* Request validation is handled via **Express middleware**
* Meeting time conflicts are detected using:


startTime < newEndTime AND endTime > newStartTime


* For updates, the current meeting is excluded using:


id: { [Op.ne]: currentMeetingId }

---

## 🧪 Error Handling

* `400` – Invalid input / conflict
* `404` – Resource not found
* `500` – Server error

All responses are JSON-based.

---

## 👨‍💻 Author

**Andrew**
Backend Developer | Node.js | SQL | REST APIs

---

## 📄 License

This project is for evaluation and learning purposes.

---

✨ Built with clean architecture, scalability, and real-world backend practices in mind.


ScreenShots

![kraftpic1](https://github.com/user-attachments/assets/e225773d-bbbc-4fd8-abc1-bdfa27f20a76)
![kraftpic2](https://github.com/user-attachments/assets/6a86c154-6390-419f-ba4b-45581676e75a)
![kraftpic3](https://github.com/user-attachments/assets/d8c4348e-2a95-4cdb-9532-feecddad8509)

![kraftpic4](https://github.com/user-attachments/assets/eb19dbfa-6f7d-43fd-9813-9e92ade54193)
![kraftpic5](https://github.com/user-attachments/assets/ec83aa4c-dba0-4abb-a995-4c63793b4758)
![kraftconflict6](https://github.com/user-attachments/assets/bf68831f-a3b4-4dc6-a680-49da96db73e8)



