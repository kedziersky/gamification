import { faBagShopping, faBolt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doc } from "firebase/firestore";
import { isEmpty } from "ramda";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "../../services/firebase";
import { Loader } from "../loader";

export const PointsHeaderComponent = ({
  uid,
  onlyAvailable,
  onlyTotalPoints,
}: any) => {
  const [value, loading] = useDocumentData(doc(db, "users", uid));

  if (loading && !isEmpty(value)) return <Loader />;
  const { totalPoints, availablePoints, role } = value!;

  const renderContainer = () => {
    if (role === "admin") {
      return <p className="text-primary">You're an admin!</p>;
    }
    if (onlyAvailable) {
      return (
        <>
          <FontAwesomeIcon
            icon={faBagShopping}
            color="#83E933"
            className=" mr-2"
          />
          <p>{availablePoints}</p>
        </>
      );
    }
    if (onlyTotalPoints) {
      return (
        <>
          <FontAwesomeIcon icon={faBolt} color="#83E933" className="mr-2" />
          <p className="mr-4">{totalPoints}</p>
        </>
      );
    }
    return (
      <>
        <FontAwesomeIcon icon={faBolt} color="#83E933" className="mr-2" />
        <p className="mr-4">{totalPoints}</p>
        <FontAwesomeIcon
          icon={faBagShopping}
          color="#83E933"
          className=" mr-2"
        />
        <p>{availablePoints}</p>
      </>
    );
  };

  return <div className="flex items-center mb-3">{renderContainer()}</div>;
};
