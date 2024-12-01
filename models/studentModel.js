// const db = require('../config/db');

// // Fetch all students, ordered by course_id
// const getAllStudents = (callback) => {
//     const query = 'SELECT * FROM Students ORDER BY course_id';
//     db.query(query, callback);
// };

// module.exports = { getAllStudents };
const db = require('../config/db');

// Fetch all students with full details, ordered by course_id
const getAllStudents = (callback) => {
    const query = 'SELECT student_id, name, course_id FROM Students ORDER BY course_id';
    db.query(query, callback);
};

module.exports = { getAllStudents };
