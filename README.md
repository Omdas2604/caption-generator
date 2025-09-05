# 📸 Caption Generator

**Caption Generator** is a full-stack web application that lets users effortlessly register, log in, upload photos, and receive creative, AI-powered captions for their images. Perfect for boosting your social media, blog posts, or anywhere you share photos!

---

## 🚀 Features

- **🔒 User Authentication:** Register and log in securely to your account.
- **📸 Photo Upload:** Upload photos from your device.
- **📝 AI Caption Generation:** Instantly create fun and relevant captions for your images.
- **📋 Easy Copy:** Quickly copy captions to use anywhere.

---

## 🛠️ Tech Stack

**Frontend:**  
React, JavaScript, HTML, CSS

**Backend:**  
Node.js, Express  
MongoDB

---

## 📂 Folder Structure

Your project is organized as a modern full-stack app:

```
caption-generator/
│
├── frontend/
│   ├── node_modules/
│   ├── public/
│   └── src/
│       ├── App.jsx
│       ├── index.css
│       ├── main.jsx
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── vite.config.js
│
├── node_modules/
│
├── src/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── post.controller.js
│   ├── db/
│   │   └── db.js
│   ├── middlewares/
│   │   └── auth.middleware.js
│   ├── models/
│   │   ├── post.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── post.routes.js
│   ├── service/
│   │   └── app.js
│   └── server.js
│
├── .env
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

---

## 💻 Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn
- (Optional) MongoDB running locally or via cloud

### Installation

**1. Clone the repository:**
```bash
git clone https://github.com/Omdas2604/caption-generator.git
cd caption-generator
```

**2. Install frontend dependencies:**
```bash
cd frontend
npm install
# or
yarn install
```

**3. Install backend dependencies:**
```bash
cd ..
npm install
# or
yarn install
```

**4. Configure environment variables:**  
Create a `.env` file in the root directory and add your settings (e.g., MongoDB URI, JWT secret).

**5. Start the backend server:**
```bash
npm start
# or
node src/server.js
```

**6. Start the frontend development server:**
```bash
cd frontend
npm run dev
# or
yarn dev
```

**7. Open your browser:**  
Visit [http://localhost:3000](http://localhost:3000) to use Caption Generator.

---

## ✨ Usage

1. **Register** a new account or **log in**.
   <img width="1919" height="915" alt="image" src="https://github.com/user-attachments/assets/55a45bd2-ea0a-468c-b8f3-3afc1af88a8e" />
3. **Upload** a photo.
4. **Generate** a caption and **copy** it for your use!

---

## 🤝 Contributing

Contributions are welcome!  
Please open an issue or submit a pull request.

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

---

## 📝 License

This project is open source under the MIT License.

---

## 🙏 Acknowledgments

- Inspired by creative caption and AI tools.
- Thanks to all contributors!

---

<sub>*Feel free to customize this README for your project's specific details.*</sub>
