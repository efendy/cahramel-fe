export const classNames = function(...classes: any) {
  return classes.filter(Boolean).join(' ')
}
