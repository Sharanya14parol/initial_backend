// const { getAllStudents } = require('../models/studentModel');
// const { insertSeatAllocations } = require('../models/seatModel');

// // Seat allocation logic
// const allocateSeats = (req, res) => {
//     const { threeSeaters, fiveSeaters } = req.body;

//     getAllStudents((err, students) => {
//         if (err) return res.status(500).send(err);

//         let threeSeatCounter = 0;
//         let fiveSeatCounter = 0;
//         let seatAllocations = [];
//         let currentThreeSeater = 1;
//         let currentFiveSeater = 1;

//         students.forEach((student, index) => {
//             if (threeSeatCounter < threeSeaters * 3) {
//                 // Three-seater allocation: ensure different course IDs
//                 if (seatAllocations.length % 2 === 0 || seatAllocations[seatAllocations.length - 1].course_id !== student.course_id) {
//                     seatAllocations.push({ student_id: student.student_id, seat_type: 'three_seater', seat_number: `3S-${currentThreeSeater}` });
//                     threeSeatCounter++;
//                     if (threeSeatCounter % 3 === 0) currentThreeSeater++;
//                 }
//             } else if (fiveSeatCounter < fiveSeaters * 5) {
//                 // Five-seater allocation: same course IDs allowed
//                 seatAllocations.push({ student_id: student.student_id, seat_type: 'five_seater', seat_number: `5S-${currentFiveSeater}` });
//                 fiveSeatCounter++;
//                 if (fiveSeatCounter % 5 === 0) currentFiveSeater++;
//             }
//         });

//         insertSeatAllocations(seatAllocations, (err) => {
//             if (err) return res.status(500).send(err);
//             res.send({ message: 'Seat allocation successful', allocations: seatAllocations });
//         });
//     });
// };

// module.exports = { allocateSeats };
// const { getAllStudents } = require('../models/studentModel');
// const { insertSeatAllocations } = require('../models/seatModel');

// const allocateSeats = (req, res) => {
//     const { threeSeaters, fiveSeaters } = req.body;

//     getAllStudents((err, students) => {
//         if (err) return res.status(500).send(err);

//         let threeSeatCounter = 0;
//         let fiveSeatCounter = 0;
//         let seatAllocations = [];
//         let currentThreeSeater = 1;
//         let currentFiveSeater = 1;

//         // Logic to allocate students
//         students.forEach((student) => {
//             if (threeSeatCounter < threeSeaters * 3) {
//                 // Allocate three-seater seat: ensure different course IDs sit together
//                 if (seatAllocations.length % 2 === 0 || seatAllocations[seatAllocations.length - 1].course_id !== student.course_id) {
//                     seatAllocations.push({ 
//                         student_id: student.student_id, 
//                         name: student.name,
//                         course_id: student.course_id,
//                         seat_type: 'three_seater', 
//                         seat_number: `3S-${currentThreeSeater}`
//                     });
//                     threeSeatCounter++;
//                     if (threeSeatCounter % 3 === 0) currentThreeSeater++;
//                 }
//             } else if (fiveSeatCounter < fiveSeaters * 5) {
//                 // Allocate five-seater seat: same course IDs can sit together
//                 seatAllocations.push({ 
//                     student_id: student.student_id, 
//                     name: student.name,
//                     course_id: student.course_id,
//                     seat_type: 'five_seater', 
//                     seat_number: `5S-${currentFiveSeater}`
//                 });
//                 fiveSeatCounter++;
//                 if (fiveSeatCounter % 5 === 0) currentFiveSeater++;
//             }
//         });

//         // Insert seat allocations into the database
//         const insertQueryData = seatAllocations.map(sa => [sa.student_id, sa.seat_type, sa.seat_number]);
//         insertSeatAllocations(insertQueryData, (err) => {
//             if (err) return res.status(500).send(err);
//             res.send({ message: 'Seat allocation successful', allocations: seatAllocations });
//         });
//     });
// };

// module.exports = { allocateSeats };
// const { getAllStudents } = require('../models/studentModel');
// const { insertSeatAllocations } = require('../models/seatModel');

// const allocateSeats = (req, res) => {
//     const { threeSeaters, fiveSeaters } = req.body;

//     getAllStudents((err, students) => {
//         if (err) return res.status(500).send(err);

//         let seatAllocations = [];
//         let currentThreeSeater = 1;
//         let currentFiveSeater = 1;
//         let threeSeatCounter = 0;
//         let fiveSeatCounter = 0;

