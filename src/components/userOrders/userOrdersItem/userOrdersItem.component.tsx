import { Status } from "../../status";

export const UserOrdersItemComponent = ({
  item,
  index,

  handleClick,
}: any) => {
  return (
    <tr onClick={handleClick}>
      <th>{index}</th>
      <td>{item.prizeName}</td>
      <td>
        <Status status={item.status} />
      </td>
    </tr>
  );
};
