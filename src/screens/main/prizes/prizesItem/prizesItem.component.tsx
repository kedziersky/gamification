import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
export const PrizesItemComponent = ({ item, index, id }: any) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/prizes/${id}`);
  };

  return (
    <tr onClick={handleNavigation}>
      <td>
        <div>
          <p className="font-bold overflow-hidden whitespace-nowrap text-ellipsis">{item.name}</p>
          <span className="flex items-center mt-1">
            <FontAwesomeIcon icon={faBolt} color="#83E933" className="mr-2" size="sm" />
            <p>{item.price}</p>
          </span>
        </div>
      </td>
    </tr>
  );
};
