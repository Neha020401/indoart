import React, { useState } from "react";
import "../styles/Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    subject: "",
    file: null,
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null); // To toggle FAQ dropdowns
  const [chatOpen, setChatOpen] = useState(false); // To simulate live chat

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    // Simulate API call
    setTimeout(() => {
      setFormSubmitted(true);
      setFormData({ name: "", email: "", message: "", subject: "", file: null });
    }, 1000);
  };

  const toggleFaq = (index) => {
    setFaqOpen(faqOpen === index ? null : index); // Toggle FAQ dropdown
  };

  const toggleChat = () => {
    setChatOpen(!chatOpen); // Toggle chat modal
  };

  return (
    <div className="contact-container">
      <h1 className="contact-header">Contact Us</h1>
      <p className="contact-subtext">
        We're here to help! Get in touch with us or explore our FAQs.
      </p>

      {/* Success Message */}
      {formSubmitted && (
        <div className="contact-success-message">
          Thank you! Your message has been sent successfully.
        </div>
      )}

      {/* Contact Form */}
      <form action="https://api.web3forms.com/submit" method="POST">
      <input type="hidden" name="access_key" value="0924727f-e5ba-4802-ae4d-13b711c84633"/>

      {/* <form onSubmit={handleSubmit} className="contact-form"> */}
        <div className="contact-form-group">
          <label htmlFor="name" className="contact-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="contact-input"
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="contact-form-group">
          <label htmlFor="email" className="contact-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="contact-input"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="contact-form-group">
          <label htmlFor="subject" className="contact-label">
            Subject
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className="contact-select"
            required
          >
            <option value="" disabled>
              Select a subject
            </option>
            <option value="Order Inquiry">Order Inquiry</option>
            <option value="Returns/Refunds">Returns/Refunds</option>
            <option value="Custom Artwork Request">Custom Artwork Request</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="contact-form-group">
          <label htmlFor="message" className="contact-label">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className="contact-textarea"
            placeholder="Write your message"
            required
          ></textarea>
        </div>

        {/* <div className="contact-form-group">
          <label htmlFor="file" className="contact-label">
            Attach File (optional)
          </label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileUpload}
            className="contact-input"
          />
        </div> */}

        <button type="submit" className="contact-submit-button">
          Send Message
        </button>
      </form>

      {/* Other Features */}
      {/* <div className="contact-features">
        <button className="contact-feature-button" onClick={toggleChat}>
          Live Chat
        </button>
        <button className="contact-feature-button">
          Track Order
        </button>
        <button className="contact-feature-button">
          Check Complaint Status
        </button>
      </div> */}

      {/* FAQ Section */}
      <div className="contact-faq">
        <h2 className="contact-faq-header">Frequently Asked Questions</h2>
        {[
          {
            question: "What is the return policy?",
            answer:
              "You can return any artwork within 15 days of delivery in its original condition.",
          },
          {
            question: "How long does shipping take?",
            answer:
              "Standard shipping usually takes 5-7 business days, depending on your location.",
          },
          {
            question: "Can I request a custom artwork?",
            answer:
              "Yes! You can request a custom artwork by selecting the 'Custom Artwork Request' option in the contact form.",
          },
        ].map((faq, index) => (
          <div
            key={index}
            className={`contact-faq-item ${
              faqOpen === index ? "open" : ""
            }`}
          >
            <div
              className="contact-faq-question"
              onClick={() => toggleFaq(index)}
            >
              {faq.question}
            </div>
            {faqOpen === index && (
              <div className="contact-faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>

      {/* Chat Modal */}
      {chatOpen && (
        <div className="contact-chat-modal">
          <div className="contact-chat-content">
            <h2>Live Chat</h2>
            <p>Hi! How can we assist you today?</p>
            <button onClick={toggleChat} className="contact-chat-close">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contact;
