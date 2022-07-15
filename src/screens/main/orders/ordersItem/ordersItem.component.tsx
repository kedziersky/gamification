import { useNavigate } from 'react-router-dom';

export const OrdersItemComponent = ({ item, index, id }: any) => {
  const date = new Date(item.createdOnDate);
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/orders/${id}`);
  };

  return (
    <tr onClick={handleNavigation}>
      <td>{item.prizeName}</td>
      <td>{item.userName}</td>
      <td>{date.toLocaleString()}</td>
    </tr>
  );
};
