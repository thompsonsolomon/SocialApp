import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

export default function Notfound() {
  return (
    <div className="notFoundWrapper">
      <p>
        {" "}
        the page you are trying to reach is currently unavailable of not found
      </p>
      <div>
        <Link to="/feed">
          <Button> Go back Home</Button>
        </Link>

        <div>
          You sure where you are going? 👨‍🦯🤨
          fine then 
          <Button>Reload </Button>
        </div>
      </div>
    </div>
  );
}
