import { useRouter } from "next/router";
import React, { useState } from "react";
import BatchLayout from "../../../../panel/newInstructor/layouts";
import useSingleBatch from "../../../../panel/newInstructor/hooks/useSingleBatch";
import axios from "axios";
import { API } from "../../../../config/API";
import { Card, Col, List, Modal, Row } from "antd";
import Btn from "../../../../components/ui/Btn";
import { IconText } from "../lessons/[id]";

import { BiFolder, BiTrash } from "react-icons/bi";
import { EditOutlined } from "@ant-design/icons";
import FilesModel from "../../../../panel/newInstructor/modals/FilesModel";
import { toast } from "react-hot-toast";

const SingleBatchFolders = () => {
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState("");
  const [newName, setNewName] = useState("");
  const [current, setCurrent] = useState({});
  const [open, setOpen] = useState(false);
  const [file_name, setFile_name] = useState("");
  const [file, setFile] = useState("");
  const [public_id, setPublic_id] = useState("");
  const [openFileModel, setOpenFileModel] = useState(false);
  const [uploading, setUploading] = useState(false);

  // get all folders
  const itemsURL = `${API}/lms/all-folders/${id}`;

  const {
    singleBatch,
    items,
    itemsLoading,
    loading,
    updateItem,
    updatesLoading,
    deleteItem,
    addItem,
    assignments,
  } = useSingleBatch({
    id,
    itemsURL,
  });

  const addFolder = async (e) => {
    e.preventDefault();
    if (!name) return toast.error("Please enter the folder name");
    const addItemURL = `${API}/lms/create-folder/${id}`;
    addItem({ name }, addItemURL);
  };

  const updateFolder = (newName, x) => {
    if (!newName) return toast.error("fields are requried");

    const updateItemURL = `${API}/lms/update-folder/${x}`;
    updateItem({ name: newName }, updateItemURL);
  };

  const deleteFolder = async (x) => {
    const deleteItemURL = `${API}/lms/delete-folder/${x}`;
    deleteItem(deleteItemURL);
  };

  // handling files
  // handlers and files uploading
  const handleChange = (e) => {
    const { files } = e.target;

    let fileSize;
    fileSize = files[0].size / 1024 / 1024;
    if (fileSize > 5) {
      toast.error(
        "The file size greater than 5 MB. Make sure less than 5 MB.",
        {
          style: {
            border: "1px solid #ff0033",
            padding: "16px",
            color: "#ff0033",
          },
          iconTheme: {
            primary: "#ff0033",
            secondary: "#FFFAEE",
          },
        }
      );
      e.target.value = null;
      return;
    }
    setFile(files[0]);
  };

  const handleAssetUpload = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", process.env.UPLOAD_PRESETS);
    let assetUrl;
    let response;
    if (file) {
      try {
        response = await fetch(process.env.CLOUDINARY_ZIP_URL, {
          method: "POST",
          body: data,
        });

        const { secure_url, public_id } = await response.json();
        setPublic_id(public_id);
        assetUrl = secure_url;
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }

    return assetUrl;
  };

  const addAssignments = async (file, file_name, x) => {
    if (!file && !file_name) {
      return toast.error("Requried**");
    }

    setUploading(true);
    let assetUrl = "";
    if (file) {
      const assetUpload = await handleAssetUpload();
      assetUrl = assetUpload.replace(/^http:\/\//i, "https://");
    }

    const addAssignmentsURL = `${API}/lms/add-assignments/${x}`;
    assignments({ file: assetUrl, file_name, public_id }, addAssignmentsURL);
    setUploading(false);
  };

  const removeAssignments = async (x, y) => {
    const addAssignmentsURL = `${API}/lms/remove-assignment/${x}/${y}`;
    assignments({}, addAssignmentsURL);
  };
  return (
    <>
      <BatchLayout BatchId={id}>
        <Row
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          <Col sm={24} xs={24} md={10} lg={10}>
            <Card>
              <h4>Add Folders</h4>
              <form onSubmit={addFolder}>
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <br />
              </form>
              <br />
              <Btn type="submit" onClick={addFolder}>
                Add New
              </Btn>
            </Card>
          </Col>
          <Col sm={24} xs={24} md={14} lg={14}>
            <div style={{ height: "700px", overflow: "auto" }}>
              <Card>
                <List
                  loading={itemsLoading}
                  style={{ maxWidth: "500px" }}
                  itemLayout="horizontal"
                  dataSource={items}
                  renderItem={(item) => (
                    <List.Item
                      actions={[
                        <IconText
                          icon={
                            <EditOutlined
                              role="button"
                              onClick={() => {
                                setCurrent(item);
                                setOpen(true);
                                setNewName(item.name);
                              }}
                            />
                          }
                        />,
                        <IconText
                          icon={
                            <BiTrash
                              role="button"
                              onClick={() => deleteFolder(item._id)}
                            />
                          }
                        />,
                        <IconText
                          icon={
                            <BiFolder
                              role="button"
                              onClick={() => {
                                setCurrent(item);
                                setOpenFileModel(true);
                              }}
                            />
                          }
                        />,
                      ]}
                    >
                      <List.Item.Meta
                        title={
                          <>
                            {item.name} ({item.data?.length})
                          </>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </div>
          </Col>
        </Row>
      </BatchLayout>

      <Modal
        title={current.name}
        centered
        width={500}
        open={open}
        onOk={() => {
          updateFolder(newName, current._id);
          setOpen(false);
        }}
        onCancel={() => setOpen(false)}
      >
        {updatesLoading && <p>Loading...</p>}
        <form onSubmit={() => updateFolder(newName, current._id)}>
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </form>
      </Modal>

      <FilesModel
        file={file}
        setFile={setFile}
        setFile_name={setFile_name}
        file_name={file_name}
        openFileModel={openFileModel}
        setOpenFileModel={setOpenFileModel}
        handleChange={handleChange}
        addAssignments={addAssignments}
        current={current}
        setCurrent={setCurrent}
        removeAssignments={removeAssignments}
      />
    </>
  );
};

export default SingleBatchFolders;
