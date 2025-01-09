# 📚 Books Inventory Application

## 🚀 Overview

The **Books Inventory Application** is a web-based inventory system to manage book data categorized by genres. It enables users to create, update, delete, and view books and genres, ensuring seamless organization and management.

---

## ✨ Features

- **Categorized Books**: Manage books organized by genres.
- **CRUD Operations**:
  - Create, Read, Update, Delete genres and books.
- **Form Validation**: Ensures data security and accuracy.
- **Genre-Based Filtering**: Fetch all books by their respective genre.

---

## 🛠️ Tech Stack

- **Backend**: Express.js
- **Frontend**: EJS for templating
- **Database**: PostgreSQL
- **ORM**: Raw SQL queries wrapped in Classes for organization

---

## 📂 Database Schema

### Tables:

1. **Books**

   - `id`: Unique identifier
   - `title`: Title of the book
   - `author`: Author of the book
   - `price`: Price of the book
   - `stock`: Number of copies in stock
   - `genre_id`: Foreign key referencing Genres

2. **Genres**
   - `id`: Unique identifier
   - `name`: Genre name

---

## 🔄 Functionalities

- **Books**:

  - Add new books with attributes like title, author, price, stock, and genre.
  - Update book details.
  - Delete books.
  - Fetch all books by genre.

- **Genres**:
  - Add new genres.
  - Update genre names.
  - Delete genres.

---

## 🚀 How to Run Locally

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/bookstore.git
   cd bookstore
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory and configure the following:

   ```env
   PORT=your_port
   DATABASE_URL=your_database_url
   ```

4. **Navigate to Root Directory and Start the App**

   ```bash
   node app.js
   ```

5. **Access the App**
   Visit `http://localhost:<PORT>` in your browser.

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request.

1. Fork the Project.
2. Create your Feature Branch: `git checkout -b feature/amazing_feature`.
3. Commit your Changes: `git commit -m 'Add some amazing_feature'`.
4. Push to the Branch: `git push origin feature/amazing_feature`.
5. Open a Pull Request.

---

## 📧 Contact

If you have any questions, feel free to reach out:

- **Email:** [Aditya Kirti](mailto:adityakirti.dev@gmail.com)
- **GitHub:** [addy118](https://github.com/addy118)
