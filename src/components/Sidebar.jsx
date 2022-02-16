import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import { convertDate } from "@/utils";
import useAuth from "@/hooks/useAuth";
import useModal from "@/hooks/useModal";

function Sidebar() {
  const { openModal } = useModal();
  const { user, logOut } = useAuth();
  const [visibleSidebar, setVisibleSidebar] = useState(false);

  const hideSidebar = () => setVisibleSidebar(false);

  const toggleSidebar = () => setVisibleSidebar(!visibleSidebar);

  const showConfirm = () => {
    const options = {
      title: "Вы действительно хотите выйти?",
      onConfirm: () => logOut(),
    };
    openModal({ type: "confirm", options });
  };

  const routes = [
    {
      title: "Главная",
      path: "/",
      onClick: hideSidebar,
    },
    {
      title: "Мой профиль",
      path: `/profile/${user?._id}`,
      isAuth: true,
      onClick: hideSidebar,
    },
    {
      title: "Создать запись",
      path: "/post/create",
      isAuth: true,
      onClick: hideSidebar,
    },
    {
      title: "Выйти",
      isAuth: true,
      onClick: () => {
        hideSidebar();
        showConfirm();
      },
    },
    {
      title: "Войти",
      isAuth: false,
      onClick: () => {
        hideSidebar();
        openModal({ type: "login" });
      },
    },
    {
      title: "Регистрация",
      isAuth: false,
      onClick: () => {
        hideSidebar();
        openModal({ type: "registration" });
      },
    },
  ];

  return (
    <div className="sidebar">
      <div
        className={classNames("sidebar-content", {
          active: visibleSidebar,
        })}
      >
        {!!user && (
          <div className="sidebar-header">
            <div className="sidebar-title">{user.fullName}</div>
            <div className="sidebar-date">
              Дата регистрации: {convertDate(user.createdAt)}
            </div>
          </div>
        )}

        <nav className="menu">
          {routes.map((link) => {
            return link.isAuth === undefined || !!user === link.isAuth ? (
              <li key={link.title} className="menu-link" onClick={link.onClick}>
                {link.path ? (
                  <NavLink to={link.path}>{link.title}</NavLink>
                ) : (
                  <span>{link.title}</span>
                )}
              </li>
            ) : null;
          })}
        </nav>

        <div className="menu-block">
          <div className="menu-btn" onClick={toggleSidebar}>
            <IconButton>
              <CloseIcon sx={{ color: "#fff" }} />
            </IconButton>
            <span className="menu-btn-text">Меню</span>
          </div>
        </div>
      </div>
      <div className="menu-block">
        <div className="menu-btn" onClick={toggleSidebar}>
          <div className="menu-btn-text">Меню</div>
          <IconButton>
            <MenuIcon sx={{ color: "#fff" }} />
          </IconButton>
        </div>
      </div>
      <div
        className={classNames("sidebar-overlay", {
          active: visibleSidebar,
        })}
        onClick={toggleSidebar}
      ></div>
    </div>
  );
}

export default Sidebar;
