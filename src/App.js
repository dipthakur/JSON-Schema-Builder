import React from "react";
import { Card } from "antd";
import "antd/dist/reset.css";
import { SchemaBuilder } from "./Components/SchemaBuilder";

const App = () => {
  return (
    <div style={{ display: "flex", padding: "20px", gap: "20px" }}>
      <Card style={{ flex: 1 }}>
        <SchemaBuilder />
      </Card>
    </div>
  );
};

export default App;
