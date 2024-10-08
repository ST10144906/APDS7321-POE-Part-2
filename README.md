# Customer Portal

A simple customer portal for login and registration.

## Clone Repository

To get started with the project, you'll need to clone the repository to your local machine. Follow these steps:

1. Open your preferred code editor (e.g., Visual Studio Code).
2. At the top menu, click on **File**.
3. Select **New Window** to open a new window in your editor.
4. Click on **Clone Git Repository**.
5. Enter the following command in your terminal:

   ```bash
   git clone https://github.com/ST10144906/APDS7321-POE.git
   ```
   
## Setup Backend

To set up the backend of the application, follow these steps:

1. Open a new terminal window.
2. Navigate to the backend directory:

   ```bash
   cd backend
   ```

3. Create a new file named `.env` in the backend directory. This file will hold your environment variables. You can obtain your MongoDB URI from the MongoDB Atlas website. The URI will be unique to your MongoDB account.

   - Add the following line to your `.env` file, replacing the placeholders with your actual MongoDB credentials:

     ```plaintext
     MONGO_URI=mongodb://your_username:your_password@your_host:your_port/your_database_name
     ```

4. Install the necessary dependencies by running the following command:

   ```bash
   npm install
   ```

5. Start the backend server:

   ```bash
   npm start
   ```

   The backend server should now be running on [http://localhost:5000](http://localhost:5000) and this should be the output text
   ```
   ``Server running on port 5000
   ``MongoDB connected
   ```

## Setup Frontend

To set up the frontend of the application, follow these steps:

1. Open a new terminal window.
2. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

3. Install the necessary dependencies by running the following command:

   ```bash
   npm install
   ```

4. Start the frontend application:

   ```bash
   npm start
   ```

   The frontend application should now be running on [http://localhost:3000](http://localhost:3000).


## Note: install the following dependecies for protecting against atacks

```bash 
npm install express mongoose cors dotenv helmet express-rate-limit express-session xss-clean express-brute morgan bcryptjs
```

