import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { BASE_PATH, IMAGES_PATH, THEMES } from "../../../constants";
import { sidebar as strings } from "../../../constants/strings/fa";
import { toggleSidebarAction } from "../../../state/layout/layoutActions";

const menuItems = {
  DASHBOARD: {
    page: "Dashboard",
    path: BASE_PATH,
    icon: "icon-category4",
    label: strings.dashboard,
  },
};

function Sidebar() {
  const dispatch = useDispatch();
  const layoutState = useSelector((state) => state.layoutReducer);
  const pageState = useSelector((state) => state.pageReducer);

  const toggleSidebar = () => {
    dispatch(toggleSidebarAction());
  };

  const renderMenuItem = (menuItem, badge = 0) => {
    const active = menuItem.page === pageState?.page;
    return (
      <li className={`${active ? "active" : ""}`}>
        <Link to={menuItem.path}>
          <i className={menuItem.icon}></i>
          <span>{menuItem.label}</span>
          {badge > 0 && (
            <div
              className="dot"
              style={{
                display: "inline",
                position: "relative",
                right: "-40px",
                top: "2px",
              }}
            >
              <span className="bg-success"></span>
            </div>
          )}
        </Link>
      </li>
    );
  };

  const renderMainItems = () => (
    <>
      <div className="menu-title">{strings.mainItems}</div>
      <ul>{renderMenuItem(menuItems.DASHBOARD)}</ul>
    </>
  );

  return (
    <div className={`sidebar ${layoutState?.sidebarCollapsed ? "active" : ""}`}>
      <div className="sidebar-hd d-flex align-start just-between">
        <div className="logo">
          <img
            className="logo-large dark-logo"
            src={`${
              layoutState?.theme?.name === THEMES.DARK
                ? `${IMAGES_PATH}/logo-dark.png`
                : `${IMAGES_PATH}/logo-light.png`
            }`}
            alt=""
          />
          <img className="logo-sm" src={`${IMAGES_PATH}/logo-sm.png`} alt="" />
        </div>
        <div className="closemenu" onClick={toggleSidebar}>
          <i className="icon-arrow-right"></i>
        </div>
      </div>
      <div className="menu scrollhide">{renderMainItems()}</div>
    </div>
  );
}

export default Sidebar;
