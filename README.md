# 🎟️ Movie Ticket Booking Application

A full-stack **Movie Ticket Booking Application** with **Razorpay** payment gateway integration. The application allows users to book movie tickets, view available shows, and make secure payments. Built with **React, Bootstrap, Express.js, MongoDB, and Mongoose**.

---

## 🚀 Features

- User authentication (Sign Up/Login)
- Movie listing with show details
- Book movie tickets (CRUD operations)
- Razorpay payment gateway integration
- Responsive UI with Bootstrap
- Admin panel to manage movies and bookings

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Payment Gateway**: Razorpay

---

---


## 💳 Razorpay Payment Integration

- Users can select movie tickets and proceed to payment.
- Razorpay handles secure payments.
- After payment, the booking is confirmed and saved in MongoDB.

---

## 📁 Folder Structure

```
movie-ticket-booking/
│-- backend/
│   │-- Db_utils/
│   │-- Routes/
│   │   │-- theater/
│   │   │-- screen/
│   │   │-- movie/
│   │   │-- Authentication/
│   │   │-- ticket/
│   │   │-- payment/
│   │-- models/
│   │-- controllers/
│   │-- server.js
│-- frontend/
│   │-- src/
│   │   │-- components/
│   │   │-- pages/
│   │   │-- App.js
│-- README.md
```

---

## 📌 API Routes (Backend)

| Method | Route                     | Description                   |
| ------ | ------------------------- | ----------------------------- |
| GET    | `/theater`                | Fetch all theaters            |
| GET    | `/theater/screen`         | Fetch all screens in a theater |
| GET    | `/movie`                  | Fetch all movies              |
| POST   | `/register`               | User registration             |
| POST   | `/login`                  | User login                    |
| POST   | `/ticket`                 | Book a ticket                 |
| POST   | `/create-order`           | Process payment with Razorpay |

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 🤝 Contributing

Feel free to raise issues or contribute via pull requests.

**Happy Coding! 🚀**

