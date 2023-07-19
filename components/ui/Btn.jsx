import { Button } from "antd";
import React from "react";

const Btn = ({ children, onClick, loading, disable = false, ...props }) => {
  return (
    <Button
      loading={loading}
      onClick={onClick}
      {...props}
      style={{ backgroundColor: disable ? `gray` : "#0f3f5d", color: "white" }}
    >
      {children}
    </Button>
  );
};

export default Btn;
