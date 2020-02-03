import React, { useState, useEffect } from "react";
import {Button } from "antd";
const SendCode=()=>{
    const [count, setCount] = useState(60);
    return (
      <div>
        {count == 60 ? (
          <Button onClick={sendcode}>发送验证码</Button>
        ) : (
          <div>{count}s</div>
        )}
      </div>
    );
}
export default SendCode;