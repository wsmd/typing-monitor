// @flow

/* eslint-disable no-console */

export default function warning(message: string): void {
  if (
    typeof console !== 'undefined' &&
    typeof console.error === 'function'
  ) {
    console.error(message);
  }
}
