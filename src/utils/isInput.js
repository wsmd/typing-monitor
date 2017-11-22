// @flow

export default function isInput(object: any): boolean {
  return (
    object instanceof HTMLInputElement ||
    object instanceof HTMLTextAreaElement
  );
}
