import { IRadio } from "./types"
import Text from '../Text'
import { IText } from "../Text/types"



const Radio: React.FC<IRadio> = ({ label, name, id, }) => {
  return (
    <div className="form-check">
      <input className="form-check-input appearance-none rounded-full h-s8 w-s20 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />

      <input
        id={id}
        type="radio"
        name={name}
        className={`form-check-input appearance-none rounded-full h-s20 w-s20 p-s4 border border-gray-300 bg-white-default checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-s4 align-top bg-no-repeat bg-center bg-contain float-left mr-s8 cursor-pointer`}
      />
      <label className="form-check-label inline-block text-gray-800" htmlFor={id}>
        Default radio
      </label>
      {/* <Text text={label} type={'p3'} weight={'medium'} color={'text-black-default'} /> */}
    </div>
  )
}

export default Radio