import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Problem2 = () => {
  const [showAllContactsModal, setShowAllContactsModal] = useState(false);
  const [showUSContactsModal, setShowUSContactsModal] = useState(false);
  const [allContacts, setAllContacts] = useState([]);
  const [usContacts, setUSContacts] = useState([]);
  // api url here
  const apiUrl = "https://contact.mediusware.com/api/contacts/";

  const openAllContactsModal = () => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.results && Array.isArray(data.results)) {
          setAllContacts(data.results);
          setShowAllContactsModal(true);
        } else {
          console.error("not an array:", data);
        }
      })
      .catch((error) => {
        console.error("eerror fetching all contacts:", error);
      });
  };

  const openUSContactsModal = () => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.results && Array.isArray(data.results)) {
          const usContacts = data.results.filter(
            (contact) => contact.country.name === "United States"
          );
          setUSContacts(usContacts);
          setShowUSContactsModal(true);
        } else {
          console.error("Data from API is not an array:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching US contacts:", error);
      });
  };

  const closeModal = () => {
    setShowAllContactsModal(false);
    setShowUSContactsModal(false);
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>
        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            onClick={openAllContactsModal}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            onClick={openUSContactsModal}
          >
            US Contacts
          </button>
        </div>
      </div>

      {showAllContactsModal && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">All Contacts</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={closeModal}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <ul>
                  {allContacts.map((contact) => (
                    <li key={contact.id}>
                      ID:{contact.id} Number : {contact.phone}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showUSContactsModal && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">US Contacts</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={closeModal}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <ul>
                  {usContacts.map((contact) => (
                    <li key={contact.id}>{contact.phone}</li>
                  ))}
                </ul>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Problem2;
