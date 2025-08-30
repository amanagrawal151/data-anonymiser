import TableContent from "./TableContent";

import { useState } from "react";

const Table = () => {
  // Filter/search state
  const [search, setSearch] = useState("");
  const [fileType, setFileType] = useState("");
  const [fileStatus, setFileStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <>
      <section className="container">
        <div className="row">
          <div className="col mt-5 d-flex flex-column gap-16px pb-24px">
            <h className="display-2 pb-8px">Files</h>
            <div className="d-flex flex-row gap-16px">
              <div className="input-group input-group-lg">
                <div className="input-icon-start">
                  <em className="icon">search</em>
                </div>
                <input
                  type="search"
                  className="form-control form-control-lg "
                  placeholder="Search any employee"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <div>
                <button
                  className="btn btn-flat-info btn-icon-start btn-lg  active"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseExample"
                  aria-controls="collapseExample"
                  style={{ height: 40, width: "auto" }}
                >
                  <i className="icon">filter_list</i> Filters
                </button>
              </div>
              <div>
                <button
                  className="btn btn-primary btn-icon-start btn-lg  active"
                  type="button"
                  style={{ height: 40 }}
                >
                  <i className="icon">search</i>Search
                </button>
              </div>
            </div>
            <section className="flex-x gap-8px">
              <p className="fw-medium">Active filters</p>
              {fileType && (
                <span className="badge badge-discreet-info badge-md badge-dismissible ">
                  <button type="button" className="btn" onClick={() => setFileType("")}> 
                    <em className="icon">close</em>
                  </button>
                  {fileType}
                </span>
              )}
              {fileStatus && (
                <span className="badge badge-discreet-info badge-md badge-dismissible ">
                  <button type="button" className="btn" onClick={() => setFileStatus("")}> 
                    <em className="icon">close</em>
                  </button>
                  {fileStatus}
                </span>
              )}
              {startDate && (
                <span className="badge badge-discreet-info badge-md badge-dismissible ">
                  <button type="button" className="btn" onClick={() => setStartDate("")}> 
                    <em className="icon">close</em>
                  </button>
                  Start: {startDate}
                </span>
              )}
              {endDate && (
                <span className="badge badge-discreet-info badge-md badge-dismissible ">
                  <button type="button" className="btn" onClick={() => setEndDate("")}> 
                    <em className="icon">close</em>
                  </button>
                  End: {endDate}
                </span>
              )}
              {(fileType || fileStatus || startDate || endDate) && (
                <button className="btn btn-link btn-sm" onClick={() => {
                  setFileType("");
                  setFileStatus("");
                  setStartDate("");
                  setEndDate("");
                }}>
                  Clear all
                </button>
              )}
            </section>
            <div className="collapse" id="collapseExample">
              <div className="d-flex flex-row justify-content-evenly">
                <div
                  className="d-flex flex-wrap align-content-between justify-content-between"
                  style={{ width: "65%" }}
                >
                  <div
                    className="btn-group p-2 d-flex flex-column"
                    style={{ width: 230 }}
                  >
                    <label htmlFor="fileType" className="form-label mb-4px">
                      File Type
                    </label>
                    <div className="form-group">
                      <select id="fileType" className="form-select" value={fileType} onChange={e => setFileType(e.target.value)}>
                        <option value="">All</option>
                        <option value="CSV">CSV</option>
                        <option value="Excel">Excel</option>
                        <option value="Parquet">Parquet</option>
                      </select>
                    </div>

                    <label htmlFor="fileStatus" className="form-label mb-4px">
                      File Status
                    </label>
                    <div className="form-group">
                      <select id="fileStatus" className="form-select" value={fileStatus} onChange={e => setFileStatus(e.target.value)}>
                        <option value="">All</option>
                        <option value="success">Success</option>
                        <option value="failed">Failed</option>
                        <option value="pending">Pending</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div
                  className="form-check form-switch mb-4 d-flex flex-column justify-content-evenly fs-4"
                  style={{ width: "25%" }}
                >
                  <div
                    className="form-group d-flex flex-column align-items-start justify-content-between"
                    style={{ width: "230px" }}
                  >
                    <label htmlFor="startDate" className="form-label mb-4px">
                      Start Date
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      className="form-control mb-2"
                      value={startDate}
                      onChange={e => setStartDate(e.target.value)}
                    />
                    <label htmlFor="endDate" className="form-label mb-4px mt-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      className="form-control"
                      value={endDate}
                      onChange={e => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* body content  */}
      <TableContent
        search={search}
        fileType={fileType}
        fileStatus={fileStatus}
        startDate={startDate}
        endDate={endDate}
      />
    </>
  );
};

export default Table;

// </header>

// <!-- BODY Content -->
