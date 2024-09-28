import { Input } from "./ui/input";

interface Props {
    label: string;
    placeholder: string;
    name: string;
}

const EditProfileInput: React.FC<Props> = ({label, placeholder, name}) => {
  return (
    <label htmlFor="">
          <span className="text-xs text-gray">{label}</span>
      <Input name={name} placeholder={placeholder} type="text" className=" outline-none " />
    </label>
  );
}

export default EditProfileInput