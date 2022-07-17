import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ActivityItemComponent = ({ item, handleClick }: any) => {
  return (
    <tr onClick={handleClick}>
      <td>
        <div>
          <p className="font-bold overflow-hidden whitespace-nowrap text-ellipsis">{item.name}</p>
          <span className="flex items-center mt-1">
            <FontAwesomeIcon icon={faBolt} color="#83E933" className="mr-2" />
            <p>{item.points}</p>
          </span>
        </div>
      </td>
    </tr>
  );
};
