import CustomAlert from "./Components/Constant/CustomAlert";

function NetworkController() {
  window.addEventListener("load", () => {
    // set correct status when app loads
    if (navigator.onLine) {
      CustomAlert("success", "Online");
    }
  });

  return <div></div>;
}

export default NetworkController;
