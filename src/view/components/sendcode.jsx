import React, { useState } from "react";
import {Button } from "antd";
const SendCode=()=>{
    const [count, setCount] = useState(60); 
    const sendcode = ()=>{
      let num = count;
      let countdown = setInterval(() => {
        num = num-1;
        if (num == 0) {
          clearInterval(countdown);
          setCount(60);
        } else {
          setCount(num - 1);
        }       
      }, 1000);
    };
    return (
      <div style={{ width: "102px", textAlign: "center" }}>
        {count == 60 ? (
          <Button onClick={sendcode}>发送验证码</Button>
        ) : (
          <div style={{ color: "#40a9ff" }}>{count}s</div>
        )}
      </div>
    );
}
export default SendCode;