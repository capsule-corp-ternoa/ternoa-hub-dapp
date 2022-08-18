import { IRadio } from "./types"
import Text from '../Text'
import { IText } from "../Text/types"



const Radio: React.FC<IRadio> = ({ label, name, id }) => {
  return (
    <div className="form-check">
      <input
        id={id}
        type="radio"
        name={name}
        className={`form-check-input appearance-none rounded-full h-s20 w-s20 p-s4 border border-gray-800 checked:border-4 bg-white-default checked:border-gray-800 focus:outline-none transition duration-200 mt-s2 align-top bg-no-repeat bg-center float-left mr-s8 cursor-pointer`}
      />
      <Text text={label} type="label" weight="medium" />
    </div>
  )
}

export default Radio