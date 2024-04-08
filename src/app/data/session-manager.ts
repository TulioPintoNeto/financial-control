export class SessionManager<T extends {}> {
  constructor(private key: string) {}

  get(): T | null {
    const value = sessionStorage.getItem(this.key);

    if (!value) {
      return null;
    }

    return JSON.parse(value);
  }

  set(value: T) {
    sessionStorage.setItem(this.key, JSON.stringify(value));
  }

  clear() {
    sessionStorage.getItem(this.key);
  }
}
