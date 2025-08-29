const Stepper = () => {
    return (
        <>
        <ul class="stepper text-primary">
 <li class="stepper-step fill">
  <div class="stepper-step-inner">
      <div class="stepper-indicator">
        <span class="icon stepper-indicator-complete">check</span>
      </div>
    </div>
    <span class="stepper-label">Stage 1<br />Lorem ipsum...</span>
  </li>
  <li class="stepper-step current">
    <div class="stepper-step-inner">
      <div class="stepper-indicator">
        <span class="icon stepper-indicator-current">fiber_manual_record</span>
      </div>
    </div>
    <span class="stepper-label">Stage 2</span>
  </li>
  <li class="stepper-step inactive">
    <div class="stepper-step-inner">
      <div class="stepper-indicator"></div>
    </div>
    <span class="stepper-label">Stage 3</span>
  </li>
  <li class="stepper-step inactive">
    <div class="stepper-step-inner">
      <div class="stepper-indicator"></div>
    </div>
    <span class="stepper-label">Stage 4</span>
  </li>
  </ul></>
    )
}

export default  Stepper