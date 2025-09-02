import React, { useEffect, useState } from "react";

const TableContent = ({ search, fileType, fileStatus, startDate, endDate }) => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    console.log("[TableContent] Fetching files from API...");
    setLoading(true);
    fetch("http://localhost:3000/api/files")
      .then(res => res.json())
      .then(data => {
        console.log("[TableContent] Files API response:", data);
        if (Array.isArray(data) && data.length > 0) {
          setTableData(
            data.map(f => ({
              name: f.fileName,
              type: f.fileType,
              date: f.uploadTimestamp ? f.uploadTimestamp.slice(0, 10) : '',
              status: f.stage,
            }))
          );
        } else {
          console.warn("[TableContent] Files API returned no data, using fallback.");
          setTableData([
            { name: "sample1.csv", type: "CSV", date: "2023-01-01", status: "success" },
            { name: "sample2.xlsx", type: "Excel", date: "2023-01-02", status: "failed" },
            { name: "sample3.parquet", type: "Parquet", date: "2023-01-03", status: "success" }
          ]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("[TableContent] Failed to fetch files, using fallback.", err);
        setError("Failed to fetch files");
        setTableData([
          { name: "sample1.csv", type: "CSV", date: "2023-01-01", status: "success" },
          { name: "sample2.xlsx", type: "Excel", date: "2023-01-02", status: "failed" },
          { name: "sample3.parquet", type: "Parquet", date: "2023-01-03", status: "success" }
        ]);
        setLoading(false);
      });
  }, []);

  // Filtering logic
  const filtered = tableData.filter(row => {
    // Search by name (case-insensitive)
    if (search && !row.name.toLowerCase().includes(search.toLowerCase())) return false;
    // File type
    if (fileType && row.type !== fileType) return false;
    // File status
    if (fileStatus && row.status.toLowerCase() !== fileStatus.toLowerCase()) return false;
    // Start date
    if (startDate && row.date < startDate) return false;
    // End date
    if (endDate && row.date > endDate) return false;
    return true;
  }).reverse();

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Handle checkbox change
  const handleCheckboxChange = (idx, checked) => {
    const id = idx + (page-1)*pageSize;
    setSelected(prev => checked ? [...prev, id] : prev.filter(i => i !== id));
  };
  // Handle select all
  const handleSelectAll = (checked) => {
    if (checked) {
      setSelected(paginated.map((_, idx) => idx + (page-1)*pageSize));
    } else {
      setSelected([]);
    }
  };
  // Replace exportRows with API-based download
  const exportRows = async (rows) => {
    for (const r of rows) {
      try {
        const res = await fetch(`http://localhost:3000/api/s3/download-url?fileName=${encodeURIComponent(r.name)}`);
        const data = await res.json();
        if (data.url) {
          const link = document.createElement('a');
          link.href = data.url;
          link.download = r.name;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          await new Promise(resolve => setTimeout(resolve, 500)); // Small delay to avoid popup blocking
        } else {
          alert(`Download URL not found for ${r.name}`);
        }
      } catch {
        alert(`Failed to get download URL for ${r.name}`);
      }
    }
  };
  const handleExportAll = () => {
    exportRows(filtered);
  };
  const handleExportSelected = () => {
    const rows = selected.map(i => filtered[i]).filter(Boolean);
    exportRows(rows);
  };

  if (loading) return <div className="container mt-5">Loading files...</div>;
  // Show error but still show table with example data
  // if (error) return <div className="container mt-5 text-danger">{error}</div>;

  return (
    <main
      className="container-fluid bg-lvl2"
      style={{ height: "calc(100vh - 56px - 30px)" }}
    >
      <div className="container ">
        <div className="d-flex  gap-8px pt-16px justify-content-end">
          <button className="btn btn-primary btn-md btn-icon-start active " onClick={handleExportAll}>
            <i className="icon">file_download</i>Export All
          </button>
          <button className="btn btn-discreet-secondary btn-md btn-icon-start  " onClick={handleExportSelected}>
            <i className="icon">file_download</i>Export selected
          </button>
        </div>
        <table className="table table-striped  table-hover">
          <thead>
            <tr>
              <th scope="col" style={{ width: "40px" }}>
                <div className="custom-control custom-checkbox">
                  <input
                    className="custom-control-input"
                    type="checkbox"
                    value=""
                    id="cb1"
                    checked={paginated.length > 0 && paginated.every((_, idx) => selected.includes(idx + (page-1)*pageSize))}
                    onChange={e => handleSelectAll(e.target.checked)}
                  />
                  <label className="custom-control-label" htmlFor="cb1"></label>
                </div>
              </th>
              <th scope="col" className="p-0">
                <button
                  style={{ margin: "6px 0px" }}
                  className="btn btn-link btn-text-icon btn-block text-left"
                >
                  Name<i className="icon">arrow_downward</i>
                </button>
              </th>
              <th scope="col" className="p-0">
                <button
                  style={{ margin: "6px 0px" }}
                  className="btn btn-link btn-text-icon btn-block text-left"
                >
                  type<i className="icon"></i>
                </button>
              </th>
              <th scope="col" className="p-0">
                <button
                  style={{ margin: "6px 0px" }}
                  className="btn btn-link btn-text-icon btn-block text-left"
                >
                  Date<i className="icon"></i>
                </button>
              </th>
              <th scope="col" className="p-0">
                <button
                  style={{ margin: "6px 0px" }}
                  className="btn btn-link btn-text-icon btn-block text-left"
                >
                  status<i className="icon"></i>
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((row, idx) => (
              <tr key={idx + (page-1)*pageSize}>
                <td style={{ width: "40px" }}>
                  <div className="custom-control custom-checkbox">
                    <input
                      className="custom-control-input"
                      type="checkbox"
                      value=""
                      id={`cb${idx+2+(page-1)*pageSize}`}
                      checked={selected.includes(idx + (page-1)*pageSize)}
                      onChange={e => handleCheckboxChange(idx, e.target.checked)}
                    />
                    <label className="custom-control-label" htmlFor={`cb${idx+2+(page-1)*pageSize}`}></label>
                  </div>
                </td>
                <td>{row.name}</td>
                <td>{row.type}</td>
                <td>{row.date}</td>
                <td>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-center mt-3">
          <nav aria-label="Page navigation">
            <ul className="pagination pagination-borderless">
              <li className={`page-item${page === 1 ? ' disabled' : ''}`}>
                <a className="page-link" href="#borderless" tabIndex="-1" onClick={e => {e.preventDefault(); if(page > 1) setPage(page-1);}}>
                  <i className="icon">keyboard_arrow_left</i>
                </a>
              </li>
              {Array.from({length: totalPages}, (_, i) => (
                <li key={i+1} className={`page-item ml-2${page === i+1 ? ' active' : ''}`}>
                  <a className="page-link" href="#borderless" onClick={e => {e.preventDefault(); setPage(i+1);}}>{i+1}</a>
                </li>
              ))}
              <li className={`page-item ml-2${page === totalPages ? ' disabled' : ''}`}>
                <a className="page-link pl-2" href="#borderless" onClick={e => {e.preventDefault(); if(page < totalPages) setPage(page+1);}}>
                  Next <i className="icon">keyboard_arrow_right</i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </main>
  );
}

export default TableContent