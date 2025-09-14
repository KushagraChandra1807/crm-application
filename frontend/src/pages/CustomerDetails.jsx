import React, { useEffect, useState } from "react";
import API from "../api";
import "../styles/CustomerDetails.css";

export default function CustomerDetails({ customer, onClose }) {
  const [leads, setLeads] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [newLead, setNewLead] = useState({
    title: "",
    description: "",
    status: "New",
    value: 0,
  });

  const fetchLeads = async () => {
    const res = await API.get(`/customers/${customer._id}/leads`, {
      params: { status: statusFilter || undefined },
    });
    setLeads(res.data);
  };

  useEffect(() => {
    fetchLeads();
  }, [statusFilter]);

  const handleAddLead = async (e) => {
    e.preventDefault();
    if (!newLead.title) {
      alert("Title is required");
      return;
    }
    await API.post(`/customers/${customer._id}/leads`, newLead);
    setNewLead({ title: "", description: "", status: "New", value: 0 });
    setShowLeadForm(false);
    fetchLeads();
  };

  const delLead = async (id) => {
    if (!confirm("Delete lead?")) return;
    await API.delete(`/customers/${customer._id}/leads/${id}`);
    fetchLeads();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Header */}
        <div className="modal-header">
          <h3>{customer.name}</h3>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Show form only */}
        {showLeadForm ? (
          <form onSubmit={handleAddLead} className="lead-form centered-form">
            <h4>New Lead</h4>
            <input
              type="text"
              placeholder="Title"
              value={newLead.title}
              onChange={(e) =>
                setNewLead({ ...newLead, title: e.target.value })
              }
              required
            />
            <textarea
              placeholder="Description"
              value={newLead.description}
              onChange={(e) =>
                setNewLead({ ...newLead, description: e.target.value })
              }
            />
            <select
              value={newLead.status}
              onChange={(e) =>
                setNewLead({ ...newLead, status: e.target.value })
              }
            >
              <option>New</option>
              <option>Contacted</option>
              <option>Converted</option>
              <option>Lost</option>
            </select>
            <input
              type="number"
              placeholder="Value"
              value={newLead.value}
              onChange={(e) =>
                setNewLead({ ...newLead, value: Number(e.target.value) })
              }
            />
            <div className="form-actions">
              <button type="submit">Save</button>
              <button type="button" onClick={() => setShowLeadForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            {/* Customer Info (only in leads view) */}
            <div className="customer-info">
              <div>Email: {customer.email}</div>
              <div>Company: {customer.company}</div>
            </div>

            {/* Toolbar */}
            <div className="leads-toolbar">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All</option>
                <option>New</option>
                <option>Contacted</option>
                <option>Converted</option>
                <option>Lost</option>
              </select>
              <button onClick={() => setShowLeadForm(true)}>Add Lead</button>
            </div>

            {/* Leads */}
            <div className="leads">
              {leads.map((l) => (
                <div key={l._id} className="lead">
                  <strong>{l.title}</strong>
                  <div>{l.description}</div>
                  <div>
                    Status: {l.status} | Value: {l.value}
                  </div>
                  <button onClick={() => delLead(l._id)}>Delete</button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
