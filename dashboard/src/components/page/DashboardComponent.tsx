import React from "react";
import { useParams } from "react-router-dom";

export const Dashboard = (): JSX.Element => {
  const { siteId } = useParams();
  console.log(siteId);

  return <div></div>;
};
