import React, { useState, useEffect } from "react";
import styles from "../../static/css/components.module.css";
import { Spin, Icon } from "antd";

const Loading = ({ root = "body", getData, page, pageAll }) => {
  console.log("root: ", root);
  const [show, showset] = useState(false);
  let getbottom = () => {
    let scroll =
      document.documentElement.scrollTop ||
      window.pageYOffset ||
      document.body.scrollTop;
    let move =
      document.body.scrollHeight -
      scroll -
      document.documentElement.clientHeight;
    return move;
  };
  let scrollthing = () => {
    let move = getbottom();
    if (move < 100) {
      console.log(pageAll, 1213);
      showset(true);
      if (page < pageAll) {
        console.log(page);
        let nextpage = page + 1;
        getData(nextpage);
      } else {
      }
    } else {
      showset(false);
    }
    // if (move == 0) {
    //   if (page) {
    //     let a = page + 1;
    //     getData(a);
    //   }
    // } else if (move <= 100 && hasdata == false) {
    //   hasset(true);
    // } else if (hasdata == true && move > 100) {
    //   hasset(false);
    // }
  };
  useEffect(() => {
    window.addEventListener("scroll", scrollthing);
    return () => {
      window.removeEventListener("scroll", scrollthing);
    };
  });
  const antIcon = <Icon type="loading" style={{ fontSize: 30 }} spin />;
  return (
    <div className={styles.Loading}>
      {show ? (
        <React.Fragment>
          {page < pageAll ? (
            <div className={styles.dhbox}>
              <Spin indicator={antIcon} />
            </div>
          ) : (
            <div style={{ textAlign: "center", fontSize: "18px" }}>
              没有更多了
            </div>
          )}
        </React.Fragment>
      ) : (
        ""
      )}
    </div>
  );
};

export default Loading;
