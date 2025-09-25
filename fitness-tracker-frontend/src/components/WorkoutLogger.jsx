import React, { useState } from "react";
import "./WorkoutLogger.css";

const WorkoutLogger = ({ onAddWorkout }) => {
  const [workout, setWorkout] = useState({
    name: "",
    duration: "",
    calories: "",
    date: "", // Date field for workout
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkout((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (workout.name && workout.duration && workout.calories && workout.date) {
      onAddWorkout(workout); // Pass the workout to parent component
      setWorkout({ name: "", duration: "", calories: "", date: "" }); // Reset form
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="workout-logger">
      <h3>Enter Workout Details</h3>
      <form onSubmit={handleSubmit} className="workout-form">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <div style={{ flex: "1" }}>
            <label>Workout Name:</label>
            <input
              type="text"
              name="name"
              value={workout.name}
              onChange={handleChange}
              placeholder="e.g. Running"
              required
              style={{ width: "95%", maxWidth: "200px" }} // Smaller size
            />
          </div>

          <div style={{ flex: "1" }}>
            <label>Duration (in minutes):</label>
            <input
              type="number"
              name="duration"
              value={workout.duration}
              onChange={handleChange}
              placeholder="e.g. 30"
              required
              style={{ width: "95%", maxWidth: "200px" }} // Smaller size
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <div style={{ flex: "1" }}>
            <label>Calories Burned:</label>
            <input
              type="number"
              name="calories"
              value={workout.calories}
              onChange={handleChange}
              placeholder="e.g. 300"
              required
              style={{ width: "95%", maxWidth: "200px" }} // Smaller size
            />
          </div>

          <div style={{ flex: "1" }}>
            <label>Date of Workout:</label>
            <input
              type="date"
              name="date"
              value={workout.date}
              onChange={handleChange}
              required
              style={{ width: "95%", maxWidth: "200px" }} // Smaller size
            />
          </div>
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#4bc0c0",
            color: "white",
            fontSize: "16px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginTop: "15px",
          }}
        >
          Log Workout
        </button>
      </form>
    </div>
  );
};

export default WorkoutLogger;
