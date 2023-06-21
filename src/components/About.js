import { Link } from "react-router-dom";

function About() {
  return (
    <div className="float-about-wrapper">
      <Link className="float-about" to="/about">
        {/* <img src="/about.svg" alt="about" /> */}
        <img className="float-about-spinner" src="/about.svg" alt="about" />
      </Link>
    </div>

    // <div className="horizontal-about-wrapper">
    //   <Link className="horizontal-about" to="/about">
    //     {/* <img src="/about.svg" alt="about" /> */}
    //     <p>
    //       About me &emsp; ✺ &emsp; About me &emsp; ✼ &emsp; About me &emsp; ✹
    //       &emsp; About me &emsp; ✤ &emsp; About me &emsp; ✶ &emsp; About me
    //       &emsp; ✦ &emsp; About me &emsp; ✧ &emsp;
    //     </p>
    //   </Link>
    // </div>
  );
}

export default About;
