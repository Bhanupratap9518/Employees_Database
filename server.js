const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const Employee = require('./models/Employee');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

app.get('/api/employees', async (req, res) => {
    const employees = await Employee.find();
    res.json(employees);
});

app.post('/api/employees', async (req, res) => {
    const { name, empId, role, department, email, checkIn, checkOut, date } = req.body;
const newEmployee = new Employee({ name, empId, role, department, email, checkIn, checkOut, date });

    try {
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/api/employees/:id', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) return res.status(404).send('Employee not found');
        res.json({ message: 'Employee deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/employees/search', async (req, res) => {
    const query = req.query.query;
    const employees = await Employee.find({
        $or: [
            { name: { $regex: query, $options: 'i' } },
            { empId: { $regex: query, $options: 'i' } }
        ]
    });
    res.json(employees);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
