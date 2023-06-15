import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth";
import { GallaryContext } from "../../../context/gallaryContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";
import { API } from "../../../config/API";
import { useState } from "react";
import PanelHeader from "../../../panel/common/PanelHeader";
import AdminLayout from "../../../panel/admin/AdminLayout";
import { toast } from "react-hot-toast";

const BlogMedia = () => {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  const [gallary, setGallary] = useContext(GallaryContext);
  const [showPreview, setShowPreview] = useState(false); // to show image preview on click or not
  // hooks
  const router = useRouter();
  console.log("router in media library => ", router);

//   const fetchMedia = async () => {
//     try {
//       const { data } = await axios.get(`${API}/media`, {
//         headers: {
//           Authorization: `Bearer ${auth?.token}`,
//         },
//       });
//       console.log(data, "fetching medias");
//       setGallary((prev) => ({ ...prev, images: data }));
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   useEffect(() => {
//     // execute
//     if (auth && auth.token) fetchMedia();
//   }, [auth && auth.token]);

//   const props = {
//     name: "file",
//     multiple: true,
//     action: `${API}/upload-image-file`,
//     headers: {
//       Authorization: `Bearer ${auth?.token}`,
//     },
//     onChange(info) {
//       const { status } = info.file;
//       if (status !== "uploading") {
//         // console.log(info.file, info.fileList);
//       }
//       if (status === "done") {
//         // console.log("############ ============> ", info.file.response);
//         setGallary({
//           images: [info.file.response, ...media.images],
//           showMediaModal: true,
//           // selected: info.file.response,
//         });
//         message.success(`${info.file.name} file uploaded successfully.`);
//       } else if (status === "error") {
//         message.error(`${info.file.name} file upload failed.`);
//       }
//     },
//     onDrop(e) {
//       console.log("Dropped files", e.dataTransfer.files);
//     },
//   };

//   const handleImageDelete = async (imageId) => {
//     try {
//       const { data } = await axios.delete(`${API}/media/${imageId}`);
//       console.log(data);
//       if (data.ok) {
//         setGallary((prev) => ({
//           ...prev,
//           images: prev.images.filter((image) => image._id !== imageId),
//           selected: null,
//         }));
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

  return (
    <PanelHeader>
      <AdminLayout>
        <div className="form-group py-2">
          <h5 for="exampleFormControlInput1"> Breadcrumb Title</h5>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            name="breadTitle"
            placeholder="Breadcrumb Title"
            // value={breadTitle}
            // onChange={(e) => setBreadTitle(e.target.value)}
          />
        </div>
        {/* <input draggable={true} type="file" {...props} accept="image/*" /> */}
      </AdminLayout>
    </PanelHeader>
  );
};

export default BlogMedia;
