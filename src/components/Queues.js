import React, { Fragment, useState, useEffect } from "react";
import {
  Table,
  Modal,
  Toast,
  Form,
  InputGroup,
  Button,
  Spinner,
  ToastContainer,
} from "react-bootstrap";
import axios from "axios";

const Queues = () => {
  const [queues, setQueues] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [search, setSeacrh] = useState("");
  const [addFormData, setAddFormData] = useState({
    name: "",
    eventDate: "",
  });

  useEffect(() => {
    axios({
      url: "https://qzilla-api.azurewebsites.net/api/v1/queues",
      method: "get",
    })
      .then((response) => {
        console.log(response.data);
        setQueues(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAddFormChange = (event) => {
    setMessage("");
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    setMessage("");
    event.preventDefault();

    const newQueue = {
      name: addFormData.name,
      dateCreated: new Date().toLocaleDateString(),
      eventDate: addFormData.eventDate,
      peopleAmount: 0,
    };

    if (newQueue.name === "") {
      setMessage("Name can't be empty");
    } else if (newQueue.name.length < 3 || newQueue.name.length > 20) {
      setMessage("Name length must be between 3 and 20 symbols");
    } else if (newQueue.eventDate == null || newQueue.eventDate === "") {
      setMessage("Date can't be empty");
    } else if (new Date() >= newQueue.eventDate) {
      setMessage("You can't choose the date in the past");
    } else {
      axios({
        url: "https://qzilla-api.azurewebsites.net/api/v1/queues",
        method: "post",
        data: {
          name: addFormData.name,
          eventDate: addFormData.eventDate,
        },
      })
        .then((response) => {
          console.log(response.data);
          if (response.data.error == null) {
            const newQueues = [...queues, response.data];
            setQueues(newQueues);
            setShowModal(false);
            setMessage(
              <span>
                Queue <b>{addFormData.name}</b> succesfully created!
              </span>
            );
          } else {
            setMessage(response.data.error);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      setShowToast(true);
    }
  };

  const handleEnrollClick = (queue) => {
    axios({
      url:
        "https://qzilla-api.azurewebsites.net/api/v1/queues/enroll/" + queue.id,
      method: "put",
    })
      .then((response) => {
        const newQueue = {
          id: queue.id,
          name: queue.name,
          dateCreated: queue.dateCreated,
          eventDate: queue.eventDate,
          peopleAmount: queue.peopleAmount + 1,
        };

        const index = queues.findIndex(
          (currQueue) => queue.name === currQueue.name
        );
        let newQueues = queues;
        newQueues[index] = newQueue;
        setQueues(newQueues);
        setMessage(
          <span>
            Enrolled to queue <b>{queue.name}</b>
          </span>
        );
        setShowToast(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Creating a new queue</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleAddFormSubmit}>
          <Modal.Body
            style={{
              textAlign: "center",
            }}
          >
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
              <Form.Control
                onChange={handleAddFormChange}
                placeholder="Queue name"
                name="name"
              />
            </InputGroup>
            <Form.Control
              onChange={handleAddFormChange}
              placeholder="Date"
              type="date"
              name="eventDate"
              defaultValue={new Date()}
            />
            {message !== "" ? (
              <label
                style={{
                  marginTop: "15px",
                  color: "red",
                }}
              >
                {message}
              </label>
            ) : (
              <Fragment />
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setShowModal(false);
              }}
            >
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Create
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      <ToastContainer className="p-3" position="bottom-end">
        <Toast
          show={showToast}
          onClose={() => {
            setShowToast(false);
          }}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Qzilla</strong>
            <small>0 mins ago</small>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </ToastContainer>

      <div className="queue-header">
        <h3>Queues</h3>
        <div className="search-field">
          <Form.Control
            style={{ width: "300px" }}
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onChange={(e) => {
              setSeacrh(e.target.value);
            }}
          />
          <Button
            variant="primary"
            onClick={() => {
              setMessage("");
              setShowModal(true);
            }}
          >
            Create
          </Button>
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
              if (
                queue.name
                  .toLocaleLowerCase()
                  .indexOf(search.toLocaleLowerCase()) !== -1
              ) {
                return (
                  <tr>
                    <td>{queue.name}</td>
                    <td>{queue.dateCreated}</td>
                    <td>{queue.eventDate}</td>
                    <td>{queue.peopleAmount}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => {
                          handleEnrollClick(queue);
                        }}
                      >
                        Enroll
                      </Button>
                    </td>
                  </tr>
                );
              }
              return <Fragment />;
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
