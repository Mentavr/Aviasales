import logo from "@/assets/imgs/Logo.png";
import cls from "./style.module.scss";
import clsx from "clsx";

export const Header = () => {
  return (
    <header className={cls.header}>
      <div className={clsx(cls.container, cls.header__imgWrapper)}>
        <img className={cls.img} src={logo} alt="логотип" />
      </div>
    </header>
  );
};
