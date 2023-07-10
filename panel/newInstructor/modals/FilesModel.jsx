import { Divider, List, Modal } from "antd";
import React from "react";
import { BiTrash } from "react-icons/bi";

const FilesModel = ({
  file,
  setFile,
  setFile_name,
  file_name,
  openFileModel,
  setOpenFileModel,
  handleChange,
  addAssignments,
  current,
  setCurrent,
  removeAssignments,
}) => {
  return (
    <Modal
      title={current.name}
      centered
      width={1000}
      open={openFileModel}
      onOk={() => {
        addAssignments(file, file_name, current._id);
        setOpenFileModel(false);
      }}
      onCancel={() => setOpenFileModel(false)}
    >
      {/* {updatesLoading && <p>Loading...</p>} */}
      <form
        className="row align-items-center"
        onSubmit={() => addAssignments(file, file_name, current._id)}
      >
        <div className="col-md-6 form-group">
          <label>File Name</label>
          <input
            type="text"
            className="form-control"
            value={file_name}
            required={true}
            onChange={(e) => setFile_name(e.target.value)}
          />
        </div>
        <br />
        <div className="col-md-6 form-group">
          <label className="form-label fw-semibold">Select File</label>
          <input
            type="file"
            className="form-control file-control"
            name="file"
            onChange={handleChange}
            required={true}
          />
          <div className="form-text">
            Upload file size less than or equal 5MB!
          </div>
        </div>
        <br />
      </form>

      <Divider> Uploaded Files </Divider>
      <List
        dataSource={current.data}
        itemLayout="horizontal"
        renderItem={(item) => (
          <List.Item
            actions={[
              <BiTrash
                role="button"
                onClick={() => removeAssignments(current._id, item._id)}
              />,
            ]}
          >
            <List.Item.Meta
              title={
                <a onClick={() => window.open(item.file)}>{item.file_name}</a>
              }
            />
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default FilesModel;
