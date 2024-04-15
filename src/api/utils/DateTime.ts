export class DateTime {
  isoDate: Date;
  isoDateStr: string;

  constructor(isoDate: string) {
    this.isoDate = new Date(isoDate);
    this.isoDateStr = isoDate;
  }

  isSameMonth(date: DateTime) {
    if (date.isoDate.getFullYear() !== this.isoDate.getFullYear()) {
      return false;
    }

    return date.isoDate.getMonth() === this.isoDate.getMonth();
  }

  copy() {
    return new Date(this.isoDate);
  }

  get firstDayOfMonth(): string {
    return new Date(this.copy().setDate(1)).toISOString();
  }

  get lastDayOfMonth(): string {
    const oneMonthAhead = new Date(
      this.copy().setMonth(this.isoDate.getMonth() + 1)
    );
    return new Date(oneMonthAhead.setDate(0)).toISOString();
  }

  get isValid() {
    if (isNaN(this.isoDate.getTime())) {
      return false;
    }

    if (this.isoDate.toISOString().split('T')[0] !== this.isoDateStr) {
      return false;
    }

    return true;
  }
}
