import React, { Fragment } from "react";
import { Table, Form, Button } from "react-bootstrap";

const Queues = () => {
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
          
        </tbody>
      </Table>
    </Fragment>
  );
};

export default Queues;
