export default class TooltipUtils {
  static showTooltipIfOverflows(rowId: number, columnName: string) {
    const row = document.getElementById(String(rowId));
    const element = row?.querySelector('#' + columnName) as Element;

    if (element.scrollWidth > element.clientWidth) {
      return element.innerHTML;
    } else {
      return "";
    }
  }
}
