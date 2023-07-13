import { Card, Menu, Avatar, List } from "antd";
import { FaCheck } from "react-icons/fa";

import { useRouter } from "next/router";
import { DownloadOutlined } from "@ant-design/icons";

const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];

const StuNavsRight = ({ batch, assets }) => {
  const router = useRouter();

  console.log(assets, "here are assets");

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      style={{
        height: "100%",
        width: "",
        borderRight: 0,
        background: "linear-gradient(329deg,#31af98,#0f3f5d)",
        color: "white",
      }}
    >
      <div
        className=" py-2 mt-4 mb-4 text-center"
        style={{
          marginRight: "0.2rem",
          marginLeft: "0.2rem",
          borderRadius: "10px",
          backgroundColor: "white",
        }}
      >
        <ul className="list-group list-group-flush ">
          <li className="list-group-item py-3">
            <strong>Scheduel</strong>
          </li>
          {batch?.monday && (
            <li className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex justify-content-start align-items-center gap-2">
                  <FaCheck /> <span>Monday</span>
                </div>
                <span> {batch.timming} </span>
              </div>
            </li>
          )}
          {batch?.tuesday && (
            <li className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex justify-content-start align-items-center gap-2">
                  <FaCheck /> <span>Tuesday</span>
                </div>
                <span> {batch.timming} </span>
              </div>
            </li>
          )}
          {batch?.wednesday && (
            <li className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex justify-content-start align-items-center gap-2">
                  <FaCheck /> <span>Wednesday</span>
                </div>
                <span> {batch.timming} </span>
              </div>
            </li>
          )}
          {batch?.thursday && (
            <li className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex justify-content-start align-items-center gap-2">
                  <FaCheck /> <span>Thursday</span>
                </div>
                <span> {batch.timming} </span>
              </div>
            </li>
          )}
          {batch?.friday && (
            <li className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex justify-content-start align-items-center gap-2">
                  <FaCheck /> <span>Friday</span>
                </div>
                <span> {batch.timming} </span>
              </div>
            </li>
          )}
          {batch?.saturday && (
            <li className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex justify-content-start align-items-center gap-2">
                  <FaCheck /> <span>Saturday</span>
                </div>
                <span> {batch.timming} </span>
              </div>
            </li>
          )}
        </ul>
      </div>

      <div
        className="mt-4 mb-4 py-2 text-center"
        style={{
          marginRight: "0.2rem",
          marginLeft: "0.2rem",
          borderRadius: "10px",
          backgroundColor: "white",
        }}
      >
        <ul className="list-group list-group-flush ">
          <li className="list-group-item py-3">
            <strong>Assets</strong>
          </li>
          {assets?.map((x, index) => (
            <li key={index} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <span>{x.title}</span>
                <span>
                  <DownloadOutlined onClick={() => window.open(x.file)}/>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Menu>
  );
};

export default StuNavsRight;
