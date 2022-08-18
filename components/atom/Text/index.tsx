import { IText, TextFontWeightType } from "./types"

const getSize = (type: string) => {
  switch (type) {
    case 'p1':
      return "text-fs20"
    case 'p2':
      return "text-fs18"
    case 'p3':
      return "text-fs16"
    case 'p4':
      return "text-fs14"
    default:
      return "text-fs12"
  }
}

const getWeight = (weight: TextFontWeightType) => {
  switch (weight) {
    case 'light':
      return "font-AirbnbCerealLight"
    case 'medium':
      return "font-AirbnbCerealMedium"
    case 'bold':
      return "font-AirbnbCerealBold"
    default:
      return "font-AirbnbCerealMedium"
  }
}

const Text: React.FC<IText> = ({ text, type, weight, color }) => {

  switch (type) {
    case 'h1':
      return <h1 className={`text-fs64 ${getWeight(weight)} ${color}`}>{text}</h1>
    case 'h2':
      return <h2 className={`text-fs48 ${getWeight(weight)} ${color}`}>{text}</h2>
    case 'h3':
      return <h3 className={`text-fs36 ${getWeight(weight)} ${color}`}>{text}</h3>
    case 'h4':
      return <h4 className={`text-fs30 ${getWeight(weight)} ${color}`}>{text}</h4>
    case 'h5':
      return <h5 className={`text-fs24 ${getWeight(weight)} ${color}`}>{text}</h5>
    default:
      return <p className={`${getSize(type)} ${getWeight(weight)} ${color}`}>{text}</p>
  }
}

export default Text