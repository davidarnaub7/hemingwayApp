
//COMPARE TWO DATES (LAMBDA FUNC IN ORDE TO SORT ARRAY METHOD);
export const Compare = (a, b) => {
  const d1 = new Date(a.createdOn);
  const d2 = new Date(b.createdOn);

  if (d1.getTime() > d2.getTime()) {
    return -1;
  }
  if (d1.getTime() < d2.getTime()) {
    return 1;
  }
  return 0;
};
