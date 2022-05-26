import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import { useDocument, useDocumentData } from "react-firebase-hooks/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { BackNavigation } from "../../../components/backNavgation";
import { DetailsItem } from "../../../components/detailsItem";
import { Loader } from "../../../components/loader";
import { ScreenHeader } from "../../../components/screenHeader";
import { db } from "../../../services/firebase";
import { triggerToast } from "../../../utils/triggerToast";

export const PrizeDetailsComponent = () => {
  const { id } = useParams();
  const prizesRef = doc(db, "prizes", id!);
  const { currentUser } = getAuth();
  const usersRef = doc(db, "users", currentUser!.uid);
  const ordersRef = doc(collection(db, "orders"));
  const [value, loading, error] = useDocumentData(prizesRef);
  const [user, userLoading, userError] = useDocumentData(usersRef);

  const navigate = useNavigate();

  const handleAccept = async () => {
    setDoc(ordersRef, {
      prizeId: id,
      prizeName: value?.name,
      price: value?.price,
      status: "pending",
      userId: currentUser?.uid,
      userName: currentUser?.displayName,
      orderDate: Date.now(),
    });
    triggerToast(
      "The order was successful!",
      "success",
      <FontAwesomeIcon icon={faBolt} color="#83E933" />
    );
    navigate("/prizes", { replace: true });
  };

  const renderOrderCondition = () => {
    if (user?.availablePoints < value?.price) {
      return (
        <p className="text-error">
          You don't have enough points to order this prize
        </p>
      );
    }
    return (
      <button className="btn btn-primary w-full mt-3" onClick={handleAccept}>
        Order
      </button>
    );
  };

  if (loading) return <Loader />;
  return (
    <div>
      <BackNavigation />
      <ScreenHeader title="Prize details" />
      <DetailsItem label="Name" text={value?.name} />
      <DetailsItem label="Price" text={value?.price} />
      <DetailsItem
        label="Photo"
        attachmentURL={"https://www.pcworld.pl/g1/news/thumb/3/8/383606"}
      />

      {renderOrderCondition()}
    </div>
  );
};
