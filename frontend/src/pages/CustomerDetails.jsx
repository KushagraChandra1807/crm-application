import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../api";
import { TrashIcon } from "@heroicons/react/24/outline";

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
    try {
      const res = await API.get(`/customers/${customer._id}/leads`, {
        params: { status: statusFilter || undefined },
      });
      setLeads(res.data);
    } catch (error) {
      console.error("Failed to fetch leads:", error);
    }
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
    try {
      await API.post(`/customers/${customer._id}/leads`, newLead);
      setNewLead({ title: "", description: "", status: "New", value: 0 });
      setShowLeadForm(false);
      fetchLeads();
    } catch (error) {
      console.error("Failed to add lead:", error);
      alert(error.response?.data?.message || "Failed to add lead");
    }
  };

  const delLead = async (id) => {
    if (!confirm("Delete lead?")) return;
    try {
      await API.delete(`/customers/${customer._id}/leads/${id}`);
      fetchLeads();
    } catch (error) {
      console.error("Failed to delete lead:", error);
      alert(error.response?.data?.message || "Failed to delete lead");
    }
  };

  const statusColors = {
    New: "text-blue-600",
    Contacted: "text-yellow-600",
    Converted: "text-green-600",
    Lost: "text-red-600",
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        className="relative w-full max-w-lg p-8 rounded-2xl shadow-lg bg-white border border-gray-200"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black transition-colors text-xl"
          onClick={onClose}
        >
          ✕
        </button>

        <AnimatePresence mode="wait">
          {showLeadForm ? (
            // Add lead form
            <motion.div
              key="lead-form-container"
              className="p-6 rounded-xl bg-gray-50 border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-xl font-semibold text-center mb-6 text-gray-800">
                Add New Lead
              </h3>
              <form onSubmit={handleAddLead} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={newLead.title}
                  onChange={(e) =>
                    setNewLead({ ...newLead, title: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
                <textarea
                  placeholder="Description"
                  value={newLead.description}
                  onChange={(e) =>
                    setNewLead({ ...newLead, description: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                />
                <select
                  value={newLead.status}
                  onChange={(e) =>
                    setNewLead({ ...newLead, status: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Converted">Converted</option>
                  <option value="Lost">Lost</option>
                </select>
                <input
                  type="number"
                  placeholder="Value"
                  value={newLead.value}
                  onChange={(e) =>
                    setNewLead({ ...newLead, value: Number(e.target.value) })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                />
                <div className="flex gap-4 mt-2">
                  <button
                    type="submit"
                    className="flex-1 px-5 py-2 rounded-lg font-medium text-white bg-black hover:bg-gray-800 transition"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowLeadForm(false)}
                    className="flex-1 px-5 py-2 rounded-lg font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            // Lead list
            <motion.div
              key="lead-list"
              className="p-6 rounded-xl bg-gray-50 border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-xl font-semibold text-center mb-6 text-gray-800">
                Customer Details
              </h3>

              <div className="flex flex-col gap-4 text-gray-700 mb-6">
                <div>
                  <span className="font-medium block mb-1">Email:</span>
                  <div className="px-4 py-2 rounded-lg bg-white border border-gray-300">
                    {customer.email}
                  </div>
                </div>
                <div>
                  <span className="font-medium block mb-1">Company:</span>
                  <div className="px-4 py-2 rounded-lg bg-white border border-gray-300">
                    {customer.company}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="">All</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Converted">Converted</option>
                  <option value="Lost">Lost</option>
                </select>
                <button
                  onClick={() => setShowLeadForm(true)}
                  className="px-5 py-2 rounded-lg font-medium text-white bg-black hover:bg-gray-800 transition"
                >
                  + Add Lead
                </button>
              </div>

              <div className="flex flex-col gap-4 max-h-80 overflow-y-auto">
                {leads.length > 0 ? (
                  leads.map((l) => (
                    <motion.div
                      key={l._id}
                      className="p-4 rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md transition"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <strong className="text-gray-900">{l.title}</strong>
                      <div className="text-gray-500 text-sm my-1">
                        {l.description}
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-700">
                        <span>
                          Status:{" "}
                          <span className={`font-semibold ${statusColors[l.status]}`}>
                            {l.status}
                          </span>{" "}
                          | Value: ${l.value}
                        </span>
                        <button
                          onClick={() => delLead(l._id)}
                          className="text-red-600 hover:text-red-700 transition"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">
                    No leads found for this customer.
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
