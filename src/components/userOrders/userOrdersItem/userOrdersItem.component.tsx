import { Status } from '../../status';

export const UserOrdersItemComponent = ({ item, handleClick }: any) => {
  return (
    <tr onClick={handleClick}>
      <td>
        <div>
          <p className="font-bold overflow-hidden whitespace-nowrap text-ellipsis mb-2">{item.prizeName}</p>
          <span className="flex items-center">
            <p className="mr-2">Status</p>
            <Status status={item.status} />
          </span>
        </div>
      </td>
    </tr>
  );
};
