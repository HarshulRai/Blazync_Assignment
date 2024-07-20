const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const students = [
    { id: 1, name: 'John Doe', rollNumber: '101', fees: 1000, paymentStatus: 'Unpaid' },
    { id: 2, name: 'Jane Smith', rollNumber: '102', fees: 1500, paymentStatus: 'Paid' },
    
];

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin123') {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false });
    }
});

app.get('/students', (req, res) => {
    res.json(students);
});

app.get('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const student = students.find(student => student.id === studentId);
    if (student) {
        res.json(student);
    } else {
        res.status(404).json({ message: 'Student not found' });
    }
});

app.put('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const updatedStudent = req.body;
    const studentIndex = students.findIndex(student => student.id === studentId);
    if (studentIndex !== -1) {
        students[studentIndex] = updatedStudent;
        res.json(updatedStudent);
    } else {
        res.status(404).json({ message: 'Student not found' });
    }
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
