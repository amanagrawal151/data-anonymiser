import React from "react";

const securityIcoStyle = {
  minWidth: "3rem",
  height: "3rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(var(--bs-primary-rgb), 0.1)",
};
const securityIcoActiveStyle = {
  ...securityIcoStyle,
  background: "rgba(var(--bs-primary-rgb), 1)",
  color: "var(--bs-primary-alt)",
};

const Auth = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col"></div>
        <div className="col-8">
          <div className="d-flex flex-column my-5">
            <div className="heading mb-2">
              <div
                className="rounded-circle bg-info d-flex align-items-center justify-content-center mb-3"
                style={{ width: "3rem", height: "3rem" }}
              >
                <em className="icon line-height-1">security</em>
              </div>
              <h1 className="mb-1">Authenticate your account</h1>
              <p className="h3 text-secondary">
                Choose a security method to authenticate
              </p>
            </div>
            <div className="alert text-secondary d-flex fs-5 p-0 mt-2 mb-3 gap-2" role="alert">
              <i className="icon icon-outlined icon-sm lh-1">info</i>
              You’re signed in as john.smith@sgcib.com and the service that you are trying to access requires additional authentication.
            </div>
            <ul className="list-group list-group-flush border-top border-opacity-50">
              <li className="list-group-item list-group-item-action d-flex border-bottom border-opacity-50 px-12px gap-12px">
                <div className="security-ico active rounded-circle" style={securityIcoActiveStyle}>
                  <em className="icon icon-outlined line-height-1">vpn_lock</em>
                </div>
                <div className="d-flex flex-column flex-grow-1">
                  <div className="d-flex flex-row">
                    <div className="flex-grow-1 d-grid gap-1 py-1">
                      <h6>Secure Access</h6>
                      <p className="text-secondary">Verify using Secure Access app on your device</p>
                    </div>
                    <div className="flex py-2">
                      <div className="btn-group">
                        <button className="btn btn-flat-primary btn-icon"><i className="icon icon-md">arrow_forward</i></button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="list-group-item list-group-item-action d-flex border-bottom border-opacity-50 px-12px gap-12px">
                <div className="security-ico rounded-circle" style={securityIcoStyle}>
                  <em className="icon icon-outlined line-height-1">assignment_ind</em>
                </div>
                <div className="d-flex flex-column flex-grow-1">
                  <div className="d-flex flex-row">
                    <div className="flex-grow-1 d-grid gap-1 py-1">
                      <h6>SG Unipass</h6>
                      <p className="text-secondary">Verify using your SG Unipass credentials</p>
                    </div>
                    <div className="flex py-2">
                      <div className="btn-group">
                        <button className="btn btn-flat-primary btn-icon"><i className="icon icon-md">arrow_forward</i></button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="list-group-item list-group-item-action d-flex border-bottom border-opacity-50 px-12px gap-12px">
                <div className="security-ico rounded-circle" style={securityIcoStyle}>
                  <em className="icon icon-outlined line-height-1">gpp_good</em>
                </div>
                <div className="d-flex flex-column flex-grow-1">
                  <div className="d-flex flex-row">
                    <div className="flex-grow-1 d-grid gap-1 py-1">
                      <h6>Trust builder / Inwebo</h6>
                      <p className="text-secondary">Verify using your Trust builder or Inwebo authenticator</p>
                    </div>
                    <div className="flex py-2">
                      <div className="btn-group">
                        <button className="btn btn-flat-primary btn-icon"><i className="icon icon-md">arrow_forward</i></button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <div className="d-block d-grid gap-2 py-4">
              <a href="#" className="">
                I can not use any of these method
              </a>
            </div>
          </div>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

export default Auth;
//             <div class="d-flex flex-column flex-grow-1">
//               <div class="d-flex flex-row">
//                 <div class="flex-grow-1 d-grid gap-1 py-1">
//                   <h6>Secure Access</h6>
//                   <p class="text-secondary">Verify using Secure Access app on your device</p>
//                 </div>
//                 <div class="flex py-2">
//                   <div class="btn-group">
//                     <button class="btn btn-flat-primary btn-icon"><i class="icon icon-md">arrow_forward</i></button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </li>
//           <li class="list-group-item list-group-item-action d-flex border-bottom border-opacity-50 px-12px gap-12px">
//             <div class="security-ico rounded-circle">
//               <em class="icon icon-outlined line-height-1">
//                 assignment_ind
//               </em>
//             </div>
//             <div class="d-flex flex-column flex-grow-1">
//               <div class="d-flex flex-row">
//                 <div class="flex-grow-1 d-grid gap-1 py-1">
//                   <h6>SG Unipass</h6>
//                   <p class="text-secondary">Verify using your SG Unipass credentials</p>
//                 </div>
//                 <div class="flex py-2">
//                   <div class="btn-group">
//                     <button class="btn btn-flat-primary btn-icon"><i class="icon icon-md">arrow_forward</i></button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </li>
//           <li class="list-group-item list-group-item-action d-flex border-bottom border-opacity-50 px-12px gap-12px">
//             <div class="security-ico rounded-circle">
//               <em class="icon icon-outlined line-height-1">
//                 gpp_good
//               </em>
//             </div>
//             <div class="d-flex flex-column flex-grow-1">
//               <div class="d-flex flex-row">
//                 <div class="flex-grow-1 d-grid gap-1 py-1">
//                   <h6>Trust builder / Inwebo</h6>
//                   <p class="text-secondary">Verify using your Trust builder or Inwebo authenticator</p>
//                 </div>
//                 <div class="flex py-2">
//                   <div class="btn-group">
//                     <button class="btn btn-flat-primary btn-icon"><i class="icon icon-md">arrow_forward</i></button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </li>
//         </ul>
//         <div class="d-block d-grid gap-2 py-4">
//           <a href="#" class="">
//             I can not use any of these method
//           </a>
//         </div>
//       </div>
//     </div>
//     <div class="col"></div>
//   </div>
// </div>
//     </>
//     )
    
// }