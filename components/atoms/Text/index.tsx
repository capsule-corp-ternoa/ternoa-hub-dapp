import { IText, TextFontWeightType } from "./types";

const getSize = (type: string) => {
  switch (type) {
    case "p1":
      return "text-fs16 md:text-fs20 break-words";
    case "p2":
      return "text-fs14 md:text-fs18 break-words";
    case "p3":
      return "text-fs14 md:text-fs16 break-words";
    case "p4":
      return "text-fs12 md:text-fs14 break-words";
    default:
      return "text-fs12 break-words";
  }
};

const getWeight = (weight: TextFontWeightType) => {
  switch (weight) {
    case "light":
      return "font-AirbnbCerealLight";
    case "medium":
      return "font-AirbnbCerealMedium";
    case "bold":
      return "font-AirbnbCerealBold";
  }
};

const Text: React.FC<IText> = ({
  text,
  type,
  weight,
  color,
  className = "",
}) => {
  switch (type) {
    case "h1":
      return (
        <h1 className={`text-fs30 md:text-fs64 break-words ${getWeight(weight)} ${color} ${className}`}>
          {text}
        </h1>
      );
    case "h2":
      return (
        <h2 className={`text-fs48 break-words ${getWeight(weight)} ${color} ${className}`}>
          {text}
        </h2>
      );
    case "h3":
      return (
        <h3
          className={`text-fs24 md:text-fs36 break-words ${getWeight(
            weight
          )} ${color} ${className}`}
        >
          {text}
        </h3>
      );
    case "h4":
      return (
        <h4 className={`text-fs18 md:text-fs30 break-words ${getWeight(weight)} ${color} ${className}`}>
          {text}
        </h4>
      );
    case "h5":
      return (
        <h5 className={`text-fs18 md:text-fs24 break-words ${getWeight(weight)} ${color} ${className}`}>
          {text}
        </h5>
      );
    case "label":
      return (
        <label
          className={`text-fs14 break-words ${getWeight(weight)} ${color} ${className}`}
        >
          {text}
        </label>
      );
    default:
      return (
        <p
          className={`${getSize(type)} ${getWeight(
            weight
          )} ${color} ${className}`}
        >
          {text}
        </p>
      );
  }
};

export default Text;
