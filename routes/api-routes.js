const db = require("../models");

module.exports = function (app) {
  //get workout
  app.get("/api/workouts", (req, res) => {
    db.Workout.find({}, (err, workouts) => {
      if (err) {
        console.log(err);
      } else {
        res.json(workouts);
      }
    });
  });

  //add exercise
  app.put("/api/workouts/:workout", ({ params, body }, res) => {
    db.Workout.findOneAndUpdate(
      { _id: params.id },
      { $push: { excercises: body } },
      { upsert: true, useFindandModify: false },
      (updatedWorkout) => {
        res.json(updatedWorkout);
      }
    );
  });

  //new workout
  app.post("/api/workouts", (req, res) => {
    db.Workout.create({}).then((newWorkout) => {
      res.json(newWorkout);
    });
  });
};
