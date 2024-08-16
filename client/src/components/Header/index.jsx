// Purpose: Header component to render the header
import pokeCompanionSM from "../../assets/images/poke-companion-sm.png";
import pokeCompanionMD from "../../assets/images/poke-companion-md.png";
import Auth from "../../utils/auth";

export default function Header(props) {
  return <header>{props.children}</header>;
}
