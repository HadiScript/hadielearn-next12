import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Redirecting = ({ path = "/" }) => {
  const [count, setCount] = useState(3);
  let router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // redirect once count is equal to 0
    count === 0 && router.push(path);
    // cleanup
    return () => clearInterval(interval);
  }, [count]);

  return <>Loading... - {count} second</>;
};

export default Redirecting;
