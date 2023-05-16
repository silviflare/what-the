import { useCallback, useState } from "react";
import axios from "axios";
import { API_URL } from "../config/config";
import Balancer from "react-wrap-balancer";

// Material UI
import { Collapse, IconButton } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Filters from "./Filters";

function RandomActivity() {
  const [oneActivity, setActivity] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({});

  const onFilterChange = useCallback((filterValues) => {
    console.log("Filter valuessssssssssssss", filterValues);
    setFilters(filterValues);
  }, []);

  const getRandomActivity = () => {
    axios
      .get(`${API_URL}/api/random-activity`, { params: filters })
      .then((response) => {
        const oneActivity = response.data;
        setActivity(oneActivity);
      })
      .catch((err) => console.log(err));
  };

  /*   useEffect(() => {
    axios.get(`/api/random-activity`).then((response) => {
      setActivity(response.data);
    });
  }, []); */

  return (
    <div className="randonizer-container">
      <button className="randonizer-button" onClick={getRandomActivity}>
        <p>What the f*** should I do today?</p>
      </button>
      <div cclassName="randonizer-open-collapse">
        <IconButton
          className="randonizer-open-collapse"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </div>
      <Collapse in={isOpen}>
        <Filters onChange={onFilterChange} />
      </Collapse>

      <div className="randonizer-container-headline">
        {oneActivity && (
          <div className="randonizer-headline">
            <Balancer ratio={0.6}>{oneActivity.description}</Balancer>
          </div>
        )}
      </div>
    </div>
  );
}

export default RandomActivity;
