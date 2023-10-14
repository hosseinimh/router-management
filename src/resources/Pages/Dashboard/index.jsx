import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { BlankPage, RouterCard, TableCard, TableItems } from "../../components";
import { PageUtils } from "./PageUtils";
import { dashboardPage as strings } from "../../../constants/strings/fa";

const Dashboard = () => {
  const [routerCard, setRouterCard] = useState(null);
  const [routerCards, setRouterCards] = useState(null);
  const state = {
    layoutState: useSelector((state) => state.layoutReducer),
    pageState: useSelector((state) => state.pageReducer),
  };
  const pageUtils = new PageUtils(state);
  const columnsCount = 3;

  useEffect(() => {
    setRouterCards([
      { id: "card1", model: "model", slot: 1 },
      { id: "card2", model: "model", slot: 2 },
      { id: "card3", model: "model", slot: 3 },
      { id: "card4", model: "model", slot: 4 },
      { id: "card5", model: "model", slot: 5 },
    ]);
  }, []);

  const onShowRouterCard = (cardId) => {
    const card = routerCards?.find((card) => card.id === cardId);
    if (card) {
      setRouterCard(card);
    }
  };

  const onHideRouterCard = () => {
    setRouterCard(null);
  };

  const renderHeader = () => (
    <tr>
      <th style={{ width: "100px" }}>{strings.cardNo}</th>
      <th>{strings.model}</th>
      <th style={{ width: "100px" }}>{strings.slot}</th>
    </tr>
  );

  const renderItems = () => {
    let children = [
      <React.Fragment key={1}>
        <tr>
          <td>
            <div className="text">{routerCard?.id ?? "-"}</div>
          </td>
          <td>
            <div className="text">{routerCard?.model ?? "-"}</div>
          </td>
          <td>
            <div className="text">{routerCard?.slot ?? "-"}</div>
          </td>
        </tr>
      </React.Fragment>,
    ];
    return <TableItems columnsCount={columnsCount}>{children}</TableItems>;
  };

  const renderSharesInfo = () => {
    return (
      <>
        <div className="block pd-20 basis400 d-flex align-center">
          <div
            className="main-wallet d-flex-wrap align-start grow-1"
            style={{ gap: "2rem" }}
          >
            <div className="svg-container">
              <img
                className="router"
                src="/assets/images/DCS-7316.svg"
                alt=""
              />
              <div className="router-card-container">
                {routerCards?.map((routerCard, index) => (
                  <RouterCard
                    id={routerCard.id}
                    key={routerCard.id}
                    onMouseEnter={onShowRouterCard}
                    onMouseLeave={onHideRouterCard}
                  />
                ))}
              </div>
            </div>
            <div
              className="block pd-20 d-flex-wrap just-around align-center basis400 bg-dark"
              style={{ margin: 0 }}
            >
              <TableCard table={{ renderHeader, renderItems }} />
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <BlankPage pageUtils={pageUtils}>
      <div className="section d-flex-wrap fix-mr15">{renderSharesInfo()}</div>
    </BlankPage>
  );
};

export default Dashboard;
