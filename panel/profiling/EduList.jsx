import { Button, Card, List } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { FaEdit } from "react-icons/fa";
import Titles from "./Titles";
import { BsPen } from "react-icons/bs";

const EduList = ({
  from = "main-page",
  eduList,
  deleteEducation,
  setCurrent,
  setOpen,
}) => {
  const router = useRouter();
  return (
    <Card
      title={
        <Titles
          name={"Education"}
          path={"/my-profile/education"}
          from={from}
          router={router}
        />
      }
      className="mt-10"
    >
      <List
        itemLayout="horizontal"
        dataSource={eduList}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <>
                {from === "editing-page" && (
                  <span
                    className="text-danger"
                    onClick={() => deleteEducation(item._id)}
                  >
                    delete
                  </span>
                )}
              </>,
              <>
                {from === "editing-page" && (
                  <BsPen
                    color="blue"
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
              title={<a>{item.degree}</a>}
              description={
                <div>
                  <b>{item.school}</b>
                  <br />
                  <>
                    {item?.from?.slice(0, 10)} -{" "}
                    {item?.current ? "current" : item?.to?.slice(0, 10)}
                  </>
                  <br />
                  <>{item.description}</>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default EduList;
