import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

export const ActivityItemComponent = ({
  item,
  index,
  id,
  handleClick,
}: any) => {
  const date = new Date(item.date);

  return (
    <tr onClick={handleClick}>
      <th>{index}</th>
      <td>{item.name}</td>
      <td>
        <span className="items-center">
          <FontAwesomeIcon icon={faBolt} color="#83E933" className="mr-2" />
          {item.points}
        </span>
      </td>
    </tr>
  );
};
