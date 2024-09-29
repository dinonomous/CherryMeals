
# Food Ordering and Restaurant Management Platform

### A full-stack food ordering and restaurant management platform built with **Next.js (TypeScript)**, **MongoDB**, and **Express.js**. This application allows users to browse food items, manage orders, and make payments. Restaurant owners can manage their menus and view customer orders.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Login/Registration**: Users and restaurants can register and log in.
- **JWT Authentication**: Secure login for both users and restaurants.
- **Cart Management**: Users can add food items to the cart and proceed to payment.
- **Order Management**: Users can view and track their orders, while restaurants can manage incoming orders.
- **Payment Integration**: Payments handled using Stripe API.
- **Restaurant Dashboard**: Restaurants can manage food items and view orders.
- **Responsive Design**: The platform is fully responsive and adapts to different screen sizes.

## Project Structure

```bash
├── src/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── modules/
│   └── styles/
├── public/
├── pages/
├── README.md
└── package.json
```

- `src/app`: Contains the main pages and layout components.
- `src/components`: Reusable UI components such as buttons, forms, and navigation.
- `src/hooks`: Custom hooks to handle specific functionalities.
- `src/modules`: Contains Mongoose models and backend-related logic.
- `src/styles`: Contains global and component-specific styles.

## Technologies Used

- **Frontend**: Next.js (TypeScript), Tailwind CSS, Axios
- **Backend**: Express.js, Node.js
- **Database**: MongoDB
- **Authentication**: JWT, Passport.js
- **Payments**: Stripe API
- **Storage**: AWS S3 for image storage

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/dinonomous/CherryMeals.git
   ```

2. Navigate into the project directory:

   ```bash
   cd CherryMeals
   ```
   Navigate into Frontend:
    ```bash
   cd client
   ```
   Navigate into Backend:
    ```bash
   cd server
   ```

3. Install dependencies in both:

   ```bash
   npm install
   ```

4. Set up environment variables:

   Create a `.env` file in the root directory of the server with the following variables:

   ```bash
    MONGO_URI=<mongodb+srv://SRMlaunchPad:9704991147@srmlaunchpad.x99gtqi.mongodb.net/CherryMeals>
    JWT_SECRET=mySuperSecretKey
    NODE_ENV=development
    AWS_ACCESS_KEY_ID=AKIATX3PIIDT5FV7UFXW
    AWS_SECRET_ACCESS_KEY=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
    MERCHANT_ID='PGTESTPAYUAT86'
    PHONE_PE_HOST_URL='https://api-preprod.phonepe.com/apis/pg-sandbox'
    SALT_INDEX=1
    SALT_KEY='96434309-7796-489d-8924-ab56988a6076'
    APP_BE_URL='http://localhost:2560'

   ```
   i am running a free tier of s3 please dont upload any thing to my s3         `:pray:`

5. Run the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see the application running.

## Usage

### User Features:

- Browse food items, add them to the cart, and place orders.
- Track order history and proceed with payments.

### Restaurant Features:

- Manage food items and update menus.
- View customer orders and update order statuses.

## API Endpoints

### Authentication:

- `POST /api/v1/auth/register` – Register a new user or restaurant.
- `POST /api/v1/auth/login` – Log in an existing user or restaurant.
- `GET /api/v1/auth/checkAuth` – Check current authentication status.

### Cart:

- `POST /api/v1/cart/:id/cart/:foodId` – Add an item to the cart.
- `GET /api/v1/cart/:id/cart` – Get the user's cart.
- `DELETE /api/v1/cart/:id/cart/:foodId` – Remove an item from the cart.
- `PUT /api/v1/cart/:id/cart` – Update items in the cart.

### Orders:

- `POST /api/v1/orders/:id/orders` – Create a new order.
- `GET /api/v1/orders/:id/orders` – Retrieve all orders for a user.
- `GET /api/v1/orders/:id/orders/:orderId` – Get details of a specific order.
- `DELETE /api/v1/orders/:id/orders/:orderId` – Delete an order.

### Restaurant Management:

- `GET /api/v1/restaurant/nofooditems/:id` – Get restaurant details without food items.
- `POST /api/v1/addfood/:restaurantId` – Add or update food items in the menu.
- `GET /api/v1/restaurant/nofooditems/:id/menue` – Get restaurant menu.
- `GET /api/v1/image/:restaurantId/:foodId` – Retrieve signed URL for food image.

### Payment:

- `GET /api/v1/orders/proceed/:orderId` – Initiate payment process.
- `GET /api/v1/orders/validate/:orderId/:merchantTransactionId` – Validate payment.
