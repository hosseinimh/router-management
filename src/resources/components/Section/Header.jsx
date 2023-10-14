import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { THEMES } from "../../../constants";
import {
  toggleSidebarAction,
  setThemeAction,
} from "../../../state/layout/layoutActions";

const Header = () => {
  const layoutState = useSelector((state) => state.layoutReducer);
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    dispatch(toggleSidebarAction());
  };

  const renderToggleTheme = () => (
    <div
      className={`item dark-toggle ${
        layoutState?.theme?.name === THEMES.LIGHT ? "active" : ""
      }`}
      onClick={toggleTheme}
    >
      <i className="icon-sun-1"></i>
    </div>
  );

  const toggleTheme = () => {
    if (layoutState?.theme?.name === THEMES.LIGHT) {
      dispatch(setThemeAction(THEMES.DARK));
    } else {
      dispatch(setThemeAction(THEMES.LIGHT));
    }
  };

  return (
    <div className="navbar d-flex align-center">
      <div className="menu-toggle" onClick={toggleSidebar}>
        <i className="icon-category4"></i>
      </div>
      <div className="navbar-actions">{renderToggleTheme()}</div>
    </div>
  );
};

export default Header;
