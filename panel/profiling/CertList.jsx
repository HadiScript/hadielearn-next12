import { Card, List } from "antd";
import React from "react";
import { BsPen, BsTrash } from "react-icons/bs";
import Titles from "./Titles";
import { useRouter } from "next/router";
import moment from "moment";

const CertLists = ({ from = "main-page", certData, deleteCertificate, setCurrent, setOpen }) => {
  const router = useRouter();

  return (
    <Card title={<Titles name={"Your Certificates"} path={"/my-profile/certificate"} from={from} router={router} />} className="mt-10">
      <List
        itemLayout="horizontal"
        dataSource={certData}
        renderItem={(item) => (
          <List.Item
            actions={[
              <>{from === "editing-page" && <BsTrash color="red" onClick={() => deleteCertificate(item._id)} role="button" />}</>,
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
                <>
                  <b>{item.platform}</b>
                  <br />
                  {moment(item?.from).format("MMMM YYYY")} - {item?.current ? "Present" : moment(item?.to).format("MMMM YYYY")}
                </>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default CertLists;
