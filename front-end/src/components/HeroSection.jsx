function HeroSection() {
  return (
    <div className="hero__section">
      <div className="hero__section--title">
        <h1>Save when you</h1>
        <h1>
          send worldwide<span className="blue_dot">.</span>
        </h1>
      </div>

      <div className="hero__section--subtitle">
        <span>Get your money moving internationally. Save up to 3.9x</span>
        <span>when you send with Wise.</span>
      </div>

      <div className="hero__section--btn">
        <button className="hero__section--btn--send">Send money now</button>
        <button className="hero__section--btn--open">Open an account</button>
      </div>
    </div>
  );
}

export default HeroSection;
