
# 📘 ExamVault - Student Exam Compilation & Records Database

**ExamVault** is a web-based application for compiling, managing, and exporting student exam records. It supports real-time updates via Firebase, authentication, Excel/CSV export/import, chat per classroom, and a responsive design for mobile and desktop.

---

## 🚀 Features

- 🔐 Firebase Authentication
- 📊 Firestore Cloud Sync
- 📁 Import/Export Excel/CSV
- 🧮 Class Average & Sorting
- 📝 Realtime Chat by Classroom
- 🧑‍🏫 Admin Dashboard & Role Permissions
- 📱 Mobile-Responsive UI

---

## 📦 Installation Instructions

### 🔧 1. Clone the Repository

```bash
git clone https://github.com/Psalmist10/ExamVault.git
cd ExamVault
```

### 📁 2. Setup Firebase

- Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)
- Enable **Authentication** > **Email/Password**
- Enable **Firestore Database**
- Go to **Project Settings > General > Add App** and copy your config.

Replace this in your code:

```js
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBajemlGIkwmQH9XvkrSja2ekvtQOGZKJ0",
  authDomain: "examvault-952c6.firebaseapp.com",
  projectId: "examvault-952c6",
  storageBucket: "examvault-952c6.firebasestorage.app",
  messagingSenderId: "602342611931",
  appId: "1:602342611931:web:7f81199c95c5aab40865fe",
  measurementId: "G-W6W0PJL0CH"
};

### 📁 3. Install Dependencies (if using a bundler like Vite or Webpack)

```bash
npm install
```

Or simply open `index.html` if it's a plain JS app.

### 🌐 4. Deploy (Optional)

#### GitHub Pages

```bash
# Ensure you have gh-pages installed
npm install gh-pages --save-dev
npm run deploy
```

#### Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

---

## 💡 Usage Example

- Login with your email and password.
- Add a new classroom or select existing.
- Enter student records: name, subject, score, date.
- Export records as Excel or import from file.
- View average scores, filter by subject, or sort by name/score.
- Use classroom chat for quick discussions.
- Admins can manage users and assign roles.

---

## 🤝 Contributing Guidelines

We welcome community contributions! To contribute:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/YourFeatureName`
3. Commit your changes: `git commit -m "Add some feature"`
4. Push to your branch: `git push origin feature/YourFeatureName`
5. Create a Pull Request

### Code Guidelines

- Keep code modular and readable
- Comment functions where necessary
- Follow HTML5/CSS3 and ES6+ best practices

---

## 📜 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2025 E.A Ezequiel

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

[...continued]
```

---

## 📞 Contact

Built with ❤️ by [E.A Ezequiel](mailto:email@wedevapps.com)

> For help, suggestions, or feedback, feel free to open an issue or email directly.
