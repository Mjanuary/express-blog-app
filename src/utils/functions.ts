export const getPage = (currentPage: number, currentLimit: number): number => {
  const page = currentPage || 1;
  const limit = currentLimit || 20;
  return Math.max(page * limit - limit, 0);
};
