export const DetailsItemComponent = ({
  label,
  text,
  attachmentURL,
  icon,
}: any) => {
  const renderCondition = () => {
    if (text) {
      return <p>{text}</p>;
    }
    if (attachmentURL) {
      return <img className="rounded-lg mb-4 w-full" src={attachmentURL} />;
    }
  };
  return (
    <div className="mb-3">
      <h3 className="text-lg font-bold">{label}</h3>
      <div className="flex items-center">
        {icon && icon}
        {renderCondition()}
      </div>
    </div>
  );
};
