import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doc, updateDoc } from "firebase/firestore";
import { useDocument, useDocumentData } from "react-firebase-hooks/firestore";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { BackNavigation } from "../../../components/backNavgation";
import { DetailsItem } from "../../../components/detailsItem";
import { Loader } from "../../../components/loader";
import { ScreenHeader } from "../../../components/screenHeader";
import { Status } from "../../../components/status";
import { useUserContext } from "../../../hooks/useUser";
import { db } from "../../../services/firebase";
import { triggerToast } from "../../../utils/triggerToast";

export const OrderDetailsComponent = () => {
  const { id } = useParams();
  const submissionRef = doc(db, "orders", id!);

  const { user } = useUserContext();
  const [value, loading, error] = useDocumentData(doc(db, "orders", id!));
  const navigate = useNavigate();
  const handleFulfill = async () => {
    try {
      await updateDoc(submissionRef, { status: "fulfilled" });

      triggerToast(
        "The order was fulfilled successfuly!",
        "success",
        <FontAwesomeIcon icon={faBolt} color="#83E933" />
      );
      navigate("/orders");
    } catch (e) {
      triggerToast("Some error occurred", "error", false);
    }
  };
  console.log("user", user);
  if (loading) return <Loader />;
  const renderViewCondition = () => {
    if (user?.role === "admin") {
      return (
        <button className="btn btn-primary w-full mb-5" onClick={handleFulfill}>
          Fulfill
        </button>
      );
    }

    return (
      <>
        <DetailsItem label="Status" />
        <Status status={value?.status} />
        <div className="mb-3" />
        {value?.rejectionMessage && (
          <DetailsItem
            label="Rejection message"
            text={value?.rejectionMessage}
          />
        )}
      </>
    );
  };
  return (
    <div>
      <BackNavigation />
      <ScreenHeader title="Prize Details" />
      <DetailsItem label="Prize name" text={value?.prizeName} />
      <DetailsItem
        label="Price"
        text={value?.price}
        icon={
          <FontAwesomeIcon icon={faBolt} color="#83E933" className="mr-2" />
        }
      />

      {renderViewCondition()}
    </div>
  );
};
