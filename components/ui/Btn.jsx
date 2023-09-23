import { Button } from "antd";
import React from "react";

const Btn = ({
  children,
  onClick,
  loading,
  danger = false,
  disable = false,
  ...props
}) => {
  return (
    <Button
      loading={loading}
      onClick={onClick}
      {...props}
      style={{
        backgroundColor: disable ? `gray` : danger ? "red" : "#0f3f5d",
        color: "white",
        border: "none",
      }}
    >
      {children}
    </Button>
  );
};

export default Btn;
