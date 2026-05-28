# SubDub — Subscription Tracking & Renewal Reminder API

A production-ready backend service for managing user subscriptions, automated renewal reminders, authentication, and workflow-driven email notifications.

Built with scalable backend architecture principles using **Node.js**, **Express**, **MongoDB**, **JWT Authentication**, **Arcjet Security**, and **Upstash Workflow Automation**.

---

# 🚀 Features

* JWT Authentication & Authorization
* Subscription CRUD Management
* Automated Renewal Reminder Workflows
* Email Notification System
* MongoDB Data Persistence
* Workflow Scheduling with Upstash QStash
* Rate Limiting & Bot Protection via Arcjet
* Middleware-based Express Architecture
* Environment-based Configuration
* Production-ready Error Handling
* Modular & Scalable Folder Structure

---

# 🏗️ System Architecture

```text
Client
   │
   ▼
Express API Server
   │
   ├── Authentication Layer (JWT)
   ├── Arcjet Security Layer
   ├── Subscription Service
   ├── Workflow Trigger Service
   ├── Email Notification Service
   └── MongoDB Persistence Layer
            │
            ▼
        MongoDB Database

Upstash Workflow
   │
   ▼
Scheduled Reminder Execution
   │
   ▼
Nodemailer Email Service
```

---

# 🛠️ Tech Stack

| Technology       | Purpose                  |
| ---------------- | ------------------------ |
| Node.js          | Backend Runtime          |
| Express.js       | API Framework            |
| MongoDB          | Database                 |
| Mongoose         | ODM                      |
| JWT              | Authentication           |
| bcryptjs         | Password Hashing         |
| Arcjet           | Security & Rate Limiting |
| Upstash Workflow | Workflow Scheduling      |
| Nodemailer       | Email Service            |
| Day.js           | Date Handling            |
| dotenv           | Environment Management   |

---

# 📂 Project Structure

```text
├── config/                 # External services & environment configs
├── controllers/            # Business logic layer
├── database/               # Database connection
├── middlewares/            # Express middlewares
├── models/                 # MongoDB schemas
├── Routes/                 # API routes
├── utils/                  # Shared utilities
├── app.js                  # Application entry point
└── .env.*                  # Environment configurations
```

---

# 📦 Folder Breakdown

## `/config`

Contains all external service integrations and environment setup.

### Files

* `env.js`

  * Loads environment variables dynamically depending on the current environment.

* `arcjet.js`

  * Configures Arcjet security rules:

    * Bot detection
    * Shield protection
    * Token bucket rate limiting

* `nodemailer.js`

  * Configures the email transporter using Gmail SMTP.

* `upstash.js`

  * Creates the Upstash Workflow client used for scheduling reminders.

---

## `/controllers`

Contains the business logic of the application.

### `auth.controller.js`

Handles:

* User registration
* User login
* JWT generation
* Password hashing
* MongoDB transactions

### `subscription.controller.js`

Handles:

* Create subscription
* Update subscription
* Delete subscription
* Cancel subscription
* Upcoming renewal retrieval
* Workflow trigger integration

### `workflow.controller.js`

Handles:

* Scheduled reminder execution
* Delayed workflow processing
* Email reminder orchestration

### `user.controller.js`

Handles:

* User CRUD operations

---

## `/middlewares`

### `auth.middleware.js`

Responsible for:

* JWT verification
* User authorization
* Attaching authenticated user to request

### `arcjet.middleware.js`

Responsible for:

* Request protection
* Rate limiting
* Bot detection
* Access filtering

### `error.middleware.js`

Centralized error handling layer.

Handles:

* Validation errors
* Duplicate key errors
* Invalid ObjectId errors
* Internal server errors

---

## `/models`

### `user.model.js`

Defines the user schema:

* name
* email
* password

### `subscriptions.model.js`

Defines subscription schema:

* subscription name
* category
* frequency
* payment method
* renewal date
* subscription status
* user ownership

Also includes:

* Auto renewal date generation
* Auto expiration logic

---

## `/utils`

### `email-template.js`

Contains reusable HTML email templates.

Supports:

* 7-day reminder
* 5-day reminder
* 2-day reminder
* 1-day reminder

### `send-email.js`

Handles:

* Email template generation
* Subject creation
* Email delivery using Nodemailer

---

# 🔐 Security Layer

This project uses **Arcjet** for production-grade request protection.

Implemented protections include:

* Rate limiting
* Bot detection
* Shield protection against common attacks
* IP-based traffic filtering

Example:

* 10 requests max capacity
* 5 token refill every 10 seconds

---

# 🔄 Workflow Automation

The project integrates **Upstash Workflow** to schedule delayed subscription reminders.

## Workflow Lifecycle

```text
Subscription Created
        │
        ▼
Workflow Triggered
        │
        ▼
Wait Until Reminder Date
        │
        ▼
Send Email Reminder
```

Reminder intervals:

* 7 days before renewal
* 5 days before renewal
* 2 days before renewal
* 1 day before renewal

---

# 🔑 Authentication Flow

```text
User Signup/Login
        │
        ▼
Password Hashing (bcrypt)
        │
        ▼
JWT Token Generation
        │
        ▼
Client Stores Token
        │
        ▼
Protected Route Access
```

---

# 🌍 Environment Variables

Create:

```bash
.env.development.local
.env.production.local
```

## Required Variables

```env
PORT=

DB_URI=

NODE_ENV=

JWT_SECRET=
JWT_EXPIRES_IN=

ARCJET_ENV=
ARCJET_KEY=

QSTASH_TOKEN=
QSTASH_URL=

SERVER_URL=

EMAIL_USER=
EMAIL_PASSWORD=
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone <repository-url>
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create:

```bash
.env.development.local
```

Add all required environment variables.

---

## 4. Run Development Server

```bash
npm run dev
```

---

# 📡 API Endpoints

---

## Authentication Routes

```http
POST /api/v1/auth/sign-up
POST /api/v1/auth/sign-in
POST /api/v1/auth/sign-out
```

---

## User Routes

```http
GET    /api/v1/users
GET    /api/v1/users/:id
POST   /api/v1/users
PUT    /api/v1/users/:id
DELETE /api/v1/users/:id
```

---

## Subscription Routes

```http
GET    /api/v1/subscriptions
GET    /api/v1/subscriptions/:id
POST   /api/v1/subscriptions
PUT    /api/v1/subscriptions/:id
DELETE /api/v1/subscriptions/:id

GET    /api/v1/subscriptions/user/:id
PUT    /api/v1/subscriptions/:id/cancel

GET    /api/v1/subscriptions/upcoming-renewals
```

---

## Workflow Routes

```http
POST /api/v1/workflows/subscription/reminder
```

---

# 🧠 Backend Concepts Demonstrated

This project demonstrates professional backend engineering concepts:

* RESTful API Design
* Middleware Architecture
* Authentication & Authorization
* Workflow Automation
* Delayed Job Scheduling
* Email Service Architecture
* MongoDB Transactions
* Error Handling Patterns
* Security Hardening
* Modular Backend Design

---

# 📄 License

MIT License
