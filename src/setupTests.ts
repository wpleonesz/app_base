// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

// Mock matchmedia (fallback que cumple la interfaz MediaQueryList)
if (typeof window !== 'undefined' && !window.matchMedia) {
  (window as any).matchMedia = (query: string): MediaQueryList => {
    const mql: MediaQueryList = {
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: (_: Event) => false,
    } as unknown as MediaQueryList;
    return mql;
  };
}
