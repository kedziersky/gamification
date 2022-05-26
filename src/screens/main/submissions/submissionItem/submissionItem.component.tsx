import { useNavigate } from "react-router-dom";

export const SubmissionItemComponent = ({ item, index, id }: any) => {
  const date = new Date(item.date);
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/submissions/${id}`);
  };

  return (
    <tr onClick={handleNavigation}>
      <th>{index}</th>
      <td>{item.name}</td>
      <td>{item.userName}</td>
      <td>{date.toLocaleString()}</td>
    </tr>
  );
};
