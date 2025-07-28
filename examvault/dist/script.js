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
const dateInput = document.getElementById("date");
const classroomInput = document.getElementById("classroom");

const form = document.getElementById("recordForm");
const nameInput = document.getElementById("name");
const subjectInput = document.getElementById("subject");
const scoreInput = document.getElementById("score");
const recordBody = document.getElementById("recordBody");
const clearBtn = document.getElementById("clearAll");
const avgScoreDisplay = document.getElementById("averageScore");

let records = JSON.parse(localStorage.getItem("examRecords")) || [];

function renderRecords() {
  recordBody.innerHTML = "";
  let total = 0;

  records.forEach((record, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td data-label="Name">${record.name}</td>
      <td data-label="Subject">${record.subject}</td>
      <td data-label="Score">${record.score}</td>
      <td data-label="Action">
        <button onclick="deleteRecord(${index})">Delete</button>
      </td>
    `;

    total += Number(record.score);
    recordBody.appendChild(row);
  });

  const average = records.length ? (total / records.length).toFixed(2) : 0;
  avgScoreDisplay.textContent = `Average Score: ${average}`;
  localStorage.setItem("examRecords", JSON.stringify(records));
}

form.addEventListener("submit", function (e) {
  e.preventDefault(); const classroom = classroomInput.value.trim() || "General";
const date = dateInput.value || new Date().toLocaleDateString();

records.push({ name, subject, score, grade, classroom, date });

  const name = nameInput.value.trim();
  const subject = subjectInput.value.trim();
  const score = parseFloat(scoreInput.value.trim());

  if (!name || !subject || isNaN(score)) return;

  records.push({ name, subject, score });
  nameInput.value = subjectInput.value = scoreInput.value = "";
  renderRecords();
});

function deleteRecord(index) {
  records.splice(index, 1);
  renderRecords();
}

clearBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete all records?")) {
    records = [];
    renderRecords();
  }
});

renderRecords();
const exportBtn = document.getElementById("exportExcel");

exportBtn.addEventListener("click", () => {
  if (records.length === 0) {
    alert("No records to export.");
    return;
  }

  const worksheet = XLSX.utils.json_to_sheet(records);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Exam Records");

  XLSX.writeFile(workbook, "exam_records.xlsx");
});
const importInput = document.getElementById("importExcel");

importInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });

    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];

    const importedData = XLSX.utils.sheet_to_json(worksheet);

    if (!Array.isArray(importedData) || importedData.length === 0) {
      alert("No data found in Excel file.");
      return;
    }

    // Optional: Validate structure
    importedData.forEach(record => {
      if (record.name && record.subject && record.score) {
        const score = parseFloat(record.score);
        const grade = record.grade || calculateGrade(score);
        records.push({
          name: record.name,
          subject: record.subject,
          score: score,
          grade: grade
        });
      }
    });

    renderRecords();
    importInput.value = ""; // Reset file input
    alert("Records imported successfully!");
  };

  reader.readAsArrayBuffer(file);
});
importedData.forEach(record => {
  if (record.name && record.subject && record.score) {
    const score = parseFloat(record.score);
    const grade = record.grade || calculateGrade(score);

    const duplicate = records.some(r =>
      r.name.toLowerCase() === record.name.toLowerCase() &&
      r.subject.toLowerCase() === record.subject.toLowerCase()
    );

    if (!duplicate) {
      records.push({
        name: record.name,
        subject: record.subject,
        score,
        grade,
        date: record.date || new Date().toLocaleDateString(),
        classroom: record.classroom || "General"
      });
    }
  }
});
alert("Import completed. Duplicates were skipped.");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const container = document.querySelector(".container");
const authContainer = document.querySelector(".auth-container");

let currentUser = null;
let records = [];

auth.onAuthStateChanged(user => {
  if (user) {
    currentUser = user;
    authContainer.style.display = "none";
    container.style.display = "block";
    loadRecordsFromFirestore();
  } else {
    currentUser = null;
    authContainer.style.display = "block";
    container.style.display = "none";
  }
});

loginBtn.addEventListener("click", () => {
  auth.signInWithEmailAndPassword(emailInput.value, passwordInput.value)
    .catch(error => alert(error.message));
});

signupBtn.addEventListener("click", () => {
  auth.createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
    .catch(error => alert(error.message));
});
function loadRecordsFromFirestore() {
  db.collection("records")
    .where("uid", "==", currentUser.uid)
    .get()
    .then(snapshot => {
      records = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      renderRecords();
    });
}
db.collection("records").add({
  uid: currentUser.uid,
  name,
  subject,
  score,
  grade,
  date,
  classroom
}).then(() => loadRecordsFromFirestore());
function deleteRecord(index) {
  const record = records[index];
  db.collection("records").doc(record.id).delete()
    .then(() => loadRecordsFromFirestore());
}
function clearAllRecords() {
  const batch = db.batch();
  records.forEach(record => {
    const docRef = db.collection("records").doc(record.id);
    batch.delete(docRef);
  });
  batch.commit().then(() => loadRecordsFromFirestore());
}