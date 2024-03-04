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
  function getLearnerData(courseInfo, assignmentGroup, learnerSubmissions) {
    if (assignmentGroup.course_id !== courseInfo.id) {
      throw new Error ("Invalid input: AssignmentGroup does not belong to the course.");
    }
    const assignmentScores = {};
    for (const submission of learnerSubmissions) {
      const assignment = assignmentGroup.assignments.find (a => a.id === submission.assignment_id);
      if (new Date(assignment.due_at) > new Date()) {
        continue;
      }
      let scorePercentage = submission.submission.score / assignment.points_possible;
      if (new Date(submission.submission.submitted_at) > new Date(assignment.due_at)) {
        scorePercentage -= 0.1;
      }
      assignmentScores[assignment.id] = scorePercentage;
    }
    let totalWeightedScore = 0;
    let totalWeight = 0;
    for (const assignment of assignmentGroup.assignments) {
      if (assignment.id in assignmentScores) {
        const assignmentWeight = assignment.points_possible * assignmentGroup.group_weight;
        totalWeightedScore += assignmentScores[assignment.id] * assignmentWeight;
        totalWeight += assignmentWeight;
      }
    }
    const averageScore = totalWeightedScore / totalWeight;
    const result = {
      id: courseInfo.id,
      avg: averageScore,
    };
    for (const assignment of assignmentGroup.assignments) {
      if (assignment.id in assignmentScores) {
        result[assignment.id] = assignmentScores[assignment.id];
      }
    }
    return [result];
  }
  console.log(getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions));