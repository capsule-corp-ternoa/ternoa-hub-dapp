export interface ICard {
  sampleTestProp: string
}

const Card: React.FC<ICard> = ({ sampleTestProp }) => {
  return (
    <div>{sampleTestProp}</div>
  )
}

export default Card