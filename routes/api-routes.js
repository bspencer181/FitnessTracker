const db = require("../models");

module.exports = function (app) {
  //get workout
  app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
      .then((dbWorkout) => {
        dbWorkout.forEach((workout) => {
          var total = 0;
          workout.exercises.forEach((e) => {
            total += e.duration;
          });
          workout.totalDuration = total;
        });
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  //add exercise
  app.put("/api/workout/:id", (req, res) => {
    db.Workout.findOneandUpdate(
      { _id: req.params.id },
      {
        $inc: { totalDuration: req.body.duration },
        $push: { exercises: req.body },
      },
      { new: true }
    )
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  //create
  app.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  //get workouts
  app.get("api/workouts/range", (req, res) => {
    db.Workout.find({})
      .then((dbWorkout) => {
        console.log(dbWorkout);
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });
};
