import { Card, List } from "antd";
import React from "react";
import { BsPen, BsTrash } from "react-icons/bs";
import Titles from "./Titles";
import { useRouter } from "next/router";

const ExpLists = ({
  from = "main-page",
  expData,
  deleteExperience,
  setCurrent,
  setOpen,
}) => {
  const router = useRouter();
  return (
    <Card
      title={
        <Titles
          name={"Experience"}
          path={"/my-profile/experience"}
          router={router}
          from={from}
        />
      }
      className="mt-10"
    >
      <List
        itemLayout="horizontal"
        dataSource={expData}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <>
                {from === "editing-page" && (
                  <BsTrash
                    color="red"
                    onClick={() => deleteExperience(item._id)}
                    role="button"
                  />
                )}
              </>,
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
                  <b>
                    {item.company} | {item.typeOfJob}
                  </b>
                  <br />
                  <>
                    {item.from} - {item.to}
                  </>
                  <br />
                  <b>
                    Skills: {item.skills}
                    {/* {item.skills.map((x) => (
                      <>{x} - </>
                    ))} */}
                  </b>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default ExpLists;
