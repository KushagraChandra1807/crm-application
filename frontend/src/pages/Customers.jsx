import React, { useEffect, useState } from 'react';
import API from '../api';
import CustomerDetails from './CustomerDetails';
import '../styles/Customers.css';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '' });
  const [editingCustomer, setEditingCustomer] = useState(null); // NEW: track customer being edited

  const fetch = async () => {
    const res = await API.get('/customers', { params: { q, page } });
    setCustomers(res.data.data);
  };

  useEffect(() => { fetch(); }, [q, page]);

  // Add or Update customer
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name) return;

    if (editingCustomer) {
      // Edit existing customer
      await API.put(`/customers/${editingCustomer._id}`, form);
    } else {
      // Add new customer
      await API.post('/customers', form);
    }

    setForm({ name: '', email: '', phone: '', company: '' });
    setEditingCustomer(null);
    setShowForm(false);
    fetch();
  };

  // Open edit modal
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

  // Delete customer
  const handleDelete = async (customer) => {
    if (!window.confirm('Delete customer?')) return;
    await API.delete(`/customers/${customer._id}`);
    fetch();
  };

  return (
    <div>
      <div className="toolbar">
        <input
          placeholder="Search by name or email"
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        <button onClick={() => { setShowForm(true); setEditingCustomer(null); setForm({ name:'', email:'', phone:'', company:'' }); }}>
          Add Customer
        </button>
      </div>

      <div className="list">
        {customers.map(c => (
          <div key={c._id} className="card">
            <div onClick={() => setSelected(c)}>
              <strong>{c.name}</strong> <small>{c.email}</small>
            </div>
            <div>
              <button onClick={() => handleEdit(c)}>Edit</button>
              <button onClick={() => handleDelete(c)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={() => setPage(p => Math.max(1, p - 1))}>Prev</button>
        <span> Page {page} </span>
        <button onClick={() => setPage(p => p + 1)}>Next</button>
      </div>

      {selected && (
        <CustomerDetails
          customer={selected}
          onClose={() => { setSelected(null); fetch(); }}
        />
      )}

      {/* Modal Form */}
      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editingCustomer ? 'Edit Customer' : 'Add Customer'}</h3>
            <form onSubmit={handleSubmit}>
              <input
                placeholder="Name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
              />
              <input
                placeholder="Email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
              <input
                placeholder="Phone"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
              />
              <input
                placeholder="Company"
                value={form.company}
                onChange={e => setForm({ ...form, company: e.target.value })}
              />
              <button type="submit">{editingCustomer ? 'Update' : 'Save'}</button>
              <button type="button" onClick={() => { setShowForm(false); setEditingCustomer(null); }}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
