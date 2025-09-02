import React from "react";

/**
 * @param {Object} props
 * @param {Array<{label: string}>} props.steps - Array of step objects with label
 * @param {number} props.current - Current step index (0-based)
 * @param {string} [props.activeColor] - Color class for active/current step
 * @param {string} [props.completedColor] - Color class for completed steps
 * @param {number|null} [props.failed] - Index of failed step (optional)
 */
const Stepper = ({
  steps = [
    { label: "Initiated" },
    { label: "Uploaded" },
    { label: "Processed" },
    { label: "Ready to download" },
  ],
  current = 0,
  activeColor = "text-primary",
  completedColor = "text-success",
  failed = null,
}) => {
  return (
    <ul className={`stepper ${activeColor}`}>
      {steps.map((step, idx) => {
        let stepClass = "stepper-step ";
        let indicator = null;
        if (failed === idx) {
          stepClass += "stepper-step-failed text-danger";
          indicator = (
            <svg width="24" height="24" viewBox="0 0 24 24" className="icon stepper-indicator-failed" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
              <circle cx="12" cy="12" r="12" fill="red" />
            </svg>
          );
        } else if (idx < current) {
          stepClass += `fill ${completedColor}`;
          indicator = <span className="icon stepper-indicator-complete">check</span>;
        } else if (idx === current) {
          stepClass += ` current ${activeColor}`;
          indicator = <span className="icon stepper-indicator-current">fiber_manual_record</span>;
        } else {
          stepClass += "inactive";
          indicator = <span className="icon stepper-indicator-inactive"></span>;
        }
        return (
          <li className={stepClass} key={step.label}>
            <div className="stepper-step-inner">
              <div className="stepper-indicator">{indicator}</div>
            </div>
            <span className="stepper-label">
              {step.label}
              {failed === idx && <span className="ms-2 text-danger"></span>}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default Stepper;

// example 
// <Stepper
//   steps={[
//     { label: "Initiated" },
//     { label: "Uploaded" },
//     { label: "Processed" },
//     { label: "Ready to download" }
//   ]}
//   current={2}
//   activeColor="text-primary"
//   completedColor="text-success"
//   failed={null} // or set to a step index to show failure
// />