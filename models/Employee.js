const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    empId: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    department: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        match: /.+@.+\..+/ 
    },
    checkIn: { type: String, required: true },
    checkOut: { type: String, required: true },
    date: { type: String, required: true } // ✅ Add this line
});

module.exports = mongoose.model('Employee', employeeSchema);
