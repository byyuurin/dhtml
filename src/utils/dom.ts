export function $<T extends HTMLElement>(target: string, parent: Element | Document = document) {
  return parent.querySelector<T>(target)
}

$.all = <T extends HTMLElement>(target: string, parent: Element | Document = document) =>
  Array.from(parent.querySelectorAll<T>(target))
