import React, { useContext, useEffect, useState } from "react";
import LMSLayout from "../../../panel/newLMS/layouts";
import { API } from "../../../config/API";
import axios from "axios";
import { Card, Descriptions, Modal, Space, Tag } from "antd";
import TableComponent from "../../../components/Applications/TableComponent";
import { toast } from "react-hot-toast";
import Btn from "../../../components/ui/Btn";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import { AuthContext } from "../../../context/auth";

const Applications = () => {
  const [auth] = useContext(AuthContext);
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
  const [workshopSelect, setWorkshopSelect] = useState("");
  const [fetchedCourses, setFetchedCourses] = useState([]);
  const [fetchWorkshopsData, setFetchWorkshopsData] = useState([]);

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [currentObj, setCurrentObj] = useState({});

  const fetchingData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${API}/fetch/enrollments?page=${currentPage}&limit=${limit}&search=${searchInput}&fromDate=${fromDate}&endDate=${endDate}&enrollTo=${enrollToSelect}&course=${courseSelect}&workshop=${workshopSelect}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      setEnrollments(data.enrollments);
      setTotalPages(data.totalPages);
      setTotalDataCount(data.total);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (auth && auth.token) fetchingData();
  }, [auth && auth.token, searchInput, fromDate, endDate, enrollToSelect, currentPage, courseSelect, workshopSelect, limit]);

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

  const fetchingWorkshops = async () => {
    try {
      // const { data } = await axios.get(`${API}/workshops-form`);
      const { data } = await axios.get(`${API}/workshopfilters`);
      console.log(data, "workshop data");
      if (data._workshops) {
        setFetchWorkshopsData(data._workshops);
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

  useEffect(() => {
    if (enrollToSelect === "workshop") {
      console.log("running for workshops");
      fetchingWorkshops();
    }
  }, [enrollToSelect]);

  const Reset = () => {
    setSearchInput("");
    setFromDate("");
    setEndDate("");
    setEnrollToSelect("");
    setCourseSelect("");
  };

  const dataToCSV = (data) => {
    const csv = Papa.unparse(data, {
      header: true,
    });
    return csv;
  };

  const exportToCSV = () => {
    let _enrollments = [];

    enrollments.map((x) => {
      _enrollments.push({ ...x, dateOfBirth: x.dateOfBirth.slice(0, 10) });
    });

    const csvData = dataToCSV(_enrollments);

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "data.csv");
  };

  const refreshData = () => {
    fetchingData();
  };

  return (
    <>
      <LMSLayout>
        <Space wrap>
          <input className="form-control" type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Search..." />
          <input className="form-control" type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          <input className="form-control" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          <select
            className="form-control"
            value={enrollToSelect}
            onChange={(e) => {
              setEnrollToSelect(e.target.value);
            }}
            id="enrollToSelect"
          >
            <option value={""}>Select</option>
            <option value="workshop">Workshop</option>
            <option value="program">Program</option>
          </select>
          {enrollToSelect === "program" && (
            <select
              className="form-control"
              value={courseSelect}
              onChange={(e) => {
                setCourseSelect(e.target.value);
              }}
              id="enrollToSelect"
            >
              <option value={""}>Choose Course</option>
              {fetchedCourses?.map((x) => (
                <option key={x._id} value={x.slug}>
                  {x.title}
                </option>
              ))}
            </select>
          )}

          {enrollToSelect === "workshop" && (
            <select
              className="form-control"
              value={workshopSelect}
              onChange={(e) => {
                setWorkshopSelect(e.target.value);
              }}
              id="enrollToSelect"
            >
              <option value={""}>Choose Workshop</option>
              {fetchWorkshopsData?.map((x) => (
                <option key={x._id} value={x.slug}>
                  {x.title}
                </option>
              ))}
            </select>
          )}

          <select
            className="form-control"
            value={limit}
            onChange={(e) => {
              setLimit(e.target.value);
            }}
            id="enrollToSelect"
          >
            <option value={0}>Limit Export</option>
            <option value={10}>10 - limit</option>
            <option value={20}>20 - limit</option>
            <option value={50}>50 - limit</option>
            <option value={100}>100 - limit</option>
            <option value={200}>200 - limit</option>
            <option value={2000}>2000 - limit</option>
            <option value={5000}>5000 - limit</option>
            <option value={10000}>10000 - limit</option>
            <option value={totalDataCount}>{totalDataCount} - limit</option>
          </select>
          <Btn onClick={Reset}> Reset </Btn>
          <Btn onClick={exportToCSV}> Export CSV </Btn>
          <Btn onClick={refreshData}> Refresh </Btn>
        </Space>
        <Card className="mt-5">
          <h5>
            Enrollments: {totalDataCount} {loading && "loading..."}
          </h5>
          <br />
          <TableComponent
            enrollments={enrollments}
            totalDataCount={totalDataCount}
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            enrollToSelect={enrollToSelect}
            setOpen={setOpen}
            setCurrentObj={setCurrentObj}
          />
        </Card>
      </LMSLayout>

      <Modal title={currentObj.firstName + " " + currentObj.lastName} centered open={open} onOk={() => setOpen(false)} onCancel={() => setOpen(false)} width={1000}>
        {/* {JSON.stringify(currentObj)} */}
        <Descriptions bordered column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
          <Descriptions.Item label="Email">{currentObj.email}</Descriptions.Item>
          <Descriptions.Item label="ID Card">{currentObj.idCard}</Descriptions.Item>
          <Descriptions.Item label="Date of birth">{currentObj.dateOfBirth}</Descriptions.Item>
          <Descriptions.Item label="Phone Number">{currentObj.phoneNumber}</Descriptions.Item>
          <Descriptions.Item label="WhatsApp Number">{currentObj.whatsAppphoneNumber}</Descriptions.Item>

          <Descriptions.Item label="Parent name">{currentObj.parentName}</Descriptions.Item>
          <Descriptions.Item label="Parent Occupation">{currentObj.parentOccupations}</Descriptions.Item>
          <Descriptions.Item label="Parent Phone">{currentObj.parentPhoneNumber}</Descriptions.Item>
          {/* <br /> */}
          <Descriptions.Item label="Interest">{currentObj.interest}</Descriptions.Item>
          <Descriptions.Item label="Want to achieve">{currentObj.wantToAchieve}</Descriptions.Item>
          <Descriptions.Item label="Enroll Into">{currentObj.enrollTo === "program" ? currentObj?.course : currentObj.workshop}</Descriptions.Item>
          <br />
          <Descriptions.Item label="City">{currentObj.city}</Descriptions.Item>
          <Descriptions.Item label="Address">{currentObj.address}</Descriptions.Item>
        </Descriptions>
      </Modal>
    </>
  );
};

export default Applications;
