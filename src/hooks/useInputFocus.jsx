import { useEffect, useRef } from "react";

// 화면 처음 랜더링시 인풋요소에 focus 주기 위한 hook
export default function useInputFocus() {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  //inputRef를 input ref속성에 사용하면 됩니다!
  return { inputRef };
}
