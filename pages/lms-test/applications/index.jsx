import React, { useEffect, useState } from "react";
import LMSLayout from "../../../panel/newLMS/layouts";
import { API } from "../../../config/API";
import axios from "axios";
import { Card, Descriptions, Modal, Space, Tag } from "antd";
import TableComponent from "../../../components/Applications/TableComponent";
import { toast } from "react-hot-toast";
import Btn from "../../../components/ui/Btn";
import { saveAs } from "file-saver";
import Papa from "papaparse";

const Applications = () => {
  const [enrollments, setEnrollments] = useState([]);

  const [limit, setLimit] = useState(10);

  const [searchInput, setSearchInput] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [enrollToSelect, setEnrollToSelect] = useState("");
  const [totalDataCount, setTotalDataCount] = useState();
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [courseSelect, setCourseSelect] = useState("");
  const [fetchedCourses, setFetchedCourses] = useState([]);

  const [open, setOpen] = useState(false);
  const [currentObj, setCurrentObj] = useState({});

  useEffect(() => {
    const fetchingData = async () => {
      try {
        const { data } = await axios.get(
          `${API}/fetch/enrollments?page=${currentPage}&limit=${limit}&search=${searchInput}&fromDate=${fromDate}&endDate=${endDate}&enrollTo=${enrollToSelect}&course=${courseSelect}`
        );
        setEnrollments(data.enrollments);
        setTotalPages(data.totalPages);
        setTotalDataCount(data.total);
      } catch (error) {
        console.log(error);
      }
    };
    fetchingData();
  }, [
    searchInput,
    fromDate,
    endDate,
    enrollToSelect,
    currentPage,
    courseSelect,
    limit,
  ]);

  const fetchingCourses = async () => {
    try {
      const { data } = await axios.get(`${API}/courses-form`);
      if (data.courses) {
        setFetchedCourses(data.courses);
      }
    } catch (error) {
      toast.error("Failed, try again");
    }
  };

  useEffect(() => {
    if (enrollToSelect === "program") {
      fetchingCourses();
    }
  }, [enrollToSelect]);

  const Reset = () => {
    setSearchInput("");
    setFromDate("");
    setEndDate("");
    setEnrollToSelect("");
    setCourseSelect("");
  };

  // const dataToCSV = (data) => {
  //   const headers = Object.keys(data[0]);
  //   const rows = data.map((item) => headers.map((header) => item[header]));
  //   const csvData = [headers, ...rows].map((row) => row.join(","));

  //   return csvData.join("\n");
  // };

  const dataToCSV = (data) => {
    const csv = Papa.unparse(data, {
      header: true,
    });
    return csv;
  };

  const exportToCSV = () => {
    const csvData = dataToCSV(enrollments);

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "data.csv");
  };

  return (
    <>
      <LMSLayout>
        <Space wrap>
          <input
            className="form-control"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search..."
          />
          <input
            className="form-control"
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <input
            className="form-control"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <select
            className="form-control"
            value={enrollToSelect}
            onChange={(e) => {
              setEnrollToSelect(e.target.value);
            }}
            id="enrollToSelect"
          >
            <option>select</option>
            <option value="workshop">Workshop</option>
            <option value="program">Program</option>
          </select>
          <select
            className="form-control"
            value={courseSelect}
            onChange={(e) => {
              setCourseSelect(e.target.value);
            }}
            id="enrollToSelect"
          >
            <option>Choose Course</option>
            {fetchedCourses?.map((x) => (
              <option key={x._id} value={x.slug}>
                {x.title}
              </option>
            ))}
          </select>

          <select
            className="form-control"
            value={limit}
            onChange={(e) => {
              setLimit(e.target.value);
            }}
            id="enrollToSelect"
          >
            <option value={10}>10 - limit</option>
            <option value={20}>20 - limit</option>
            <option value={50}>50 - limit</option>
            <option value={100}>100 - limit</option>
            <option value={200}>200 - limit</option>
            <option value={2000}>2000 - limit</option>
            <option value={5000}>5000 - limit</option>
            <option value={10000}>10000 - limit</option>
          </select>
          <Btn onClick={Reset}> Reset </Btn>
          <Btn onClick={exportToCSV}> Export CSV </Btn>
        </Space>
        <Card className="mt-5">
          <h5> Enrollments: {totalDataCount} </h5>
          <br />
          <TableComponent
            enrollments={enrollments}
            totalDataCount={totalDataCount}
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setOpen={setOpen}
            setCurrentObj={setCurrentObj}
          />
        </Card>
      </LMSLayout>

      <Modal
        title={currentObj.firstName + " " + currentObj.lastName}
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        {/* {JSON.stringify(currentObj)} */}
        <Descriptions
          bordered
          column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        >
          <Descriptions.Item label="Email">
            {currentObj.email}
          </Descriptions.Item>
          <Descriptions.Item label="ID Card">
            {currentObj.idCard}
          </Descriptions.Item>
          <Descriptions.Item label="Date of birth">
            {currentObj.dateOfBirth}
          </Descriptions.Item>
          <Descriptions.Item label="Phone Number">
            {currentObj.phoneNumber}
          </Descriptions.Item>
          <Descriptions.Item label="WhatsApp Number">
            {currentObj.whatsAppphoneNumber}
          </Descriptions.Item>

          <Descriptions.Item label="Parent name">
            {currentObj.parentName}
          </Descriptions.Item>
          <Descriptions.Item label="Parent Occupation">
            {currentObj.parentOccupations}
          </Descriptions.Item>
          <Descriptions.Item label="Parent Phone">
            {currentObj.parentPhoneNumber}
          </Descriptions.Item>
          {/* <br /> */}
          <Descriptions.Item label="Interest">
            {currentObj.interest}
          </Descriptions.Item>
          <Descriptions.Item label="Want to achieve">
            {currentObj.wantToAchieve}
          </Descriptions.Item>
          <Descriptions.Item label="Enroll Into">
            {currentObj.enrollTo === "program"
              ? currentObj?.course
              : currentObj.workshop}
          </Descriptions.Item>
          <br />
          <Descriptions.Item label="City">{currentObj.city}</Descriptions.Item>
          <Descriptions.Item label="Address">
            {currentObj.address}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </>
  );
};

export default Applications;
