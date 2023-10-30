import React from "react";
import ProfileLayout from "../../panel/profiling/ProfileLayout";
import { Button, Card, List } from "antd";
import { FiEdit } from "react-icons/fi";
import { LuBrainCircuit } from "react-icons/lu";
import Link from "next/link";
import { FaUserGraduate } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";
import { MdOutlineSettings, MdWork } from "react-icons/md";
import { useRouter } from "next/router";

const navsData = [
  {
    title: "General",
    icon: <FiEdit size={22} color="#634ee3" />,
    path: "/my-profile/general",
  },
  {
    title: "Skills",
    icon: <LuBrainCircuit size={22} color="#37a0c1" />,
    path: "/my-profile/skills",
  },
  {
    title: "Education",
    icon: <FaUserGraduate size={22} color="#2c3266" />,
    path: "/my-profile/education",
  },
  {
    title: "Experience",
    icon: <HiOutlineLightBulb size={22} color="#ff4f00" />,
    path: "/my-profile/experience",
  },
  {
    title: "Certificates",
    icon: <HiOutlineLightBulb size={22} color="#bb0100" />,
    path: "/my-profile/certificate",
  },
  {
    title: "Portfolio",
    icon: <MdWork size={22} color="#409417" />,
    path: "/my-profile/portfolio",
  },
  {
    title: "Settings",
    icon: <MdOutlineSettings size={22} color="#201515" />,
    path: "/my-profile/settings",
  },
];

const EditProfileLayout = ({ children }) => {
  const pathname = useRouter().pathname;
  const router = useRouter();
  return (
    <ProfileLayout>
      <div className="container rounded bg-white mb-5" style={{ paddingTop: "50px" }}>
        <div className="d-flex gap-3 d-block d-md-none pb-3 mb-1 overflow-auto">
          {navsData?.map((x) => (
            <b
              className="text-dark"
              style={{
                padding: "10px",
                borderRadius: "10px",
                backgroundColor: `${x.path === pathname && "rgba(0,0,0,0.2)"}`,
              }}
              onClick={() => router.push(x.path)}
              key={x.title}
            >
              {x.title}
            </b>
          ))}
        </div>

        <div className="row ">
          <div className="col-md-3 d-none d-md-block">
            <List
              itemLayout="horizontal"
              dataSource={navsData}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <Link href={item.path}>
                        <span
                          style={{
                            padding: "10px",
                            borderRadius: "10px",
                            backgroundColor: `${item.path === pathname && "rgba(0,0,0,0.2)"}`,
                          }}
                          role="button"
                          className="d-flex justify-content-start align-items-center gap-3"
                        >
                          {item.icon} {item.title}
                        </span>
                      </Link>
                    }
                  />
                </List.Item>
              )}
            />
          </div>

          <div className="col-md-8">{children}</div>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default EditProfileLayout;
