package com.example.fitness.controller;

import com.example.fitness.model.WorkoutLog;
import com.example.fitness.repository.WorkoutLogRepository;
import com.example.fitness.model.User;
import com.example.fitness.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/workouts")
public class WorkoutLogController {

    @Autowired
    private WorkoutLogRepository workoutLogRepo;

    @Autowired
    private UserRepository userRepo;

    // Save workout log for a user
    @PostMapping("/{email}")
    public WorkoutLog saveWorkout(@PathVariable String email, @RequestBody WorkoutLog log) {
        User user = userRepo.findByEmail(email);
        if (user == null) throw new RuntimeException("User not found with email: " + email);
        log.setUser(user);

        // Set the date for the workout, either to the provided date or the current date
        if (log.getDate() == null) {
            log.setDate(LocalDate.now());  // Set current date if no date is provided
        }

        return workoutLogRepo.save(log);
    }

    // Get all workouts for a specific user
    @GetMapping("/{email}")
    public List<WorkoutLog> getUserWorkouts(@PathVariable String email) {
        List<WorkoutLog> workoutLogs = workoutLogRepo.findByUserEmail(email);
        workoutLogs.forEach(workoutLog -> workoutLog.setUser(null));  // Remove user object from the logs to avoid recursion
        return workoutLogs;
    }

    // Get workouts for a user within a specific week (date range)
    @GetMapping("/{email}/week")
    public List<WorkoutLog> getWeeklyWorkouts(@PathVariable String email, 
                                               @RequestParam("start") String startDateStr, 
                                               @RequestParam("end") String endDateStr) {
        LocalDate startDate = LocalDate.parse(startDateStr);
        LocalDate endDate = LocalDate.parse(endDateStr);

        List<WorkoutLog> weeklyWorkouts = workoutLogRepo.findByUserAndDateBetween(
            userRepo.findByEmail(email), startDate, endDate);

        weeklyWorkouts.forEach(workoutLog -> workoutLog.setUser(null));  // Remove user object from logs
        return weeklyWorkouts;
    }
}
