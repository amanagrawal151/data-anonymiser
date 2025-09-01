import React, { useEffect, useState } from "react";

const Sidebar = ({ show, setShow }) => {
  const [user, setUser] = useState({ name: '', email: '', department: '' });
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) setVisible(true);
  }, [show]);

  useEffect(() => {
    fetch('http://localhost:3000/api/users')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setUser({
            name: data[0].name || '',
            email: data[0].email || '',
            department: data[0].department || ''
          });
        }
      })
      .catch(() => {});
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => setVisible(false), 300); // match transition duration
  };

  if (!visible && !show) return null;
  return (
    <>
      <style>{`
        .sidebar-slide {
          transition: transform 0.3s cubic-bezier(.4,0,.2,1), opacity 0.3s cubic-bezier(.4,0,.2,1);
          transform: translateX(100%);
          opacity: 0;
        }
        .sidebar-slide.open {
          transition: transform 0.6s cubic-bezier(.4,0,.2,1), opacity 0.6s cubic-bezier(.4,0,.2,1);
          transform: translateX(0);
          opacity: 1;
        }
      `}</style>
      <nav class="navbar navbar-sm border-bottom">
        <div class="navbar-toolbar">
          <div class="user-toolbar">
            <header class="d-flex align-items-center justify-content-end ac">
              <p class="badge badge-discreet-warning badge-prepend-square me-1">
                Admin
              </p>
              <p class="badge badge-discreet-primary badge-prepend-square me-1">
                Reader
              </p>
              <sgwt-account-center
                available-languages="fr,en"
                authentication="sg-connect-v2"
              >
                <span>
                  <div class="d-flex position-relative sgwt-account-center me-3">
                    <div class="position-relative">
                      <button
                        class="btn btn-flat-primary btn-lg btn-icon ml-1 ms-1 sgwt-account-center-help ps-2 pe-2"
                        aria-haspopup="true"
                        aria-expanded="false"
                        aria-label="Help"
                        title="Help"
                      >
                        <i class="icon icon-md">help_outline</i>
                      </button>
                    </div>
                    <div class="d-flex position-relative">
                      <button
                        class="btn btn-flat-primary btn-lg btn-icon ml-1 ms-1 sgwt-account-center-my-services ps-2 pe-2"
                        aria-haspopup="true"
                        aria-expanded="false"
                        aria-label="My services"
                        title="My services"
                      >
                        <i class="icon icon-md">apps</i>
                      </button>
                      <button
                        class="btn btn-flat-primary btn-lg btn-icon ml-1 ms-1 sgwt-account-center-user-info ps-2 pe-2"
                        aria-haspopup="true"
                        aria-expanded="false"
                        aria-label="My account"
                        data-toggle="popup"
                        data-target="#user-card"
                        aria-controls="user-card"
                        title="My account"
                      >
                        <i class="icon icon-md">account_circle</i>
                      </button>

                      <div class="text-left justify-content-start text-small ml-2 ms-2 d-none d-md-block align-self-center sgwt-account-center-user-info">
                        <div class="text-capitalize text-truncate font-weight-medium fw-medium sgwt-account-center-user">
                          {user.name || 'User'}
                        </div>
                        <button class="btn-signout border-0 p-0 btn btn-link text-left text-start font-weight-medium fw-medium justify-content-start btn-sm">
                          Sign out
                        </button>
                      </div>
                      <div class="sgwt-account-center-tags"></div>
                    </div>
                  </div>
                </span>
              </sgwt-account-center>

              <sgwt-help-center
                sg-connect-support="sg-connect-v2"
                application-id="designlab"
                message-only="true"
              >
                <span>
                  <div class="sgwt-help-center"></div>
                </span>
              </sgwt-help-center>
            </header>
          </div>
        </div>
      </nav>

      <aside
        className={`card shadow-max sgwt-account-center-panel sidebar-slide${show ? " open" : ""}`}
        style={{
          position: "fixed",
          zIndex: 1035,
          height: "100vh",
          right: 0,
          top: 0,
          width: "474px",
        }}
      >
        <div class="card-header px-4 pt-4 pb-3">
          <div class="d-flex justify-content-between align-items-center">
            <h2 class="h4 m-0">My account</h2>
            <span>
              <button type="button" class="btn-close" aria-label="Close" onClick={handleClose}></button>
            </span>
          </div>
        </div>

        <div class="d-flex mb-4 mx-4">
          <div
            aria-hidden="true"
            class="sgwt-user-initials rounded-circle bg-lvl4 my-2 d-flex justify-content-center"
            style={{ height: "64px", width: "64px" }}
          >
            <span class="text-secondary text-uppercase display-4 align-self-center">
              JD
            </span>
          </div>
          <div
            class="ml-3 ms-3 align-self-center"
            style={{ maxWidth: "300px" }}
          >
            <h3 class="h6 mb-1 text-capitalize">{user.name || 'User'}</h3>
            <div class="mb">{user.email || 'user@email.com'}</div>
            <p class="badge badge-discreet-warning badge-prepend-square mt-1">
             Admin
            </p>
            {/* <p class="badge badge-discreet-primary badge-prepend-square mt-1">
              Reader
            </p> */}
          </div>
        </div>

        {/* <li class="list-group-item dropdown border-top border-opacity-40 p-0">
          <button
            class="btn btn-flat-primary btn-block flex-between ps-16px pe-12px py-12px"
            data-toggle="tooltip"
            data-placement="left"
            title="The region loaded by default when accessing the Check360 UI"
          >
            <div class="d-flex align-items-center gap-8px">
              <i class="icon icon-sm text-secondary">public</i>
              <p class="text-secondary fw-medium">Team</p>
            </div>
            <div class="d-flex align-items-center gap-8px">
              <p>EMEA</p>
              <i class="icon icon-sm">arrow_drop_down</i>
            </div>
          </button>
        </li> */}

        {/* <li class="list-group-item dropdown border-top border-opacity-40 p-0">
          <button class="btn btn-flat-primary btn-block flex-between ps-16px pe-12px py-12px">
            <div class="d-flex align-items-center gap-8px">
              <i class="icon icon-sm text-secondary">brightness_4</i>
              <p class="text-secondary fw-medium">Theme</p>
            </div>
            <div class="d-flex align-items-center gap-8px">
              <p>Light</p>
              <i class="icon icon-sm">arrow_drop_down</i>
            </div>
          </button>
        </li> */}
        {/* </ul> */}

        <ul class="d-flex flex-wrap mx-4 list-unstyled row-cols-1">
          <li class="pr-1 pe-1 w-100">
            <button
              class="btn btn-link btn-block flex-between btn-icon-text btn-icon-start btn-lg bg-lvl2 text-left text-truncate mb-1 pl-4 ps-4"
              data-toggle="tooltip"
              data-placement="left"
              title="The region loaded by default when accessing the Check360 UI"
            >
              <div>
                <i className="icon icon-sm text-secondary">public</i>
                    Department
              </div>
              <div>{user.department || 'Department'}</div>
            </button>
          </li>
          <li class="pr-1 pe-1 w-100">
            <button class="btn btn-link btn-block flex-between btn-icon-text btn-icon-start btn-lg bg-lvl2 text-left text-truncate mb-1 pl-4 ps-4">
              <div>
                <i class="icon icon-sm text-secondary">brightness_4</i>
                Theme
              </div>
              <div>Light</div>
            </button>
          </li>
        </ul>

        <ul class="d-flex flex-wrap mx-4 mb-4 list-unstyled row-cols-2">
          <li class="pr-1 pe-1 w-50">
            <button class="btn btn-link btn-block btn-icon-text btn-icon-start btn-lg bg-lvl2 text-left justify-content-start text-truncate mb-1 pl-4 ps-4 sgwt-account-center-user-panel-language-button">
              <i class="icon icon-sm text-secondary">language</i>
              Language EN
            </button>
          </li>
          <li class="pr-1 pe-1 w-50">
            <button class="btn btn-link btn-block btn-icon-text btn-icon-start btn-lg bg-lvl2 text-left justify-content-start text-truncate mb-1 pl-4 ps-4 sgwt-account-center-user-panel-sign-out-button">
              <i class="icon">power_settings_new</i>
              Sign out
            </button>
          </li>
        </ul>

        {/* <!-- Account card starts here --> */}
        <div class="px-24px pb-24px">
          <section class="bg-lvl2">
            {/* <article class="flex-between pb-16px p-16px"> */}
              {/* <div class="w-75">
                <h5 class="text-capitalize pb-4px">John DOE</h5>
                <p>john.doe@sgcib.com</p>
                <div class="mt-2">
                  <p class="badge badge-discreet-primary badge-prepend-square mt-1">
                    Trader EMEA
                  </p>
                  <p class="badge badge-discreet-primary badge-prepend-square mt-1">
                    Reader
                  </p>
                </div>
              </div>
              <button class="btn btn-flat btn-md d-flex flex-column">
                <i class="icon icon-sm">power_settings_new</i>
                Sign out
              </button>
            </article>

            <ul class="list-group">
              <li class="list-group-item dropdown border-top border-opacity-40 p-0">
                <button
                  class="btn btn-flat-primary btn-block flex-between ps-16px pe-12px py-12px"
                  data-toggle="tooltip"
                  data-placement="left"
                  title="The region loaded by default when accessing the Check360 UI"
                >
                  <div class="d-flex align-items-center gap-8px">
                    <i class="icon icon-sm text-secondary">public</i>
                    <p class="text-secondary fw-medium">Default region</p>
                  </div>
                  <div class="d-flex align-items-center gap-8px">
                    <p>EMEA</p>
                    <i class="icon icon-sm">arrow_drop_down</i>
                  </div>
                </button>
              </li>

              <li class="list-group-item dropdown border-top border-opacity-40 p-0">
                <button class="btn btn-flat-primary btn-block flex-between ps-16px pe-12px py-12px">
                  <div class="d-flex align-items-center gap-8px">
                    <i class="icon icon-sm text-secondary">brightness_4</i>
                    <p class="text-secondary fw-medium">Theme</p>
                  </div>
                  <div class="d-flex align-items-center gap-8px">
                    <p>Light</p>
                    <i class="icon icon-sm">arrow_drop_down</i>
                  </div>
                </button>
              </li>
            </ul> */}

            <article class="bg-lvl3">
              <button class="btn btn-flat btn-block btn-lg btn-icon-start">
                <i class="icon icon-sm me-8px">settings</i>
                <span>Manage account</span>
              </button>
            </article>
          </section>
        </div>

        <div class="d-flex justify-content-between mb-3 mx-4">
          <h3 class="h6 mb-0">Notifications</h3>
          <a
            href="https://digital.sgmarkets.com/notifications/#?producerCode=sgm_myservices"
            target="_blank"
          >
            See all
            <i class="icon icon-sm">arrow_forward</i>
          </a>
        </div>
        <div class="flex-grow-1" style={{ overflowY: "auto" }} />
        <div>
          <hr class="my-0" />
          <div>
            <ul class="list-group list-group-flush sgwt-notifications-list">
              <a
                class="list-group-item list-group-item-action border-0 flex-column align-items-start pt-16px pb-0 px-16px px-lg-24px sgwt-one-notification"
                target="_blank"
              >
                <div class="d-flex">
                  <div
                    class="card border d-flex justify-content-center align-items-center essentials-card-icon text-black bg-white p-0 display-5 me-16px"
                    style={{
                      height: "46px",
                      width: "46px",
                      borderRadius: "10px",
                    }}
                  >
                    <span class="fw-medium">F</span>
                  </div>
                  <div>
                    <div class="font-weight-semibold text-success fw-semibold line-height-1 mb-1">
                      Encryption successful 
                    </div>
                    <div class="text-small fs-6 ">about 3 hours</div>
                  </div>
                </div>
                <p class="my-0 py-3 text-secondary border-bottom">
                  A file recently uploaded by you is successfully encrypted.
                </p>
              </a>
              <a
                class="list-group-item list-group-item-action border-0 flex-column align-items-start pt-3 pb-0 px-3 px-lg-4 sgwt-one-notification"
                target="_blank"
              >
                <div class="d-flex">
                  <div
                    class="card border d-flex justify-content-center align-items-center essentials-card-icon text-black bg-white p-0 display-5 me-16px"
                    style={{
                      height: "46px",
                      width: "46px",
                      borderRadius: "10px",
                    }}
                  >
                    <span class="fw-medium">I</span>
                  </div>
                  <div>
                    <div class="font-weight-semibold text-danger fw-semibold line-height-1 mb-1">
                      Decryption Failure
                    </div>
                    <div class="text-small fs-6 ">about 1 month</div>
                  </div>
                </div>
                <p class="my-0 py-3 text-secondary border-bottom">
                  Decryption failed due to invalid key.
                </p>
              </a>
              <a
                class="list-group-item list-group-item-action border-0 flex-column align-items-start pt-3 pb-0 px-3 px-lg-4"
                target="_blank"
              >
                <div class="d-flex">
                  <div
                    class="card border d-flex justify-content-center align-items-center essentials-card-icon text-black bg-white p-0 display-5 me-16px"
                    style={{
                      height: "46px",
                      width: "46px",
                      borderRadius: "10px",
                    }}
                  >
                    <span class="fw-medium">I</span>
                  </div>
                  <div>
                    <div class="font-weight-semibold fw-semibold line-height-1 mb-1">
                      SG Markets Integration
                    </div>
                    <div class="text-small fs-6 ">about 2 months</div>
                  </div>
                </div>
                <p class="my-0 py-3 text-secondary">
                  A new task has been assigned to you for the integration of Web
                  Pricer
                </p>
              </a>
            </ul>
            <hr class="my-0" />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
