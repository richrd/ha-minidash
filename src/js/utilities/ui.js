
export function toggleNavigation() {
  document.body.classList.toggle('navigation-open');
}

export function closeNavigation() {
  document.body.classList.remove('navigation-open');
}

export function openNavigation() {
  document.body.classList.add('navigation-open');
}
