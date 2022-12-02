package swp490.g23.onlinelearningsystem.entities.attendance.service.impl;


import swp490.g23.onlinelearningsystem.entities.schedule.domain.Schedule;
import swp490.g23.onlinelearningsystem.entities.schedule.repositories.ScheduleRepositories;
import swp490.g23.onlinelearningsystem.enums.ScheduleStatus;

public class RunnableTask implements Runnable {

    private ScheduleRepositories scheduleRepositories;

    private Schedule schedule;

    public RunnableTask(Schedule schedule, ScheduleRepositories scheduleRepositories) {
        this.schedule = schedule;
        this.scheduleRepositories = scheduleRepositories;
    }

    @Override
    public void run() {
        if (schedule.getStatus().equals(ScheduleStatus.Active)) {
            schedule.setStatus(ScheduleStatus.Attendance_taken);
            scheduleRepositories.save(schedule);
            System.out.println(schedule.getStatus());
        }
    }

}
