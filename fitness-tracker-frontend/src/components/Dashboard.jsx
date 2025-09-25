// import React, { useState, useEffect } from "react";
// import "./Dashboard.css";
// import CalorieCalculator from "./CalorieCalculator";
// import StepsCalculator from "./StepsCalculator";
// import WorkoutLogger from "./WorkoutLogger";
// import WeeklyProgressChart from "./WeeklyProgressChart"; // Import the Weekly Progress Chart
// import axios from "axios";

// const Dashboard = () => {
//   const [workoutLogs, setWorkoutLogs] = useState([]);
//   const userEmail = localStorage.getItem("userEmail"); // Get user email from localStorage

//   // Fetch user's workouts from backend
//   const fetchWorkoutLogs = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8080/api/workouts/${userEmail}`
//       );
//       console.log("Fetched workout logs:", response.data); // Log the fetched data
//       setWorkoutLogs(response.data); // Set the fetched workout logs
//     } catch (error) {
//       console.error("Error fetching workout logs:", error);
//     }
//   };

//   useEffect(() => {
//     if (userEmail) {
//       fetchWorkoutLogs(); // Fetch workout logs on component mount
//     }
//   }, [userEmail]);

//   // Add new workout both locally and in DB
//   const handleAddWorkout = async (workout) => {
//     try {
//       const response = await axios.post(
//         `http://localhost:8080/api/workouts/${userEmail}`,
//         {
//           ...workout,
//           duration: parseInt(workout.duration),
//           calories: parseInt(workout.calories),
//           date: workout.date, // Include the date of the workout
//         }
//       );

//       console.log("Added workout:", response.data); // Log the response data

//       // Re-fetch workout logs after adding a new workout to update the chart
//       fetchWorkoutLogs(); // Re-fetch workout logs from the backend
//     } catch (error) {
//       console.error("Error saving workout:", error);
//     }
//   };

//   // Calculate total calories burned
//   const totalCaloriesBurned = workoutLogs.reduce(
//     (total, workout) => total + parseFloat(workout.calories || 0),
//     0
//   );

//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-card">
//         <h1>Welcome Back, Champion – Your Progress Starts Here!</h1>
//         <p>
//           From reps to results, Fitness Tracker keeps you aligned and
//           accountable
//         </p>

//         <div className="dashboard-grid">
//           <div className="dashboard-widget">
//             <h3>Progress Chart</h3>
//             <WeeklyProgressChart workoutLogs={workoutLogs} />{" "}
//             {/* Pass workout logs to the chart */}
//           </div>

//           <div className="dashboard-widget">
//             <h3>Store your workout</h3>
//             <WorkoutLogger onAddWorkout={handleAddWorkout} />
//           </div>

//           <div className="dashboard-widget">
//             <CalorieCalculator />
//           </div>

//           <div className="dashboard-widget">
//             <StepsCalculator />
//           </div>
//         </div>

//         {/* <div className="calculators-row">
//           <CalorieCalculator />
//           <StepsCalculator />
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// new Dashboard

// import React, { useState, useEffect } from "react";
// import "./Dashboard.css";
// import CalorieCalculator from "./CalorieCalculator";
// import StepsCalculator from "./StepsCalculator";
// import WorkoutLogger from "./WorkoutLogger";
// import WeeklyProgressChart from "./WeeklyProgressChart";
// import axios from "axios";

// const Dashboard = () => {
//   const [activeTab, setActiveTab] = useState("chart");
//   const [workoutLogs, setWorkoutLogs] = useState([]);
//   const userEmail = localStorage.getItem("userEmail");

//   const fetchWorkoutLogs = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8080/api/workouts/${userEmail}`
//       );
//       setWorkoutLogs(response.data);
//     } catch (error) {
//       console.error("Error fetching workout logs:", error);
//     }
//   };

//   useEffect(() => {
//     if (userEmail) {
//       fetchWorkoutLogs();
//     }
//   }, [userEmail]);

