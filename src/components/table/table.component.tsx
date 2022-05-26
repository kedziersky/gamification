export const TableComponent = () => {
  const renderItems = () => {
    return <div></div>;
  };
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th></th>
            <th>Activity</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>{renderItems()}</tbody>
      </table>
    </div>
  );
};
