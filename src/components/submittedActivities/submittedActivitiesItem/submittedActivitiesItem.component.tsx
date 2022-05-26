import { Status } from "../../status";

export const SubmittedActivitiesItemComponent = ({
  item,
  index,
  id,
  handleClick,
}: any) => {
  return (
    <tr onClick={handleClick}>
      <th>{index}</th>
      <td>{item.name}</td>
      <td>
        <Status status={item.status} />
      </td>
    </tr>
  );
};
