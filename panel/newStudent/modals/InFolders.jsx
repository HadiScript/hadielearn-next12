import { Divider, List, Modal } from "antd";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { API } from "../../../config/API";
import { BiTrash } from "react-icons/bi";

const InFolders = ({ open, setOpen, current, auth, setCurrent, CallAgain }) => {
  const [file_name, setFile_name] = useState("");
  const [file, setFile] = useState("");
  
  // const [public_id, setPublic_id] = useState("");

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { files } = e.target;

    let fileSize;
    fileSize = files[0].size / 1024 / 1024;
    if (fileSize > 5) {
      toast.error("The file size greater than 5 MB. Make sure less than 5 MB.", {
        style: {
          border: "1px solid #ff0033",
          padding: "16px",
          color: "#ff0033",
        },
        iconTheme: {
          primary: "#ff0033",
          secondary: "#FFFAEE",
        },
      });
      e.target.value = null;
      return;
    }
    setFile(files[0]);
  };

  const addAssignments = async (file, file_name, x) => {
    if (!file && !file_name) {
      return toast.error("Requried**");
    }

    setUploading(true);

    const _formData = new FormData();
    _formData.append("file_name", file_name);
    _formData.append("file", file);

    try {
      const { data } = await axios.put(`${API}/lms/stu-add-assignments/${x}`, _formData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (data.ok) {
        setUploading(false);
        toast.success("added", { position: "bottom-center" });
        CallAgain();
        setCurrent({
          ...current,
          data: [...current.data, data.singleData],
        });

        setFile_name("");
        setFile("");
        setPublic_id("");
      } else if (data.error) {
        toast.error(data.error, { position: "bottom-center" });
      }
    } catch (error) {
      setUploading(false);
      // toast.error(error);
    }
  };

  const removeAssignments = async (x, y) => {
    try {
      const { data } = await axios.put(
        `${API}/lms/remove-assignment/${x}/${y}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      if (data.ok) {
        toast.success("Removed");
        CallAgain();
        setCurrent({
          ...current,
          data: current.data.filter((x) => x._id !== y),
        });
      }
    } catch (error) {
      setUploading(false);
      toast.error(error);
    }
  };

  return (
    <Modal
      title={current?.name}
      top={20}
      width={800}
      open={open}
      onOk={() => {
        addAssignments(file, file_name, current._id);
        // setOpen(false);
      }}
      onCancel={() => setOpen(false)}
    >
      <form className="row align-items-center" onSubmit={() => addAssignments(file, file_name, current._id)}>
        <div className="col-md-6 form-group">
          <label>File Name</label>
          <input type="text" className="form-control" value={file_name} required={true} onChange={(e) => setFile_name(e.target.value)} />
        </div>
        <br />
        <div className="col-md-6 form-group">
          <label className="form-label fw-semibold">Select File</label>
          <input type="file" className="form-control file-control" name="file" onChange={handleChange} required={true} />
          <div className="form-text">Upload file size less than or equal 5MB!</div>
        </div>
        <br />
      </form>

      <Divider> Uploaded Files </Divider>
      <List
        loading={uploading}
        dataSource={current.data}
        itemLayout="horizontal"
        renderItem={(item) => (
          <List.Item actions={[<>{auth?.user?._id === item.stu_id && <BiTrash role="button" onClick={() => removeAssignments(current._id, item._id)} />}</>]}>
            <List.Item.Meta
              title={<a onClick={() => window.open(item.file)}>{item.file_name}</a>}
              description={
                <>
                  {current?._id} - {item?._id}
                </>
              }
            />
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default InFolders;
