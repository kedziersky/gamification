import { faBolt, faCalendar, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const options = {
  year: 'numeric',
  month: '2-digit',
  day: 'numeric',
} as const;

export const LogsItemComponent = ({ item }: any) => {
  const date = new Date(item.createdOnDate);

  return (
    <tr>
      <td>
        <div>
          <p className="font-bold overflow-hidden whitespace-nowrap text-ellipsis">{item.action.name}</p>
          <span className="flex items-center mt-2">
            <FontAwesomeIcon icon={faBolt} color="#83E933" className="mr-2" />
            <p>{item.action.value}</p>
          </span>
          <span className="flex items-center">
            <FontAwesomeIcon icon={faUser} className="mr-2" size="sm" />
            <p>{item.user.userName}</p>
          </span>
          <span className="flex items-center">
            <FontAwesomeIcon icon={faCalendar} className="mr-2" size="sm" />
            <p>{date.toLocaleString('en', options)}</p>
          </span>
        </div>
      </td>
    </tr>
  );
};
