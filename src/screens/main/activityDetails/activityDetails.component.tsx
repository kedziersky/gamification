import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAuth } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useUploadFile } from "react-firebase-hooks/storage";

import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BackNavigation } from "../../../components/backNavgation";
import { DetailsItemComponent } from "../../../components/detailsItem/detailsItem.component";
import { Loader } from "../../../components/loader";
import { ScreenHeader } from "../../../components/screenHeader";
import { useUserContext } from "../../../hooks/useUser";
import { db, storage } from "../../../services/firebase";
import { triggerToast } from "../../../utils/triggerToast";
import Compressor from "compressorjs";

export const ActivityDetailsComponent = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [value, loading, error] = useDocument(doc(db, "activities", id!));
  const submissionsRef = collection(db, "submissions");
  const [uploadFile, uploading, snapshot, errorUpload] = useUploadFile();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { currentUser } = getAuth();
  const activity = value?.data();

  const onSubmit = async (data: any) => {
    let url = null;
    try {
      /*  if (data.image) {
        const time = Date.now();
        const file = data.image[0];
        new Compressor(file, {
          quality: 0.8, // 0.6 can also be used, but its not recommended to go below.
          success: async (compressedResult) => {
            console.log(compressedResult);
            const storageRef = ref(storage, `submissions/${file.name}-${time}`);
            const result = await uploadFile(storageRef, compressedResult);
            if (result) {
              url = await getDownloadURL(result.ref);

              console.log("RESULT", { result, url });
            }
          },
        });
      } */
      await setDoc(doc(submissionsRef), {
        userName: currentUser?.displayName,
        userId: currentUser?.uid,
        solution: data.solution,
        attachment: url,
        status: "pending",
        activityId: id,
        date: Date.now(),
        ...activity,
      });

      triggerToast(
        "The submission was successful!",
        "success",
        <FontAwesomeIcon icon={faBolt} color="#83E933" />
      );

      navigate("/", { replace: true });
    } catch (e) {
      triggerToast("Some error occured during the submission.", "error", "😢");
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <BackNavigation />
      <ScreenHeader title="Activity Details" />
      <DetailsItemComponent label="Name" text={activity?.name} />
      <DetailsItemComponent label="Description" text={activity?.description} />
      <DetailsItemComponent label="Points" text={activity?.points} />

      <label htmlFor="my-modal-4" className="btn modal-button w-full">
        Submit activity
      </label>

      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative flex flex-col " htmlFor="">
          <h3 className="text-lg font-bold">
            Prove that you've done this activity!
          </h3>
          <p>
            Below provide your inputs on this activity. It can be an URL, a
            message explaining what you've done, etc..
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <textarea
              className="p-4 text-black mt-5 mb-5 resize-none w-full h-40"
              placeholder=""
              required
              {...register("solution", { required: true })}
            />
            <input
              type="file"
              accept="image/*"
              className="mb-5"
              {...register("image")}
            />
            <button className="btn w-full" type="submit">
              Submit
            </button>
          </form>
        </label>
      </label>
    </div>
  );
};
