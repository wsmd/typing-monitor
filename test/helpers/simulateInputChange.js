const INPUT_EVENT = new Event('input');

export default function simulateInputChange(element) {
  element.dispatchEvent(INPUT_EVENT);
}
