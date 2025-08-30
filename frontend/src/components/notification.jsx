
import React, { useState } from "react";

const Notification = ({ body = "Hello, world! This is a notification message." }) => {
  const [show, setShow] = useState(true);
  if (!show) return null;
  return (
    <div
      className="notification notification-primary show"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="notification-header">
        <span className="fw-medium me-auto">SG Bootstrap ❤</span>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={() => setShow(false)}
        ></button>
      </div>
      <div className="notification-body">
        {body}
      </div>
    </div>
  );
};

export default Notification;
