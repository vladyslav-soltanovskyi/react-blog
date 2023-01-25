import SearchIcon from "@mui/icons-material/Search";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import SearchInput from "./SearchInput";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import useModal from "@/hooks/useModal";
import useAuth from "@/hooks/useAuth";

function Header() {
  const { openModal } = useModal();
  const { user, logOut } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisible = () => setIsVisible(!isVisible);

  const showConfirm = () => {
    const options = {
      title: "Do you really want to exit?",
      onConfirm: () => logOut(),
    };
    openModal({ type: "confirm", options });
  };

  return (
    <div className="header">
      <NavLink to="/" className="header-title">
        VLAD'S BLOG
      </NavLink>
      <div className="header-icons">
        <div className="header-icon">
          <Tooltip title="Search">
            <IconButton onClick={toggleVisible}>
              <SearchIcon />
            </IconButton>
          </Tooltip>
        </div>
        {!!user && (
          <div className="user-icons">
            <div className="header-icon">
              <NavLink to="/post/create">
                <Tooltip title="Create post">
                  <IconButton>
                    <EditOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </NavLink>
            </div>
            <div className="header-icon">
              <NavLink to={`/profile/${user?._id}`}>
                <Tooltip title="Profile">
                  <IconButton>
                    <PersonOutlineOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </NavLink>
            </div>
            <div className="header-icon">
              <Tooltip title="Exit">
                <IconButton onClick={showConfirm}>
                  <LogoutOutlinedIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        )}
      </div>
      <SearchInput active={isVisible} toggleActive={toggleVisible} />
    </div>
  );
}

export default Header;
