const getContextPath = () => {
  let contextPath = import.meta.env.BASE_URL ?? '';
  if (contextPath === undefined || contextPath === null) {
    contextPath = '';
  }
  return contextPath === '/' ? '' : contextPath
}

export const utils = {
  getContextPath
}