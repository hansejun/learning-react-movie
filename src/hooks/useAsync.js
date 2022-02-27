// 비동기 함수의 로딩, 에러 처리를 하는 데 사용할 수 있는 함수이다.
// 함수를 asyncFunction 이라는 파라미터로 추상화해서 wrappedFunction 이라는 함수를 만들어 사용한다.

import { useState } from "react";

function useAsync(asyncFunction) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const wrappedFunction = async (...args) => {
    try {
      setPending(true);
      setError(null);
      return await asyncFunction(...args);
    } catch (e) {
      setError(e);
      return;
    } finally {
      setPending(false);
    }
  };
  return [pending, error, wrappedFunction];
}
export default useAsync;
