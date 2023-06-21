import { Container, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useNavigate } from "react-router-dom";

function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="container-all text-pages">
      <Container className="about-page" maxWidth="md">
        <h1>About</h1>
        <p>
          <span>❓</span> Sometimes you want to go out and do something but you
          don´t know what <span> 🤷🏻‍♀️ </span>Sometimes you need someone else to
          decide for you <span> 🖥️ </span>This "someone" could be a website{" "}
          <span> 🤘 </span> You are on that website!
          <br />
          <br />
          <span> 👋🏻 </span> Hello! I´m{" "}
          <a
            className="what-the"
            href="https://www.linkedin.com/in/silvia-sarmiento-guizan/"
          >
            Silvia FlaRe
          </a>{" "}
          and I created this website to help you with this decisions.
          <br />
          <br />
          <h3>And why should you sign in?</h3>
          By signing in you can see all the activities and filter over them,
          save/like your favorite activities, and add activities to the
          database.
          <br />
          <br />
          {/* If you want to support me <a href="https://www.buymeacoffee.com/">Buy me a coffee</a> */}
        </p>

        {/*  <IconButton
          className="contact-icon"
          onClick={() =>
            navigate("https://www.linkedin.com/in/silvia-sarmiento-guizan/")
          }
        >
          <LinkedInIcon />
        </IconButton>

        <IconButton
          className="contact-icon"
          onClick={() => navigate("https://github.com/silviflare")}
        >
          <GitHubIcon />
        </IconButton> */}
      </Container>
    </div>
  );
}

export default AboutPage;
