<p align="center">
  <img src="./assets/logo-white.png" alt="icenter" width="200"/>
</p>

All your favorite Apple products in one place. **ICENTER** is sleek and minimalistic e-commerce website where users can purchase latest Apple devices and accessories.

## Table of contents

- [User features](#-user-features-user-side)
- [Admin features](#-admin-features-admin-side)
- [Live preview](#-live-preview)
- [Tech stack](#-tech-stack)
- [Screenshot](#-screenshot)
- [Installation](#-installation)
- [Development](#-development)
- [Developer](#-developer)
- [Contributing](#-contributing)

## 👾 User Features (User Side)

🛒 **Shopping and Browsing**

- Product listing with categories
- Product detail page with:
  - Name, price, description, specifications
  - Product images/gallery
  - Available stock
  - Rating and reviews
- Search functionality
- Filter and sort products

👤 **Authentication**

- User registration and login
- Password update
- Secure sessions (cookies and tokens)
- View and update profile

🛍️ **Cart**

- Add to cart
- View cart and update quantities
- Remove items from cart

📦 **Checkout & Orders**

- Shipping address form
- Choose payment method (Cash on Delivery)
- Place order functionality

📬 **Order Management**

- View past orders
- Order status tracking

⭐ **Reviews & Ratings**

- Leave review after delivery

- View other users' reviews

## ⚙️ Admin Features (Admin Side)

📦 **Product Management**

- Add new products
- View all products
- Edit existing products
- Delete product
- Track inventory (stock levels)

📃 **Order Management**

- View all orders
- Update order status
- Update user order information
- Mark orders as paid or delivered

## 🚀 Live Preview

You can view the live preview of the project by visiting: <a href="https://icenter-shop.vercel.app/" target="_blank">https://icenter-shop.vercel.app/</a>

## 💻 Tech Stack

📜 **Frontend**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
[![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)](#)
[![Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](#)
[![React Query](https://img.shields.io/badge/React%20Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=fff)](#)
[![Tailwind css](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](#)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

🗄️ **Backend**

[![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](#)
[![Express.js](https://img.shields.io/badge/Express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](#)

🛢️ **Database**

[![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)](#)

## 📷 Screenshot

  <img src="./assets/home.png" alt="icenter"/>

## ⚙️ Installation

Follow the steps below to set up the project locally:

1.  **Fork the repository**  
    Click the **Fork** button at the top-right corner of this page to copy the repository to your GitHub account.

2.  **Clone the repository**

    ```bash
    git clone https://github.com/<your-username>/icenter.git
    ```

3.  **Create .env file**: Inside the frontend, admin, and server directories create `.env` file and set:

Frontend:
`VITE_BACKEND_URL=<your_server_url>`

Admin:
`VITE_BACKEND_URL=<your_server_url>`

Backend:

```
  MONGODB_URI=<your_mongodb_uri>
  MONGODB_PASSWORD=<your_db_password>

  JWT_SECRET=<your_jwt_secret>
  JWT_EXPIRES_IN=<e.g. 90d>
  JWT_COOKIE_EXPIRES_IN=<e.g. 90>

  CLOUDINARY_NAME=<your_cloudinary_name>
  CLOUDINARY_API_KEY=<your_api_key>
  CLOUDINARY_SECRET_KEY=<your_secret_key>

  FRONTEND_DEV_ORIGIN=http://localhost:5173
  ADMIN_DEV_ORIGIN=http://localhost:5174

  NODE_ENV=development
  PORT=3000
```

4. **Install dependencies**

```bash
  npm i # Run this command in frontend, admin, and backend directories
```

> [!NOTE]  
> In the backend, please install nodemon by running `npm i nodemon` in the backend directory terminal.
> 
> This is because I installed nodemon globally in my local machine : )

5. **Start development environments**:

Frontend:

```bash
cd frontend
npm run dev
```

Admin:

```bash
cd admin
npm run dev
```

Admin:

```bash
cd backend
npm run server
```

6. Access

Frontend:
`http://localhost:5173/`

Admin:
`http://localhost:5174/`

## ✨ Development

Features for next update:

- **Admin dashboard**: Implement an admin dashboard where statistics are shown (e.g. sales, income, etc.)
- **Password resets**: Allow user to reset their password
- **Emails**: Send emails to user for password reset and order receipts

## 🧑‍💻 Developer

<table>
  <tbody>
    <tr>
      <td align="center" valign="top">
        <img src="./assets/dev.png" width="120;" alt="Exequiel Arco"/>
        <br />
        <b>Exequiel Arco</b>
      </td>
    </tr>
    <tr>
        <td align="center">
            <a href="https://github.com/quielScript" target="_blank">
            <img src="https://img.shields.io/badge/GitHub-100000.svg?style=for-the-badge&logo=github&logoColor=white"/>
            </a>
            <br/>
            <a href="https://www.linkedin.com/in/exequielarco" target="_blank">
            <img src="https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white"/>
            </a>
        </td>
    </tr>
  </tbody>
</table>


<!--- [![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/quielScript)
 [![LinkedIn](https://custom-icon-badges.demolab.com/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin-white&logoColor=fff)](https://www.linkedin.com/in/exequielarco/) --->


## 🌟 Contributing

Contributions are welcome!
