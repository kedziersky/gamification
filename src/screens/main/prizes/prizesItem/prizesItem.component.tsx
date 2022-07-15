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
      <td>{item.name}</td>
      <td>
        <span className="items-center">
          <FontAwesomeIcon icon={faBolt} color="#83E933" className="mr-2" />
          {item.price}
        </span>
      </td>
    </tr>
  );
};
