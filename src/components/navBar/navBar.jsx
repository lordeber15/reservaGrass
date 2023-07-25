import logo from "../../assets/hacienda.png";
import style from "./navBar.module.css";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

export default function NavBar() {
  return (
    <nav className={style.container}>
      <div className={style.containerLogo}>
        <img src={logo} className={style.logo} />
        <p className={style.title}>Grass Hacienda</p>
      </div>
      <div className={style.avatar}>
        <div className={style.links}>
          <Link>Reserva</Link>
          <Link>Venta</Link>
          <Link>
            <Avatar>H</Avatar>
          </Link>
        </div>
      </div>
    </nav>
  );
}
