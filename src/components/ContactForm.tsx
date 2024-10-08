import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors: string[] = [];
    if (!formData.name) newErrors.push('Name is required');
    if (!formData.email) newErrors.push('Email is required');
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.push('Email is invalid');
    if (!formData.subject) newErrors.push('Subject is required');
    if (!formData.message) newErrors.push('Message is required');
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (newErrors.length === 0) {
      console.log('Form submitted:', formData);
      setSuccessMessage('Thank you for reaching out! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors([]);
    } else {
      setErrors(newErrors);
      setSuccessMessage('');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-white">Contact Us</h2>
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}
      {errors.length > 0 && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <ul className="list-disc list-inside">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1 text-white">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded text-black"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1 text-white">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded text-black"
          />
        </div>
        <div>
          <label htmlFor="subject" className="block mb-1 text-white">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded text-black"
          />
        </div>
        <div>
          <label htmlFor="message" className="block mb-1 text-white">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded text-black"
            rows={4}
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
