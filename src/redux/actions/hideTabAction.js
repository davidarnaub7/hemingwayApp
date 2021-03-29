export const TABSTATECHANGE = 'TABSTATECHANGE';

export const changeTabState = (show) => {
  return {
    show,
    type: TABSTATECHANGE,
  };
};
