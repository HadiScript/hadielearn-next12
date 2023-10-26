import { Card, Col, List, Modal, Row } from "antd";
import React, { useContext, useEffect, useState } from "react";
import BatchLayout from "../../../../panel/newInstructor/layouts";
import { AuthContext } from "../../../../context/auth";
import { useRouter } from "next/router";
import { API } from "../../../../config/API";
import axios from "axios";
import { toast } from "react-hot-toast";
import Btn from "../../../../components/ui/Btn";
import { IconText } from "../lessons/[id]";

import { BiTrash } from "react-icons/bi";
import { EditOutlined } from "@ant-design/icons";

const SingleBatchFolders = () => {
  const [auth] = useContext(AuthContext);
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(false);

  const [singleBatch, setSingleBatch] = useState({});

  //   assets
  const [allAssets, setAllAssets] = useState([]);
  const [assetsLoading, setAssetsLoading] = useState(false);
  const [current, setCurrent] = useState({});

  const [uploadingFile, setUploadingFile] = useState();
  const [title, setTitle] = useState("");

  const [openModel, setOpenModel] = useState(false);
  const [updatesLoading, setUpdatesLoading] = useState(false);

  const fetchingSingleBatch = async (x) => {
    try {
      setLoading(true);

      const { data } = await axios.get(`${API}/lms/batch-teacher/${x}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setSingleBatch(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  };

  useEffect(() => {
    if (auth && auth.token && id) fetchingSingleBatch(id);
  }, [auth && auth.token && id]);

  const fetchingBatchAssets = async () => {
    try {
      setAssetsLoading(true);
      const { data } = await axios.get(`${API}/lms/all-assets/${id}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setAllAssets(data);
      setAssetsLoading(false);
    } catch (error) {
      setAssetsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth && auth.token && id) fetchingBatchAssets(id);
  }, [auth && auth.token && id]);

  // handlers and files uploading
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
    setUploadingFile(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const _formData = new FormData();

      _formData.append("title", title);
      _formData.append("file", uploadingFile);

      const { data } = await axios.post(`${API}/lms/new-asset/${id}`, _formData, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });

      if (data.ok) {
        console.log("handle submit 4");
        setTitle("");
        setUploadingFile("");
        fetchingBatchAssets();
        setLoading(false);
        toast.success("Done");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const updateAssets = async (title, id) => {
    if (!title) return toast.error("fields are requried");

    try {
      setUpdatesLoading(true);
      const { data } = await axios.put(
        `${API}/lms/update-asset/${id}`,
        {
          title,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      if (data.ok) {
        fetchingBatchAssets();
        setOpenModel(false);
        setUpdatesLoading(false);
      }
    } catch (error) {
      setUpdatesLoading(false);

      toast.error(error);
      console.log(error);
    }
  };

  const deleteAssets = async (x) => {
    const ok = confirm("Are you sure?");
    if (ok) {
      try {
        const { data } = await axios.delete(`${API}/lms/delete-asset/${x}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        if (data.ok) {
          fetchingBatchAssets();
        }
      } catch (error) {
        toast.error(error);
        console.log(error);
      }
    }
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
              <h4 className="mb-3">Add Assets</h4>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label fw-semibold">File Title</label>
                  <input type="text" className="form-control" placeholder="Lecture Title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>

                <div className="form-group">
                  <label className="form-label fw-semibold">Select Asset/File</label>
                  <input type="file" className="form-control file-control" name="file" onChange={handleChange} required={true} />
                  <div className="form-text">Upload file size less than or equal 5MB!</div>
                </div>

                <Btn loading={loading} className="my-3" onClick={handleSubmit}>
                  Add Asset
                </Btn>
              </form>
            </Card>
          </Col>
          <Col sm={24} xs={24} md={14} lg={14}>
            <div style={{ height: "700px", overflow: "auto" }}>
              <Card>
                <List
                  loading={assetsLoading}
                  itemLayout="horizontal"
                  dataSource={allAssets}
                  renderItem={(item) => (
                    <List.Item
                      actions={[
                        <IconText
                          icon={
                            <EditOutlined
                              role="button"
                              onClick={() => {
                                setCurrent(item);
                                setOpenModel(true);
                              }}
                            />
                          }
                        />,
                        <IconText icon={<BiTrash role="button" onClick={() => deleteAssets(item._id)} />} />,
                      ]}
                    >
                      <List.Item.Meta title={<a onClick={() => window.open(item.file)}>{item.title}</a>} description={item.description} />
                    </List.Item>
                  )}
                />
              </Card>
            </div>
          </Col>
        </Row>
      </BatchLayout>

      <Modal title={`Rename`} centered open={openModel} onOk={() => updateAssets(title, current._id)} onCancel={() => setOpenModel(false)} width={500}>
        <form onSubmit={() => updateAssets(title, current._id)}>
          {updatesLoading && <>loading...</>}
          <input type="text" className="form-control" value={title} name="title" onChange={(e) => setTitle(e.target.value)} />
        </form>
      </Modal>
    </>
  );
};

export default SingleBatchFolders;
