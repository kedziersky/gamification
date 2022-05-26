import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const LeaderboardItemComponent = ({ item, index, id }: any) => {
  return (
    <tr>
      <th>{index}</th>
      <td>{item.userName}</td>
      <td>
        <span className="items-center">
          <FontAwesomeIcon icon={faBolt} color="#83E933" className="mr-2" />
          {item.totalPoints}
        </span>
      </td>
    </tr>
  );
};
