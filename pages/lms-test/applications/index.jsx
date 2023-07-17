import React from "react";
import LMSLayout from "../../../panel/newLMS/layouts";

const Applications = () => {
  const fetchEnrollments = async () => {
    const searchInput = document.getElementById("searchInput").value;
    const fromDateInput = document.getElementById("fromDateInput").value;
    const toDateInput = document.getElementById("toDateInput").value;
    const enrollToSelect = document.getElementById("enrollToSelect").value;
    const courseSelect = document.getElementById("courseSelect").value;

    const queryParams = new URLSearchParams({
      search: searchInput,
      fromDate: fromDateInput,
      toDate: toDateInput,
      enrollTo: enrollToSelect === "all" ? undefined : enrollToSelect,
      course: courseSelect === "all" ? undefined : courseSelect,
      page: 1, // You can handle pagination in the backend
      limit: 10, // Number of records to fetch per page
    });

    const url = `/enrollments?${queryParams.toString()}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch enrollments");
      }
      const data = await response.json();
      displayDataOnUI(data);
    } catch (error) {
      console.error(error);
      // Handle error, show error message on the UI, etc.
    }
  };

  return (
    <LMSLayout>
      <input type="text" id="searchInput" placeholder="Search..." />
      <input type="date" id="fromDateInput" />
      <input type="date" id="toDateInput" />
      <select id="enrollToSelect">
        <option value="all">All</option>
        <option value="course">Course</option>
        <option value="program">Program</option>
      </select>
      <select id="courseSelect"></select>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody id="tableBody">
          {/* <!-- Data rows will be added here --> */}
        </tbody>
      </table>
    </LMSLayout>
  );
};

export default Applications;
