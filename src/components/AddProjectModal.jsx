import React, { useState } from "react";
import { FaList } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useMutation, useQuery } from "@apollo/client";
import {GET_CLIENTS} from "../queries/clientQuery"
import {ADD_PROJECT} from "../mutations/projectMutation";
import {GET_PROJECTS} from "../queries/projectQueries";

const AddClientModel = () => {

  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState("new");

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: {name, description, clientId, status},
    update(cache, { data: { addProject } }) {
        const { projects } = cache.readQuery({ query: GET_PROJECTS });
        cache.writeQuery({
            query: GET_PROJECTS,
            data: { projects: [...projects, addProject] },
        });
    }
  })

  //get clients for the select
  const {loading, error, data} = useQuery(GET_CLIENTS);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === "" || description === "" || status === "") {
      return alert("Please fill all the fields");
    }

    addProject(name, description, clientId, status);
    setName("");
    setDescription("");
    setStatus("new");
    setShow(false);
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (loading) return null;
  if (error) return <p>Something went wrong</p>;

  return (
    <>
    {!loading && !error &&(
        <>
        <Button variant="primary" onClick={handleShow}>
        <FaList /> Add Project
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input 
                type="text" 
                className="form-control" 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea 
                className="form-control" 
                id="email" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Status</label>
              <select 
                id="status" 
                value={status} 
                onChange={(e) => setStatus(e.target.value)} 
                className="form-select">
                <option value="new">Not Started</option>
                <option value="progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="mb-3">
                <label className="form-label">Client</label>
                <select 
                    name="" 
                    id="clientId" 
                    className="form-select"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}>
                    <option value="">Select Client</option>
                    {data.clients.map(client => (
                        <option key={client.id} value={client.id}>{client.name}</option>
                    ))}
                </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      </>
        )}
    </>
  );
};

export default AddClientModel;
