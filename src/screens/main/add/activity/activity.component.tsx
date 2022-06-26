import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { collection, doc, setDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { BackNavigation } from "../../../../components/backNavgation";
import { ScreenHeader } from "../../../../components/screenHeader";
import { db } from "../../../../services/firebase";
import { triggerToast } from "../../../../utils/triggerToast";

export const AddActivityComponent = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const watchIsLimited = watch("isLimitedActivity", false);

  const submissionsRef = collection(db, "activities");

  const onSubmit = async (data: any) => {
    data.points = parseInt(data.points);
    try {
      await setDoc(doc(submissionsRef), {
        createdDate: Date.now(),
        ...data,
      });
      triggerToast(
        "You've added the activity successfuly!",
        "success",
        <FontAwesomeIcon icon={faBolt} color="#83E933" />
      );
      reset();
    } catch (e) {
      console.log(e);
      triggerToast("Some error occured during the submission.", "error", "😢");
    }
  };

  const renderLimit = () => {
    if (watchIsLimited) {
      return (
        <>
          <label className="label">
            <span className="label-text">
              How many times the activity can be submitted?
            </span>
          </label>
          <input
            type="number"
            placeholder="Type here"
            className="input input-bordered w-full mb-5"
            {...register("submissionLimit", { required: watchIsLimited })}
          />
        </>
      );
    }
  };

  return (
    <div>
      <BackNavigation />
      <ScreenHeader title="Add Activity" />
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
            <span className="label-text">Description</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
            {...register("description", { required: true })}
          />
          <label className="label">
            <span className="label-text">Points</span>
          </label>
          <input
            type="number"
            placeholder="Type here"
            className="input input-bordered w-full"
            {...register("points", { required: true })}
          />
          <label className="label">
            <span className="label-text">Is a limited activity?</span>
          </label>
          <input
            type="checkbox"
            className="toggle toggle-primary mb-5"
            {...register("isLimitedActivity")}
          />
          {renderLimit()}
          <button className="btn">Submit</button>
        </form>
      </div>
    </div>
  );
};
