import React, { Fragment, useEffect, useState } from "react";
import { Table, Form, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { ENDPOINTS } from "../axios/requests";

const Queues = () => {
  const [queues, setQueues] = useState(null);

  useEffect(() => {
    axios({
      url: ENDPOINTS.GET_QUEUES,
      method: "get",
    })
      .then((response) => {
        setQueues(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Fragment>
      <div className="queue-header">
        <h3>Queues</h3>
        <div className="search-field">
          <Form.Control
            style={{ width: "300px" }}
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="primary">Create</Button>
        </div>
      </div>

      {queues !== null ? (
        <Table striped hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date Created</th>
              <th>Event Date</th>
              <th>People in queue</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {queues.map((queue) => {
              return (
                <tr>
                  <td>{queue.name}</td>
                  <td>{queue.dateCreated}</td>
                  <td>{queue.eventDate}</td>
                  <td>{queue.peopleAmount}</td>
                  <td>
                    <Button variant="primary">Enroll</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingTop: "150px",
          }}
        >
          <Spinner style={{ margin: "15px" }} />
          <h4>Loading queues</h4>
        </div>
      )}
    </Fragment>
  );
};

export default Queues;
