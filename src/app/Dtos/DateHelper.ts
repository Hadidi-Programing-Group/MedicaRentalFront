export class DateHelper
{
  static getDate(_date: string){
    return new Date(_date)
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
