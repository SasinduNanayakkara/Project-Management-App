import React from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
const AddClientModel = () => {
  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        data-toggle="modal"
        data-target="addClientModal"
      >
        <div className="d-flex align-items-center">
            <FaUser className="icon"/> Add Client
        </div>
      </button>

      <div
        className="modal fade"
        id="addClientModal"
        role="dialog"
        aria-labelledby="addClientModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addClientModalLabel">
                Add Client
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
                <form>
                    <div className="mb-3">
                        <label className="form-label">
                            Name
                        </label>
                        <input type="text" className="from-control" id="name" />
                    </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddClientModel;
