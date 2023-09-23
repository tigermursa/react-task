import React, { useState } from "react";
// importing sweetalert2 to show the error here
import Swal from "sweetalert2";

const Problem1 = () => {
  // all states here on top
  const [show, setShow] = useState("all");
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Active"); // Default status is 'Active'

  //  submit handler function with swal activated
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !status) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter both a name and select a status!",
      });
      return;
    }

    // new task adding from here
    const newTask = { name, status };
    // adding the new task to the tasks array from here
    setTasks([...tasks, newTask]);
    // input fields will clear
    setName("");
    setStatus("Active"); // default select will is Active
  };

  const handleClick = (val) => {
    setShow(val);
  };

  // filtering tasks based on the selected filter here
  const filteredTasks = tasks.filter((task) => {
    if (show === "all") {
      return true; // all tasks will show
    } else if (show === "active") {
      return task.status === "Active";
    } else if (show === "completed") {
      return task.status === "Completed";
    } else if (show === "pending") {
      return task.status === "Pending";
    } else if (show === "archive") {
      return task.status === "Archive";
    }
  });

  //  filtered task
  filteredTasks.sort((a, b) => {
    if (a.status === "Active" && b.status !== "Active") return -1;
    if (a.status !== "Active" && b.status === "Active") return 1;
    if (a.status === "Completed" && b.status !== "Completed") return -1;
    if (a.status !== "Completed" && b.status === "Completed") return 1;
    if (a.status === "Pending" && b.status !== "Pending") return -1;
    if (a.status !== "Pending" && b.status === "Pending") return 1;
    if (a.status === "Archive" && b.status !== "Archive") return -1;
    if (a.status !== "Archive" && b.status === "Archive") return 1;
    return 0;
  });

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6">
          <form
            className="row gy-2 gx-3 align-items-center mb-4"
            onSubmit={handleSubmit}
          >
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-auto">
              <select
                className="form-control"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {/* options */}
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Archive">Archive</option>
              </select>
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "pending" && "active"}`}
                type="button"
                onClick={() => handleClick("pending")}
              >
                Pending
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "archive" && "active"}`}
                type="button"
                onClick={() => handleClick("archive")}
              >
                Archive
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task, index) => (
                <tr key={index}>
                  <td>{task.name}</td>
                  <td>{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
