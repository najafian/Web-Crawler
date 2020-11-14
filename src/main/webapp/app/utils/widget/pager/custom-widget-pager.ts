import { Pager } from '@syncfusion/ej2-grids';
import { EmitType } from '@syncfusion/ej2-base';
import {IWidgetCommon} from "app/utils/widget/common/common";

export class CustomWidgetPager implements IWidgetCommon<Pager> {
  private readonly pager: Pager;
  private translateLabel = '';
  isAuthenticated = true;

  getLabel(): string {
    return '';
  }

  setLabel(label: string): void {}

  setPageSize(size: number) {
    this.pager.pageSize = size;
  }

  setDropDownChanged(dropDownChanged: EmitType<any>) {
    this.pager.dropDownChanged = dropDownChanged;
  }

  setCurrentPage(pageNumber: number) {
    this.pager.currentPage = pageNumber;
  }

  setPageCount(count: number) {
    this.pager.pageCount = count;
  }

  setTotalRecordCount(totalRecord: number) {
    this.pager.totalRecordsCount = totalRecord;
  }

  applyPermission(elementPermissionID: string, userPermissions: string[]): void {
  }

  constructor(element?: string | HTMLElement, label?: string, isRtl?: boolean) {
    this.isAuthenticated = true;
    this.pager = new Pager();
    this.createWidget(element);
    this.setWidgetDirection(isRtl);
    this.setLabel(label);
  }

  setWidgetDirection(isRtl: any): void {
    this.pager.enableRtl = isRtl;
  }

  setHeight(height: number) {}

  setWidth(width: number) {}

  destroy(): void {
    this.pager.destroy();
  }

  getWidget() {
    return this.pager;
  }

  getElement() {
    return this.pager.element;
  }

  OnClick(click: EmitType<any>) {
    this.pager.click = click;
  }

  createWidget(element: any): void {
    if (element !== undefined) {
      if (element instanceof HTMLElement) {
        this.pager.appendTo(element);
      } else {
        this.pager.appendTo('#' + element);
      }
    }
  }

  onClick(click: EmitType<any>): void {
    this.pager.click = click;
  }

  addEventListener(eventName: string, handler: Function) {
    return this.pager.addEventListener(eventName, handler);
  }

  setHidden(isHidden: boolean) {
    // TODO should be implemented after demo
  }

  setTranslateLink(translateLabel: string) {
    this.translateLabel = translateLabel;
  }

  getTranslateLink() {
    return this.translateLabel;
  }
}
