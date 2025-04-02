# Bisto Boss - Restaurant Management System

## 📌 Project Overview

Bisto Boss is a full-stack restaurant management system that allows users to explore the menu, place orders, review, and make payments online. The backend is built with **Node.js, Express.js, and MongoDB**.

## 🚀 Features

### Backend Features:

- User authentication (JWT-based login/register)
- Role-based access control (Admin & Users)
- CRUD operations for menu items, orders, review, cart and users
- Payment integration with **Stripe**
- Secure session handling with **cookie-parser**
- Environment variable management with **dotenv**

## 🏗️ Tech Stack

- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JSON Web Token (JWT)
- **Payments:** Stripe
- **Middleware:** Cors, Cookie-parser, Dotenv, etc.
- **Database:** MongoDB with Mongoose ORM

## ⚙️ Installation & Setup

### Prerequisites:

- Node.js installed
- MongoDB installed & running

### Backend Setup:

```sh
# Clone the repository
git clone https://github.com/MonirujjamanMamun/bisto-boss-backend
cd bisto-boss-backend

# Install dependencies
npm install

# Create a .env file and add required environment variables
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key

# Start the server in development mode
npm run dev
```

## Project Structure

```
├── controllers     # Request handlers
├── middlewares     # Custom middleware (auth,verifyToken,checkAdmin error handling, etc.)
├── models          # Mongoose schemas
├── routes          # Express routes
├── utils           # Configuration files (DB connection, etc.)
├── app.js          # Main file
├── server.js       # Main entry point
├── package.json    # Dependencies and scripts
└── .env            # Environment variables (ignored in Git)
```

## 📡 API Endpoints

### Authentication

- `POST /api/register` - Register a new user
- `POST /api/login` - Login and get JWT token
- `GET /api/alluser` - Fetch all user data (Admin only)
- `GET /api/userrole` - Fetch user role
- `PATCH /api/makeadmin/:id` - Make a user admin (Admin only)
- `DELETE /api/deleteuser/:id` - Delete a user (Admin only)

### Review Management

- `GET /api/review` - Fetch all Reviews
- `GET /api/review/:id` - Get a review
- `POST /api/review` - Add a new review
- `PATCH /api/editreview/:id` - Update review
- `DELETE /api/review/:id` - Remove review (Admin only)

### Menu Management

- `GET /api/menu` - Fetch all menu items
- `PATCH /api/editmenu/:id` - Update menu item (Admin only)
- `POST /api/menu` - Add a new menu item (Admin only)
- `GET /api/menu/:id` - Get a menu item
- `DELETE /api/menu/:id` - Remove menu item (Admin only)

### Cart Management

- `POST /api/cart` - Add a new item in cart
- `GET /api/cart` - Get cart details
- `DELETE /api/deletecart/:id` - Delete a cart item
- `DELETE /api/resetcart ` - Delete all cart item

### Payments

- `POST /api/payments` - Process payment via Stripe
- `POST /api/create-payment-intent` - Create payment via Stripe
- `GET /api/paymenthistory` - User can his/her payment history

### Admin stats

- `GET /api/admin-stats` - Admin can user, menuItem, payment, revenue stats
- `GET /api/order-stats` - Admin can total order stats

## 🛠️ Development Tools

- **Nodemon** for live backend reloads
- **Postman** for API testing
- **MongoDB Compass** for database management

## 🎯 Future Enhancements

- Real-time notifications for order updates
- Admin dashboard and User dashboard add more feature
- Update many more feature day by day

## 🤝 Contributing

Contributions are welcome! Feel free to fork and submit pull requests.

## 📩 Contact

For inquiries, reach out at: monirujjamanmamun2357@gmail.com
