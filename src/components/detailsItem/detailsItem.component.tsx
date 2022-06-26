import Linkify from "react-linkify";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export const DetailsItemComponent = ({
  label,
  text,
  attachmentURL,
  icon,
  className,
}: any) => {
  const renderCondition = () => {
    if (text) {
      return (
        <Linkify
          componentDecorator={(decoratedHref, decoratedText, key) => (
            <a
              target="blank"
              href={decoratedHref}
              key={key}
              className="text-accent"
            >
              {decoratedText}
            </a>
          )}
        >
          <p>{text}</p>
        </Linkify>
      );
    }
    if (attachmentURL) {
      return (
        <Zoom>
          <img className="rounded-lg mb-4 w-24" src={attachmentURL} />
        </Zoom>
      );
    }
  };
  return (
    <div className={`mb-3 ${className}`}>
      <h3 className="text-lg font-bold">{label}</h3>
      <div className="flex items-center">
        {icon && icon}
        {renderCondition()}
      </div>
    </div>
  );
};
