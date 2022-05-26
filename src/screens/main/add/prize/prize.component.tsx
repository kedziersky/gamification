import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { collection, doc, setDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { BackNavigation } from "../../../../components/backNavgation";
import { ScreenHeader } from "../../../../components/screenHeader";
import { db } from "../../../../services/firebase";
import { triggerToast } from "../../../../utils/triggerToast";

export const AddPrizeComponent = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const submissionsRef = collection(db, "prizes");

  const onSubmit = async (data: any) => {
    console.log(data);
    delete data.attachment;
    try {
      await setDoc(doc(submissionsRef), {
        date: Date.now(),
        ...data,
      });
      triggerToast(
        "You've added the prize successfuly!",
        "success",
        <FontAwesomeIcon icon={faBolt} color="#83E933" />
      );
      reset();
    } catch (e) {
      console.log(e);
      triggerToast("Some error occured during the submission.", "error", "😢");
    }
  };

  return (
    <div>
      <BackNavigation />
      <ScreenHeader title="Add Prize" />
      <div className="form-control w-full">
        <form className="form-control" onSubmit={handleSubmit(onSubmit)}>
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full "
            {...register("name", { required: true })}
          />
          <label className="label">
            <span className="label-text">Price</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
            {...register("price", { required: true })}
          />
          <label className="label">
            <span className="label-text">Image</span>
          </label>
          <input
            type="file"
            accept="image/*"
            className="w-full"
            {...register("attachment")}
          />
          <label className="label">
            <span className="label-text">Is is already available?</span>
          </label>
          <input
            type="checkbox"
            checked
            className="toggle toggle-primary mb-5"
            {...register("isAvailable")}
          />
          <button className="btn">Submit</button>
        </form>
      </div>
    </div>
  );
};
