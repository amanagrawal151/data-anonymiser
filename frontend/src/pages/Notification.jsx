import React, { useEffect, useState } from "react";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    console.log("[Notification] Fetching notifications from API...");
    fetch("http://localhost:3000/api/notifications")
      .then((res) => res.json())
      .then((data) => {
        console.log("[Notification] API response:", data);
        if (Array.isArray(data) && data.length > 0) {
          setNotifications(data.reverse());
        } else {
          console.warn("[Notification] API returned no notifications, using fallback.");
          setNotifications([
            {
              id: 1,
              unread: true,
              priority: false,
              title: "Sample Notification",
              details:
                "This is a sample notification. Your API is not responding.",
              fileType: "csv",
              cryptForm: "encryption",
              time: new Date().toISOString(),
              bg: "bg-lvl1",
            },
          ]);
        }
      })
      .catch((err) => {
        console.error("[Notification] Failed to fetch notifications, using fallback.", err);
        setNotifications([
          {
            id: 1,
            unread: true,
            priority: false,
            title: "Sample Notification",
            details:
              "This is a sample notification. Your API is not responding.",
            fileType: "csv",
            cryptForm: "encryption",
            time: new Date().toISOString(),
            bg: "bg-lvl1",
          },
        ]);
      });
  }, []);

  const totalPages = Math.ceil(notifications.length / pageSize);
  const paginated = notifications.slice((page - 1) * pageSize, page * pageSize);

  return (
    <>
      <style>{`
      .notification-grid {
        display: grid;
        grid-template-columns: max-content minmax(0, 1fr) max-content max-content;
      }
      .notification-grid-row {
        display: contents;
      }
      .notification-grid-row.unread:hover div {
        background-color: rgba(0,0,0,.05) !important;
      }
      .notification-grid-row:hover div {
        background-color: rgba(0,0,0,.06) !important;
      }
      @media only screen and (min-width: 1300px) {
        .notification-grid {
          /* Something happens */
        }
      }
    `}</style>

      <section className="container-fluid">
        <div className="row">
          <div className="col p-5">
            <div className="notification-grid border border-bottom-0 border-opacity-40">
              {paginated.map((n) => {
                const Tag = n.unread
                  ? n.bg === "bg-lvl1"
                    ? "article"
                    : "a"
                  : "a";
                return (
                  <Tag
                    key={n.id}
                    href={Tag === "a" ? "" : undefined}
                    className={`notification-grid-row${
                      n.unread ? " unread" : ""
                    }`}
                  >
                    <div
                      className={`border-bottom border-opacity-40 ${n.bg} d-flex align-items-center gap-4px ps-12px`}
                    >
                      <button
                        className={`btn btn-flat-info border-radius-circle flex-center p-8px${
                          n.unread && !n.priority
                            ? ""
                            : n.unread && n.priority
                            ? ""
                            : " invisible"
                        }`}
                      >
                        <span
                          className="bg-info border-radius-circle"
                          style={{ height: "8px", width: "8px" }}
                        ></span>
                      </button>
                      <span
                        className={`bg-warning bg-opacity-10 text-warning border-radius-circle flex-center p-4px${
                          n.priority ? "" : " invisible"
                        }`}
                      >
                        <i className="icon icon-xs lh-1">priority_high</i>
                      </span>
                    </div>
                    <div
                      className={`border-bottom border-opacity-40 ${n.bg} text-primary d-flex flex-column justify-content-center py-12px ps-12px`}
                    >
                      <p
                        className={`notification-title-link fw-semibold text-truncate`}
                      >
                        {n.title}
                      </p>
                      <p className="fw-normal text-truncate">{n.details}</p>
                    </div>
                    <div
                      className={`border-bottom border-opacity-40 ${n.bg} d-flex align-items-center gap-8px ps-12px pe-24px`}
                    >
                      <span
                        className={`border border-opacity-40 border-radius-4${
                          n.bg === "bg-lvl2" ? " bg-lvl1" : " overflow-hidden"
                        }`}
                      >
                        <p
                          className="fs-12 fw-semibold text-dark flex-center overflow-hidden"
                          style={{ height: "24px", width: "24px" }}
                        >
                          {n.fileType}
                        </p>
                      </span>
                      <p className="font-weight-normal text-primary fw-medium fs-12">
                        {n.cryptForm}
                      </p>
                    </div>
                    <div
                      className={`border-bottom border-opacity-40 ${n.bg} d-flex flex-column justify-content-center pe-24px`}
                    >
                      <p className="text-secondary font-weight-medium mb-0 d-none d-lg-block text-end">
                        {n.time ? new Date(n.time).toLocaleString('en-IN', { hour12: true }) : ""}
                      </p>
                    </div>
                  </Tag>
                );
              })}
            </div>
            <div className="d-flex justify-content-center mt-3">
              <nav aria-label="Page navigation">
                <ul className="pagination pagination-borderless">
                  <li className={`page-item${page === 1 ? ' disabled' : ''}`}>
                    <a className="page-link" href="#" tabIndex="-1" onClick={e => {e.preventDefault(); if(page > 1) setPage(page-1);}}>
                      <i className="icon">keyboard_arrow_left</i>
                    </a>
                  </li>
                  {Array.from({length: totalPages}, (_, i) => (
                    <li key={i+1} className={`page-item ml-2${page === i+1 ? ' active' : ''}`}>
                      <a className="page-link" href="#" onClick={e => {e.preventDefault(); setPage(i+1);}}>{i+1}</a>
                    </li>
                  ))}
                  <li className={`page-item ml-2${page === totalPages ? ' disabled' : ''}`}>
                    <a className="page-link pl-2" href="#" onClick={e => {e.preventDefault(); if(page < totalPages) setPage(page+1);}}>
                      Next <i className="icon">keyboard_arrow_right</i>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Notification;
