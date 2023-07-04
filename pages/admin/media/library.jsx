import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Upload, message, Image, Badge } from "antd";
import { InboxOutlined, CloseCircleFilled } from "@ant-design/icons";
import axios from "axios";

import { AuthContext } from "../../../context/auth";
import { GallaryContext } from "../../../context/gallaryContext";
import AdminLayout from "../../../panel/admin/AdminLayout";
import PanelHeader from "../../../panel/common/PanelHeader";
import { API } from "../../../config/API";

//
const { Dragger } = Upload;

const MediaLibrary = ({ page = "admin" }) => {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  const [gallary, setGallary] = useContext(GallaryContext);
  const [showPreview, setShowPreview] = useState(false); // to show image preview on click or not
  const [removeLoading, setRemoveLoading] = useState(false);
  // hooks
  const router = useRouter();
  console.log("router in media library => ", router);

  const fetchMedia = async () => {
    try {
      const { data } = await axios.get(`${API}/media`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      // console.log(data);
      setGallary((prev) => ({ ...prev, images: data }));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    // execute
    if (auth && auth.token) fetchMedia();
  }, [auth && auth.token]);

  const props = {
    name: "file",
    multiple: true,
    action: `${process.env.NEXT_PUBLIC_API}/upload-image-file`,
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (status === "done") {
        // console.log("############ ============> ", info.file.response);
        setGallary({
          images: [info.file.response, ...gallary.images],
          showMediaModal: true,
          // selected: info.file.response,
        });
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const handleImageDelete = async (imageId, x) => {
    try {
      setRemoveLoading(true);

      const { data } = await axios.post(`${API}/media/${imageId}`, {
        public_id: x,
      });
      if (data.ok) {
        setGallary((prev) => ({
          ...prev,
          images: prev.images.filter((image) => image._id !== imageId),
          selected: null,
        }));
        setRemoveLoading(false);
      }
    } catch (err) {
      console.log(err);
      setRemoveLoading(false);
    }
  };

  return (
    <>
      <PanelHeader />
      <AdminLayout>
        <br />
        <br />
        <div className="" style={{ height: "150px" }}>
          <Dragger {...props} accept="image/*" style={{ height: "250px" }}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
          </Dragger>
        </div>
        <br />
        <br />
        {removeLoading && <p>loading...</p>}

        <div style={{ textAlign: "center" }}>
          {gallary?.images?.map((image) => (
            <Badge>
              <Image
                preview={showPreview}
                onClick={() => {
                  // if user is on '/admin/media/library' page, show preview
                  if (router.pathname === "/admin/media/library") {
                    setShowPreview(true);
                  } else {
                    // else set media and set as selected
                    setGallary({ ...gallary, selected: image });
                    toast.success("Selected");
                  }
                }}
                style={{
                  paddingTop: 5,
                  paddingRight: 10,
                  height: "100px",
                  width: "100px",
                  objectFit: "cover",
                }}
                src={image.url}
              />
              <br />
              {page === "author" && image.postedBy?._id === auth.user?._id ? (
                <CloseCircleFilled
                  style={{ marginRight: 10, color: "#f5222d" }}
                  onClick={() => handleImageDelete(image._id, image.public_id)}
                />
              ) : page === "admin" ? (
                <CloseCircleFilled
                  style={{ marginRight: 10, color: "#f5222d" }}
                  onClick={() => handleImageDelete(image._id, image.public_id)}
                />
              ) : (
                ""
              )}
            </Badge>
          ))}
        </div>
      </AdminLayout>
    </>
  );
};

export default MediaLibrary;
