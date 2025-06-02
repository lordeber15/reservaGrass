import logo from "../../assets/hacienda.png";
import style from "./navBar.module.css";
import { Link } from "react-router";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";

export default function NavBar() {
  const [admin, setAdmin] = useState(false);
  return (
    <div className={style.container}>
      <div className={style.containerLogo}>
        <img src={logo} className={style.logo} />
        <p className={style.title}>Grass Hacienda</p>
      </div>
      {admin == false ? (
        <div className={style.links}>
          <Link
            onClick={() => {
              setAdmin(true);
            }}
          >
            Iniciar Sesion
          </Link>
        </div>
      ) : (
        <div className={style.avatar}>
          <div className={style.links}>
            <Link>Reserva</Link>
            <Link>Venta</Link>
            <Link
              onClick={() => {
                setAdmin(false);
              }}
            >
              <Avatar>H</Avatar>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