//   const handleAddWorkout = async (workout) => {
//     try {
//       await axios.post(`http://localhost:8080/api/workouts/${userEmail}`, {
//         ...workout,
//         duration: parseInt(workout.duration),
//         calories: parseInt(workout.calories),
//         date: workout.date,
//       });
//       fetchWorkoutLogs();
//     } catch (error) {
//       console.error("Error saving workout:", error);
//     }
//   };

//   const renderActiveWidget = () => {
//     switch (activeTab) {
//       case "chart":
//         return (
//           <div className="dashboard-widget">
//             <h3>Progress Chart</h3>
//             <WeeklyProgressChart workoutLogs={workoutLogs} />
//           </div>
//         );
//       case "log":
//         return (
//           <div className="dashboard-widget">
//             <h3>Store Your Workout</h3>
//             <WorkoutLogger onAddWorkout={handleAddWorkout} />
//           </div>
//         );
//       case "calories":
//         return (
//           <div className="dashboard-widget">
//             <CalorieCalculator />
//           </div>
//         );
//       case "steps":
//         return (
//           <div className="dashboard-widget">
//             <StepsCalculator />
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-card">
//         <h1>Welcome Back, Champion – Your Progress Starts Here!</h1>
//         <p>
//           From reps to results, Fitness Tracker keeps you aligned and
//           accountable
//         </p>

//         <div className="dashboard-tabs">
//           <button onClick={() => setActiveTab("chart")}>Progress Chart</button>
//           <button onClick={() => setActiveTab("log")}>Record Workout</button>
//           <button onClick={() => setActiveTab("calories")}>
//             Calorie Calculator
//           </button>
//           <button onClick={() => setActiveTab("steps")}>BMI Calculator</button>
//         </div>

//         {renderActiveWidget()}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// new updated
import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import CalorieCalculator from "./CalorieCalculator";
import StepsCalculator from "./StepsCalculator";
import WorkoutLogger from "./WorkoutLogger";
import WeeklyProgressChart from "./WeeklyProgressChart";
import axios from "axios";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("chart");
  const [workoutLogs, setWorkoutLogs] = useState([]);
  const userEmail = localStorage.getItem("userEmail");

  const fetchWorkoutLogs = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/workouts/${userEmail}`
      );
      setWorkoutLogs(response.data);
    } catch (error) {
      console.error("Error fetching workout logs:", error);
    }
  };

  useEffect(() => {
    if (userEmail) {
      fetchWorkoutLogs();
    }
  }, [userEmail]);

  const handleAddWorkout = async (workout) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/workouts/${userEmail}`,
        {
          ...workout,
          duration: parseInt(workout.duration),
          calories: parseInt(workout.calories),
          date: workout.date,
        }
      );
      fetchWorkoutLogs();
    } catch (error) {
      console.error("Error saving workout:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1>Welcome Back, Champion – Your Progress Starts Here!</h1>
        <p>
          From reps to results, Fitness Tracker keeps you aligned and
          accountable
        </p>

        <div className="dashboard-tab-buttons">
          <button
            onClick={() => setActiveTab("chart")}
            className={activeTab === "chart" ? "active" : ""}
          >
            Progress Chart
          </button>
          <button
            onClick={() => setActiveTab("logger")}
            className={activeTab === "logger" ? "active" : ""}
          >
            Workout Logger
          </button>
          <button
            onClick={() => setActiveTab("calories")}
            className={activeTab === "calories" ? "active" : ""}
          >
            Calorie Calculator
          </button>
          <button
            onClick={() => setActiveTab("steps")}
            className={activeTab === "steps" ? "active" : ""}
          >
            Steps Calculator
          </button>
        </div>

        <div className="dashboard-widget">
          {activeTab === "chart" && (
            <>
              <h3>Progress Chart</h3>
              <WeeklyProgressChart workoutLogs={workoutLogs} />
            </>
          )}
          {activeTab === "logger" && (
            <>
              <h3>Store Your Workout</h3>
              <WorkoutLogger onAddWorkout={handleAddWorkout} />
            </>
          )}
          {activeTab === "calories" && <CalorieCalculator />}
          {activeTab === "steps" && <StepsCalculator />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
