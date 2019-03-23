export default interface Sanitizer<T> {
  sanitize(object: T): T;
}
