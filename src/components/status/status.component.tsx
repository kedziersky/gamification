export const StatusComponent = ({ status }: any) => {
  const renderStatus = () => {
    switch (status) {
      case "accepted":
        return "bg-success ";
      case "pending":
        return "bg-info ";
      case "rejected":
        return "bg-error ";
      case "fulfilled":
        return "bg-success ";
      default:
        return "bg-info ";
    }
  };
  return (
    <span
      className={`capitalize py-1 px-3 text-black rounded-full text-sm ${renderStatus()}`}
    >
      {status}
    </span>
  );
};
