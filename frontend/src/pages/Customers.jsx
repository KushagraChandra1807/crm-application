import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../api';
import CustomerDetails from './CustomerDetails';
import { PencilIcon, TrashIcon, UserIcon, PhoneIcon, BuildingOfficeIcon } from '@heroicons/react/24/solid';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '' });
  const [editingCustomer, setEditingCustomer] = useState(null);

  // fetch customers
  const fetchCustomers = async () => {
    try {
      const res = await API.get('/customers', { params: { q, page } });
      setCustomers(res.data.data);
    } catch (error) {
      console.error("Failed to fetch customers:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [q, page]);

  const handleSearchClick = () => {
    setPage(1);
    fetchCustomers();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name) return;

    try {
      if (editingCustomer) {
        await API.put(`/customers/${editingCustomer._id}`, form);
      } else {
        await API.post('/customers', form);
      }
      resetForm();
      fetchCustomers();
    } catch (error) {
      alert(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setForm({
      name: customer.name || '',
      email: customer.email || '',
      phone: customer.phone || '',
      company: customer.company || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (customer) => {
    if (!window.confirm('Delete customer?')) return;
    try {
      await API.delete(`/customers/${customer._id}`);
      fetchCustomers();
    } catch (error) {
      alert(error.response?.data?.message || 'Delete failed');
    }
  };

  const resetForm = () => {
    setForm({ name: '', email: '', phone: '', company: '' });
    setEditingCustomer(null);
    setShowForm(false);
  };

  return (
    <div className="flex flex-col items-center p-8 w-full min-h-screen bg-gray-50">
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mx-auto mb-8 gap-4">
  {/* Search + Add */}
  <div className="flex w-full md:w-auto items-center gap-3">
    <input
      placeholder="Search by name or email"
      value={q}
      onChange={e => setQ(e.target.value)}
      className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
    />
    <button
      onClick={handleSearchClick}
      className="px-5 py-2 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition"
    >
      Search
    </button>
  </div>

  {/* Add + Logout */}
  <div className="flex items-center gap-3 w-full md:w-auto">
    <button
      onClick={() => { resetForm(); setShowForm(true); }}
      className="px-5 py-2 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition"
    >
      + Add Customer
    </button>
    <button
      onClick={() => {
        localStorage.removeItem("token"); // clear token/session
        window.location.href = "/";       // redirect to landing/login page
      }}
      className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
    >
      Logout
    </button>
  </div>
</div>


      {/* Customer List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {customers.length > 0 ? (
          <AnimatePresence>
            {customers.map(c => (
              <motion.div
                key={c._id}
                className="p-6 rounded-xl border border-gray-200 shadow-sm bg-white hover:shadow-md transition cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Top: Avatar + Name */}
                <div onClick={() => setSelected(c)} className="flex items-center gap-3 mb-3">
                  <UserIcon className="h-10 w-10 text-gray-400" />
                  <div>
                    <p className="font-semibold text-gray-900">{c.name}</p>
                    <p className="text-sm text-gray-500">{c.email}</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col gap-1 text-sm text-gray-600 mb-4">
                  <p className="flex items-center gap-2">
                    <PhoneIcon className="h-4 w-4 text-pink-500" />
                    {c.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <BuildingOfficeIcon className="h-4 w-4 text-blue-500" />
                    {c.company}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleEdit(c); }}
                    className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 flex items-center justify-center gap-1"
                  >
                    <PencilIcon className="h-4 w-4" />
                    Edit
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(c); }}
                    className="flex-1 px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 flex items-center justify-center gap-1"
                  >
                    <TrashIcon className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg">No customers found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center gap-4 mt-8">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          className="px-5 py-2 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={page === 1}
        >
          Prev
        </button>
        <span className="text-gray-700 font-medium">Page {page}</span>
        <button
          onClick={() => setPage(p => p + 1)}
          className="px-5 py-2 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition"
        >
          Next
        </button>
      </div>

      {/* Customer Details Modal */}
      {selected && (
        <CustomerDetails
          customer={selected}
          onClose={() => { setSelected(null); fetchCustomers(); }}
        />
      )}

      {/* Add/Edit Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-lg p-6 rounded-xl shadow-lg bg-white border border-gray-200"
              initial={{ scale: 0.9, y: -50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">
                {editingCustomer ? 'Edit Customer' : 'Add Customer'}
              </h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  placeholder="Name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                <input
                  placeholder="Email"
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  placeholder="Phone"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  placeholder="Company"
                  value={form.company}
                  onChange={e => setForm({ ...form, company: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <div className="flex gap-3 mt-4">
                  <button
                    type="submit"
                    className="flex-1 px-5 py-2 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition"
                  >
                    {editingCustomer ? 'Update' : 'Save'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
