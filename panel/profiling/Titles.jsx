import { Button } from "antd";
import React from "react";
import { FaEdit } from "react-icons/fa";

const Titles = ({ name, from, path, router }) => {
  return (
    <div className="d-flex justify-content-between align-items-center">
      {name}
      {from === "main-page" && (
        <Button
          onClick={() => router.push(`${path}`)}
          icon={<FaEdit />}
          className="CardieBg text-light"
        >
          Edit
        </Button>
      )}
    </div>
  );
};

export default Titles;
