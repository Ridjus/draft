import { useCallback, useState } from 'react';

export const useBoolean = (initialState = false) => {
  const [state, setState] = useState(initialState);

  const on = useCallback(() => setState(true), []);
  const off = useCallback(() => setState(false), []);
  const toggle = useCallback(() => setState((state) => !state), []);

  return [state, { on, off, toggle }] as const;
};
