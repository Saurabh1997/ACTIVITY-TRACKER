import React, { useState, useEffect } from "react";
import "./mainview.css";
// export default class Panel extends React.Component{

export default function Panel({ select, matched }) {
  // const [detail, changeDetail] = useState("");
  const [data, changeData] = useState(select);
  const match = matched.map((element) => {
    return (
      <tr>
        <th>Matched IDs</th>
        <td>{element.title}</td>
        <td>
          <button onClick={() => changeData(element)}>View</button>
        </td>
      </tr>
    );
  });

  useEffect(() => {
    changeData(select);
  }, [select]);

  return (
    <div className="panel">
      <table>
        <tr>
          <th>Title</th>
          <td>{data.title}</td>
        </tr>
        <tr>
          <th>ID</th>
          <td>{data.id}</td>
        </tr>
        <tr>
          <th>user id</th>
          <td>{data.userId}</td>
        </tr>
        <tr>
          <th>Completed</th>
          <td>{data.completed.toString()}</td>
        </tr>
      </table>
      <h3>Suggestion</h3>
      <table>{match}</table>
    </div>
  );
}
