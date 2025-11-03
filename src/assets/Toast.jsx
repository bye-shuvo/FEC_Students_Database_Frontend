import React, { useEffect, useRef, useState } from "react";

const Toast = ({ type, message , top , left ,bottom , right }) => {
  const [delay, setDelay] = useState(100);
  const timerRef = useRef(null);

  const position = {
    top : top ? top : null ,
    left : left ? left : null ,
    bottom : bottom ? bottom : null ,
    right : right ? right : null
  }
  useEffect(() => {
    const timer = () => {
      setDelay((prev) => {
        if (prev <= 0) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 2;
      });
    };
    timerRef.current = setInterval(timer, 50);
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);
  return (
    <>
      <div
        style={{
          top: position.top ,
          left: position.left ,
          bottom: position.bottom ,
          right: position.right ,
        }}
        className={`fixed z-100 text-white backdrop-blur-2xl bg-[#2D425C]/50 p-4 pt-3 pb-3 rounded-sm`}
      >
        <p
          className={`${
            type === "general"
              ? "bg-sky-500"
              : type === "confirmation"
              ? "bg-green-500"
              : type === "Error"
              ? "bg-red-500"
              : "bg-yellow-500"
          } absolute h-full w-2 left-0 top-0 rounded-bl-sm rounded-tl-sm`}
        ></p>
        <span className="flex h-full w-full justify-center items-end">
          <p className="text-md font-semibold z-10">{message}</p>
        </span>
        <p
          id="progress-bar"
          className={`${
            type === "general"
              ? "bg-sky-500/50"
              : type === "confirmation"
              ? "bg-green-500/50"
              : type === "Error"
              ? "bg-red-500/50"
              : "bg-yellow-500/50"
          } absolute h-full w-full left-0 bottom-0 transition-all ease-linear duration-100`}
          style={{ width: `${String(delay)}%` }}
        ></p>
      </div>
    </>
  );
};

export default Toast;
