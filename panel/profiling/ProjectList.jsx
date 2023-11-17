import { Card, List } from "antd";
import React from "react";
import { BsPen, BsTrash } from "react-icons/bs";
import Titles from "./Titles";
import { useRouter } from "next/router";
import moment from "moment";

const ProjectList = ({ from = "main-page", projectData, deleteProject, setCurrent, setOpen }) => {
  const router = useRouter();
  return (
    <Card title={<Titles name={"Portfolio"} path={"/my-profile/portfolio"} router={router} from={from} />} className="mt-10">
      <List
        itemLayout="horizontal"
        dataSource={projectData}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <>{from === "editing-page" && <BsTrash color="red" onClick={() => deleteProject(item._id)} role="button" />}</>,
              <>
                {from === "editing-page" && (
                  <BsPen
                    color="blue"
                    role="button"
                    onClick={() => {
                      setCurrent(item);
                      setOpen(true);
                    }}
                  />
                )}
              </>,
            ]}
          >
            <List.Item.Meta
              title={<a>{item.title}</a>}
              description={
                <div>
                  <b>{item.description}</b>
                  <br />
                  <>
                    {moment(item?.from).format("MMMM YYYY")} - {item?.current ? "Present" : moment(item?.to).format("MMMM YYYY")}
                  </>
                  <br />
                  <a href={item.link} target="_">
                    {item.link}
                  </a>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default ProjectList;
