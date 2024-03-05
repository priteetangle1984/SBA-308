// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};
// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};
// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];

// helper functions:
//get assignment from AssignmentGroup.assignments by id for comparison
const getAssignmentInfo = (id) =>
  AssignmentGroup.assignments.find((assignment) => assignment.id === id);

// get list of students by id# from LearnerSubmissions
const studentList = (() => {
  let temp = [];
  LearnerSubmissions.forEach((submission) => {
    temp.push(submission.learner_id);
  });
  return Array.from(new Set(temp));
})();

// use student id to get list of student submissions from LearnerSubmissions
const getStudentGrades = (id) =>
  LearnerSubmissions.filter((submission) => submission.learner_id === id);

// check if assignment was submitted at or before due date
const submittedOnTime = (submitted_at, due_at) => {
  return submitted_at <= due_at;
};

// checks whether the assignment due date has passed
const dueDateHasPassed = (due_at) => {
  return due_at <= "2024-1-2";
};

// main function: build student info
// takes one of the students ids
const createGradebook = (studentIdNumber) => {
  // create empty student object
  let student = {};

  // add student id to student object:
  student.id = studentIdNumber;

  // uses the getStudentGrades function to get an array of student submissions
  let studentGrades = getStudentGrades(student.id);

  // set temp variables for avg value
  let earnedPoints = 0;
  let possiblePoints = 0;

  // iterate through array of student assignments
  studentGrades.forEach((studentAssignment) => {
    // destructure studentAssignment object for readability
    let { assignment_id } = studentAssignment;
    let { submitted_at, score } = studentAssignment.submission;

    // use getAssignmentInfo function to get assignment details object
    let assignmentDetails = getAssignmentInfo(assignment_id);

    // destructure assignmentDetails object for readability
    let { id: assignmentID, due_at, points_possible } = assignmentDetails;

    // compare the student assignment to the assignment parameters
    // ignore assignments that aren't due yet
    if (dueDateHasPassed(due_at)) {
      // calculate if assignment submitted on time AND due date has passed
      if (submittedOnTime(submitted_at, due_at)) {
        earnedPoints += score;
        possiblePoints += points_possible;
        student[assignmentID] = parseFloat(
          (score / points_possible).toFixed(2)
        );
      } else {
        // calculate if submitted late
        earnedPoints += score -= 15;
        possiblePoints += points_possible;
        student[assignmentID] = parseFloat(
          (score / points_possible).toFixed(2)
        );
      }
    }
  });

  // add averaged grade to student object
  student.avg = parseFloat((earnedPoints / possiblePoints).toFixed(3));

  // push new student object to results array
  result.push(student);
};

// run the program
// instantiate the result variable
let result = [];

// call the main function
studentList.forEach((student) => createGradebook(student));

// return the result
console.log("Result: ", result);