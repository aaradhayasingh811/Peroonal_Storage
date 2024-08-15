
## Description

Peroonal Storage is a web application designed to manage personal storage. It allows users to perform CRUD operations (Create, Read, Update, Delete) on their stored items. The application features a user-friendly interface that supports editing and updating item details.

## Features

- **User Management**: Add, edit, and view user details.
- **CRUD Operations**: Create, read, update, and delete items.
- **Responsive Design**: Accessible on various devices with a responsive layout.
- **Data Validation**: Ensures data integrity with built-in validation.

## Technologies Used

- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Frontend**: HTML, CSS, JavaScript
- **Templating Engine**: EJS (Embedded JavaScript)

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Getting Started

1. **Clone the Repository**

   ```bash
   git clone https://github.com/aaradhayasingh811/Peroonal_Storage.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd Peroonal_Storage
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Set Up Environment Variables**

   Create a `.env` file in the root directory and add your MongoDB connection string and other environment variables. Example:

   ```
   MONGO_URI=mongodb://localhost:27017/peroonal_storage
   PORT=3000
   ```

5. **Run the Application**

   ```bash
   npm start
   ```

   The application should now be running on `http://localhost:3000`.

## Usage

- **View/Edit User**: Navigate to `/edit/:idname` to view and edit user details.
- **Update User**: Submit changes via the form at `/update/:idname`.

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/aaradhayasingh811/Peroonal_Storage/blob/main/LICENSE) file for details.

## Contact

For any questions or feedback, please reach out to [aaradhayasingh811](mailto:aaradhayasingh811@gmail.com) or create an issue on GitHub.
