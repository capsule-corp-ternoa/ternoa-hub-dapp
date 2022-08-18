export interface IBaseTemplate {
  sampleTestProp: string
}

const BaseTemplate: React.FC<IBaseTemplate> = ({ sampleTestProp }) => {
  return (
    <div>{sampleTestProp}</div>
  )
}

export default BaseTemplate