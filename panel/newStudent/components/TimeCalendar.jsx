import { Calendar } from "antd";
import React from "react";

const TimeCalendar = ({ classSchedule }) => {
  const dateCellRender = (value) => {
    const formattedDate = value.format("YYYY-MM-DD");
    const classStart = new Date(classSchedule.startDate).getTime();
    const classEnd = new Date(classSchedule.endDate).getTime();

    // Check if the current date falls within the class start and end date range
    const withinRange =
      formattedDate >= classSchedule.startDate &&
      formattedDate <= classSchedule.endDate;

    // Get the day of the week (0 for Sunday, 1 for Monday, etc.)
    const dayOfWeek = value.day();
    // Convert the day to the corresponding day key
    const dayKey = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ][dayOfWeek];
    // Check if the class is scheduled on the current day
    const classOnCurrentDay = withinRange && classSchedule[dayKey];

    if (classOnCurrentDay) {
      return (
        <div
          className="text-center text-white p-1"
          style={{
            background:
              "linear-gradient(329deg, rgb(49, 175, 152), rgb(15, 63, 93))",
          }}
        >
          <div>{classSchedule.title}</div>
          <div>{classSchedule.timming}</div>
        </div>
      );
    }

    return null;
  };

  return <Calendar cellRender={dateCellRender} />;
};

export default TimeCalendar;
