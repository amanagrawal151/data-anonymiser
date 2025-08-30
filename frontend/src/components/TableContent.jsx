const TableContent = ({ search, fileType, fileStatus, startDate, endDate }) => {
    // Table data as variable
    const tableData = [
      { name: "sample1.csv", type: "CSV", date: "2023-01-01", status: "success" },
      { name: "sample2.xlsx", type: "Excel", date: "2023-01-02", status: "failed" },
      { name: "sample3.parquet", type: "Parquet", date: "2023-01-03", status: "success" }
    ];

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
    });

    return (<>
    <main
        className="container-fluid bg-lvl2"
        style={{ height: "calc(100vh - 56px - 30px)" }}
      >
        <div className="container ">
          <div className="d-flex  gap-8px pt-16px justify-content-end">
            <button className="btn btn-primary btn-md btn-icon-start active ">
              <i className="icon">file_download</i>Export All
            </button>
            <button className="btn btn-discreet-secondary btn-md btn-icon-start  ">
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
              {filtered.map((row, idx) => (
                <tr key={idx}>
                  <td style={{ width: "40px" }}>
                    <div className="custom-control custom-checkbox">
                      <input
                        className="custom-control-input"
                        type="checkbox"
                        value=""
                        id={`cb${idx+2}`}
                      />
                      <label className="custom-control-label" htmlFor={`cb${idx+2}`}></label>
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
        </div>
      </main>
    </>)
}

export default TableContent