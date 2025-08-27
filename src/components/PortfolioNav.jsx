import { Navlink } from "react-router-dom";
export default function Navigation() {
  return (
    <div>
      <ul>
        <li>
          <Navlink to="">Home</Navlink>
        </li>
        <li>
          <Navlink to="">About</Navlink>
        </li>
        <li>
          <Navlink to="">Projects</Navlink>
        </li>
        <li>
          <Navlink to="">Skills</Navlink>
        </li>
        <li>
          <Navlink to="">Testimonials</Navlink>
        </li>
        <li>
          <Navlink to="">Contact</Navlink>
        </li>
      </ul>
    </div>
  );
}
