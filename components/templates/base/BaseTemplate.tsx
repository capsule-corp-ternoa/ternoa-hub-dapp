import styles from './BaseTemplate.module.css';

export interface IBaseTemplate {
  sampleTestProp: string
}

const BaseTemplate: React.FC<IBaseTemplate> = ({ sampleTestProp }) => {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500">
      <p className="text-red-500">{sampleTestProp}</p>
    </div>
  )
}

export default BaseTemplate