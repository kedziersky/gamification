import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ActivityItemComponent = ({ item, handleClick }: any) => {
  return (
    <tr onClick={handleClick}>
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
