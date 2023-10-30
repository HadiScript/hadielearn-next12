import React, { useEffect, useState } from "react";
import { Fade } from "react-reveal";

import { List } from "antd";
import toast from "react-hot-toast";
import axios from "axios";
import { API } from "../../config/API";
import moment from "moment";
import Link from "next/link";

const data = Array.from({
  length: 23,
}).map((_, i) => ({
  href: "https://ant.design",
  title: `ant design part ${i}`,
  avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
  description: "Ant Design, a design language for background applications, is refined by Ant UED Team.",
  content:
    "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
}));

const StudentEnrollments = ({ auth }) => {
  const [loading, setLoading] = useState(false);
  const [enrollments, setEnrollments] = useState([]);

  const gettingErnollments = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API}/my-enrollments`);
      setEnrollments(data);
      console.log(data);
    } catch (error) {
      toast.error("Failed try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth && auth?.token) {
      gettingErnollments();
    }
  }, [auth && auth?.token]);

  return (
    <>
      <div className="container d-flex flex-column justify-content-center align-items-center mt-100">
        <Fade bottom cascade>
          <div className="page__title-content">
            <h1 className="pragrams-h1 text-center" style={{ fontSize: "40px", color: "#0f3f5d" }}>
              Your all enrollments
            </h1>
          </div>
          <p className="text-center mb-4 mt-3" style={{ maxWidth: "800px" }}>
            <em>
              We have got all your digital skill training needs covered with our extensive offered program list. All you have to do is to explore our program list, choose the
              program of your choice, and take your first step toward financial independence.
            </em>
          </p>
        </Fade>
      </div>

      <div className="container  d-flex flex-column justify-content-center align-items-center my-5">
        <List
          itemLayout="vertical"
          size="large"
          dataSource={enrollments}
          loading={loading}
          renderItem={(item) => (
            <List.Item
              key={item.title}
              actions={[
                <span text="156" key="list-vertical-star-o">
                  {moment(item.createdAt).format("MMM Do YY")}
                </span>,
                // <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                // <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
              ]}
              extra={<img className="d-none d-md-block" width={272} alt="logo" src={item.course && item.course?.image?.url} />}
            >
              <List.Item.Meta
                title={
                  <Link role="button" href={item.course ? `/program/${item?.course?.slug}` : `/workshop/${item?.workshop?.slug}`}>
                    <b>
                      {item.course && item.course?.title} {item.workshop && item.workshop?.title}
                    </b>
                  </Link>
                }
                description={<></>}
              />
              <p dangerouslySetInnerHTML={{ __html: item.course?.overview }} />
            </List.Item>
          )}
        />
      </div>
    </>
  );
};

export default StudentEnrollments;
