import React from "react";
import Panel from "./Panel";
import axios from "axios";
import "./mainview.css";

export default class mainview extends React.Component {
  constructor() {
    super();
    this.state = {
      userData: [],
    };
  }
  async componentDidMount() {
    const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
    this.setState({ userData: res.data });
  }

  render() {
    const userDetails = this.state.userData.map((element) => {
      return (
        <tr key={element.id}>
          <td component="th" className="Header">
            {element.id}
          </td>
          <td align="left">{element.title}</td>
          <td align="center">{element.completed.toString()}</td>
          <td align="right">
            {/* <Panel onchangedetailPanel={this.onchangedetail.bind(this)}>
              View
            </Panel> */}
            <button id={element.id} onClick={() => this.handleClick(element)}>
              View
            </button>
          </td>
        </tr>
      );
    });

    return (
      <div className="grid-container">
        {/* <TableContainer component={Paper}> */}
        <table className="tableDesign">
          <tr className="Header">
            <th>ID</th>
            <th align="left">Title</th>
            <th align="right">Status</th>
            <th align="right">Action</th>
          </tr>
          {userDetails}
        </table>
        {this.state.selectedDetail !== "" && (
          <Panel
            select={this.state.selectedDetail}
            matched={this.state.matchedDetails}
          ></Panel>
        )}
        {/* </TableContainer> */}
        {/* <Panel></Panel> */}
      </div>
    );
  }
}
