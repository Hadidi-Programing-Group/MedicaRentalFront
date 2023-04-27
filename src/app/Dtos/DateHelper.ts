export class DateHelper
{
  static getDate(_date: string){
    const date = new Date(_date);
    const timezoneOffset = date.getTimezoneOffset();
    const timezoneOffsetMs = timezoneOffset * 60 * 1000 * -1;
    const adjustedTime = date.getTime() + timezoneOffsetMs;
    return new Date(adjustedTime)
  }

  static toOneDigitTimeOnly(_date: Date){
    return _date.toLocaleTimeString([], {hour: 'numeric', minute: 'numeric', hour12: true});
  }

  static toTwoDigitTimeOnly(_date: Date){
    return _date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: true});
  }

  static toOneDigitDateOnly(_date: Date){
    return _date.toLocaleDateString([], {month: 'numeric', day: 'numeric', year: 'numeric'});
  }

  static toTwoDigitDateOnly(_date: Date){
    return _date.toLocaleDateString([], {month: '2-digit', day: '2-digit', year: 'numeric'});
  }
}
