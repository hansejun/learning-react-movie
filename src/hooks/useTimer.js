// start 를 실행하면 callback 이라는 파라미터로 넘겨 준 함수를 timeout 밀리초 마다 실행하고,
// stop 을 실행하면 멈춘다.
// setInterval 이란 함수는 웹 브라우저에 함수를 등록해서 일정한 시간 간격마다 실행한다.
// 실행할 때마다 사이드 이펙트를 만들고, 사용하지 않으면 정리를 해줘야 한다.
// clearInterval 이라는 함수를 실행해서 사이드 이펙트를 정리한다.

import { useState, useEffect } from "react";

function useTimer(callback, timeout) {
  const [isRunning, setIsRunning] = useState(false);

  const start = () => setIsRunning(true);

  const stop = () => setIsRunning(false);

  useEffect(() => {
    if (!isRunning) return;

    const timerId = setInterval(callback, timeout); // 사이드 이펙트 발생
    return () => {
      clearInterval(timerId); // 사이드 이펙트 정리
    };
  }, [isRunning, callback, timeout]);

  return [start, stop];
}
