import moment from "moment";
export class DateFormatValueConverter {
  toView(value) {
    return moment(value).format("MMMM Do, YYYY h:mm:ss a");
    //
  }

  fromView(value) {
    //
  }
}