//         students.forEach((student) => {
//             // Allocate three-seater seats first
//             if (threeSeatCounter < threeSeaters * 3) {
//                 seatAllocations.push({ 
//                     student_id: student.student_id, 
//                     name: student.name,
//                     course_id: student.course_id,
//                     seat_type: 'three_seater', 
//                     seat_number: `3S-${currentThreeSeater}`
//                 });
//                 threeSeatCounter++;
//                 if (threeSeatCounter % 3 === 0) currentThreeSeater++;
//             } else {
//                 // Allocate remaining students to five-seater seats
//                 seatAllocations.push({ 
//                     student_id: student.student_id, 
//                     name: student.name,
//                     course_id: student.course_id,
//                     seat_type: 'five_seater', 
//                     seat_number: `5S-${currentFiveSeater}`
//                 });
//                 fiveSeatCounter++;
//                 if (fiveSeatCounter % 5 === 0) currentFiveSeater++;
//             }
//         });

//         // Insert seat allocations into the database
//         const insertQueryData = seatAllocations.map(sa => [sa.student_id, sa.seat_type, sa.seat_number]);
//         insertSeatAllocations(insertQueryData, (err) => {
//             if (err) return res.status(500).send(err);
//             res.send({ message: 'Seat allocation successful', allocations: seatAllocations });
//         });
//     });
// };

// module.exports = { allocateSeats };
const { getAllStudents } = require('../models/studentModel');
const { insertSeatAllocations } = require('../models/seatModel');

const allocateSeats = (req, res) => {
    const { threeSeaters, fiveSeaters } = req.body;

    getAllStudents((err, students) => {
        if (err) return res.status(500).send(err);

        // Organize students by course
        const courseGroups = {};
        students.forEach(student => {
            if (!courseGroups[student.course_id]) {
                courseGroups[student.course_id] = [];
            }
            courseGroups[student.course_id].push(student);
        });

        let seatAllocations = [];
        let currentThreeSeater = 1;
        let currentFiveSeater = 1;
        
        // Allocate three-seater seats: 2 students of different courses
        const threeSeaterPairs = [];
        const courseIds = Object.keys(courseGroups);
        
        while (threeSeaterPairs.length < threeSeaters * 2) { // Each three-seater needs 2 students
            if (courseIds.length < 2) break; // Not enough different courses

            let [course1, course2] = courseIds.slice(0, 2);
            
            if (courseGroups[course1].length > 0 && courseGroups[course2].length > 0) {
                threeSeaterPairs.push(courseGroups[course1].pop());
                threeSeaterPairs.push(courseGroups[course2].pop());
            }
        }

        for (let i = 0; i < threeSeaterPairs.length; i += 2) {
            seatAllocations.push({
                student_id: threeSeaterPairs[i].student_id,
                name: threeSeaterPairs[i].name,
                course_id: threeSeaterPairs[i].course_id,
                seat_type: 'three_seater',
                seat_number: `3S-${currentThreeSeater}`
            });
            seatAllocations.push({
                student_id: threeSeaterPairs[i + 1].student_id,
                name: threeSeaterPairs[i + 1].name,
                course_id: threeSeaterPairs[i + 1].course_id,
                seat_type: 'three_seater',
                seat_number: `3S-${currentThreeSeater}`
            });
            currentThreeSeater++;
        }

        // Allocate five-seater seats: 2 students of the same course
        Object.values(courseGroups).forEach(group => {
            while (group.length >= 2 && currentFiveSeater <= fiveSeaters) {
                const student1 = group.pop();
                const student2 = group.pop();

                seatAllocations.push({
                    student_id: student1.student_id,
                    name: student1.name,
                    course_id: student1.course_id,
                    seat_type: 'five_seater',
                    seat_number: `5S-${currentFiveSeater}`
                });
                seatAllocations.push({
                    student_id: student2.student_id,
                    name: student2.name,
                    course_id: student2.course_id,
                    seat_type: 'five_seater',
                    seat_number: `5S-${currentFiveSeater}`
                });

                currentFiveSeater++;
            }
        });

        // Insert seat allocations into the database
        const insertQueryData = seatAllocations.map(sa => [sa.student_id, sa.seat_type, sa.seat_number]);
        insertSeatAllocations(insertQueryData, (err) => {
            if (err) return res.status(500).send(err);
            res.send({ message: 'Seat allocation successful', allocations: seatAllocations });
        });
    });
};

module.exports = { allocateSeats };
