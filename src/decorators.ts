/**
 * @description Decorator for static methods
 * @returns
 */
function staticImpl<T extends new (...args: any[]) => any>() {
  return <U extends T>(constructor: U) => {
    return constructor;
  };
}
