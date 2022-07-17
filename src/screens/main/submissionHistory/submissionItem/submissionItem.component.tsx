import { faCalendar, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

const options = {
  year: 'numeric',
  month: '2-digit',
  day: 'numeric',
} as const;

export const SubmissionItemComponent = ({ item, index, id }: any) => {
  const date = new Date(item.createdOnDate);
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/submissions/${id}`);
  };

  return (
    <tr onClick={handleNavigation}>
      <td>
        <div>
          <p className="font-bold overflow-hidden whitespace-nowrap text-ellipsis">{item.name}</p>
          <span className="flex items-center mt-2">
            <FontAwesomeIcon icon={faUser} className="mr-2" size="sm" />
            <p>{item.userName}</p>
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
