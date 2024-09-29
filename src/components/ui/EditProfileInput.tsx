import { Input } from "@/components/ui/input";

interface Props {
  label: string;
  placeholder: string;
  name: string;
  value?: string;
}

const EditProfileInput: React.FC<Props> = ({
  label,
  placeholder,
  name,
  value,
}) => {
  return (
    <label htmlFor="">
      <span className="text-xs text-gray">{label}</span>
      <Input
        name={name}
        placeholder={placeholder}
        type="text"
        className=" outline-none "
        value={value}
      />
    </label>
  );
};

export default EditProfileInput;
