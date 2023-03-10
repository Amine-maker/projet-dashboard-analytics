import styled from "@emotion/styled";
import React from "react";

interface BasicMetricProps {
  data: BasicMetricData;
  children?: React.ReactNode;
}

interface BasicMetricData {
  displayData: number | string;
  title: string;
  width?: number;
  height?: number;
  // ajouter du custom css
}

const DisplayData = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const BasicMetricComponent = (props: BasicMetricProps): JSX.Element => {
  return (
    <div className="data-container">
      <div className="w-full">
        {" "}
        <div className="title">
          <h1 className="text-2xl">{props.data.title}</h1>
        </div>
        <DisplayData className="display-data">
          <span className="info-metrics text-center">{props.data.displayData}</span>
        </DisplayData>
      </div>
    </div>
  );
};

export default BasicMetricComponent;
