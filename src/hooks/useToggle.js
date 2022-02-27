// toggle 함수를 호출할때마다 value 값이 참/거짓으로 번갈아가며 바뀐다.
// ON/OFF 같은 것을 만들 때 유용하다.

import { useState } from "react";

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = () => setValue((prevValue) => !prevValue);
  return [value, toggle];
}

export default useToggle;
