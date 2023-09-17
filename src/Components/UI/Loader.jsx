import { CircularProgress, LinearProgress } from "@material-ui/core";
import "./Loader.css";

export const Elastic = () => {
  return (
    <div>
      <div className="col-3">
        <div className="snippet" data-title=".dot-elastic">
          <div className="stage">
            <div className="dot-elastic"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Pulse = () => {
  return (
    <div>
      <div className="col-3">
        <div className="snippet" data-title=".dot-pulse">
          <div className="stage">
            <div className="dot-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export const Flashing = () => {
  return (
    <div>
      <div className="col-3">
        <div className="snippet" data-title=".dot-flashing">
          <div className="stage">
            <div className="dot-flashing"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export const Collision = () => {
  return (
    <div>
      <div className="col-3">
        <div className="snippet" data-title=".dot-collision">
          <div className="stage">
            <div className="dot-collision"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export const Carousel = () => {
  return (
    <div>
      <div className="col-3">
        <div className="snippet" data-title=".dot-carousel">
          <div className="stage">
            <div className="dot-carousel"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export const Windmill = () => {
  return (
    <div>
      <div className="col-3">
        <div className="snippet" data-title=".dot-windmill">
          <div className="stage">
            <div className="dot-windmill"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export const Bricks = () => {
  return (
    <div>
      <LinearProgress />
    </div>
  );
};
export const Fire = () => {
  return (
    <div>
      <div className="col-3">
        <div className="snippet" data-title=".dot-fire">
          <div className="stage">
            <div className="dot-fire"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export const Spin = () => {
  return (
    <div>
      <CircularProgress />
    </div>
  );
};
export const Falling = () => {
  return (
    <div>
      <div className="col-3">
        <div className="snippet" data-title=".dot-falling">
          <div className="stage">
            <div className="dot-falling"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export const Stretching = () => {
  return (
    <div>
      <div className="col-3">
        <div className="snippet" data-title=".dot-stretching">
          <div className="stage">
            <div className="dot-stretching"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export const Gathering = () => {
  return (
    <div>
      {/* <div className="col-3">
        <div className="snippet" data-title=".dot-gathering">
          <div className="stage filter-contrast">
            <div className="dot-gathering"></div>
          </div>
        </div>
      </div> */}

<LinearProgress />


    </div>
  );
};
export const Shuttle = () => {
  return (
    <div>
      {/* <div className="col-3">
        <div className="snippet" data-title=".dot-shuttle">
          <div className="stage filter-contrast">
            <div className="dot-shuttle"></div>
          </div>
        </div>
      </div> */}
            <CircularProgress />
    </div>
  );
};
