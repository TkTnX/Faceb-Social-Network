import { navbarItems } from "@/constants";
import NavbarItem from "./NavbarItem";

const Navbar = () => {
  return (
    <div className="flex items-center gap-10">
      {navbarItems.map((item, index) => (
        <NavbarItem key={index} name={item.name} href={item.href} />
      ))}
    </div>
  );
};

export default Navbar;
