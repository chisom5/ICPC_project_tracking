import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

const FourZeroFour = () => {
  return (
    <div
      style={{
        background: "#e5eff1",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary">
            <Link to="/">Back Home</Link>
          </Button>
        }
      />
    </div>
  );
};

export default FourZeroFour;