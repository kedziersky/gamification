import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

export const BackNavigationComponent = () => {
  const navigate = useNavigate();

  const handleBackNavigation = () => {
    navigate(-1);
  };
  return (
    <button onClick={handleBackNavigation} className="mb-3">
      <FontAwesomeIcon icon={faArrowLeft} />
      <span className="ml-2">Back</span>
    </button>
  );
};
