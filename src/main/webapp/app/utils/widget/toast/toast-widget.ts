import { Toast, ToastModel } from '@syncfusion/ej2-notifications';
import $ from 'jquery';
import { translate } from 'react-jhipster';
import {IWidgetCommon, TosanDefaultIcon} from "app/utils/widget/common/common";

export class ToastWidget implements IWidgetCommon<Toast> {
  private toast: Toast;
  permissionID: boolean;
  prefixSpanTag = '<span style="font-family: IRANSansWeb;padding: 10px !important;font-size: 11px;">';
  postfixSpanTag = '</span>';

  applyPermission(elementPermissionID: string, userPermissions: string[]): void {
  }

  constructor() {
    this.createToast();
  }

  createToast() {
    if (this.toast === undefined || this.toast === null) {
      this.toast = new Toast();
      const div = document.createElement('div');
      // div.setAttribute('style', 'position:absolute;bottom:10px;');
      $('body').append(div);
      this.toast.position = { X: 'Left', Y: 'Bottom' };
      this.createWidget(div);
    }
  }

  hide() {
    this.toast.hide('All');
  }

  checkFieldIsEmptyShowToast(value, text: string, isRtl, isPureText = false) {
    if (value === undefined || value === null || value.length === 0) {
      let result = '';
      if (isPureText) {
        result = translate(text);
      } else {
        const mandatory = translate('toast.fillMandatory');
        const field = translate(text);
        result = mandatory.replace('{0}', field);
      }

      this.setTitle(result.trim(), TosanDefaultIcon.INFO);
      this.showWithRtl(isRtl);
      return false;
    } else {
      return true;
    }
  }

  setTitle(title: string, icon: TosanDefaultIcon) {
    this.createToast();
    this.toast.title = icon + this.prefixSpanTag + title + this.postfixSpanTag;
  }

  setTranslateTitle(translateName: string, icon: TosanDefaultIcon) {
    this.toast.title = icon + icon + this.prefixSpanTag + +translate(translateName) + this.postfixSpanTag;
  }

  setContent(content: string) {
    this.toast.content = this.prefixSpanTag + content + this.postfixSpanTag;
  }

  setWidgetDirection(isRtl: any): void {
    this.createToast();
    this.toast.position = isRtl ? { X: 'Left', Y: 'Bottom' } : { X: 'Right', Y: 'Bottom' };
    this.toast.enableRtl = isRtl;
  }

  showWithRtl(isRtl: boolean) {
    this.createToast();
    this.setWidgetDirection(isRtl);
    this.hide();
    this.toast.show();
  }

  showNotification(rtl, title: string, icon?: TosanDefaultIcon) {
    this.createToast();
    if (icon) {
      this.setTitle(title, icon);
    } else {
      this.setTitle(title, TosanDefaultIcon.INFO);
    }
    this.showWithRtl(rtl);
  }

  showNotificationWithoutIcon(rtl, title: string) {
    this.createToast();
    this.setTitle(title, TosanDefaultIcon.NOIcon);
    this.showWithRtl(rtl);
  }

  duplicateRowNotification(rtl) {
    this.showNotification(rtl, translate('toast.duplicate'));
  }

  updatedNotification(rtl) {
    this.showNotification(rtl, translate('toast.updated'));
  }

  checkResultIsSuccess(rtl, result: any, tabID: string, loading?: ToastWidget) {
    if (result.result !== undefined && result.Result === undefined) {
      result.Result = result.result;
      result.result = undefined;
    }
    try {
      const json = JSON.parse(result.Result);
      if (json.status !== undefined && json.status !== null) {
        this.showNotification(rtl, json.message);
        if (json.subErrors !== undefined && json.subErrors !== null) {
          json.subErrors.map(m => setTimeout(() => this.showNotification(rtl, m.message), 500));
        }
        result.Result = '';
      }
    } catch (e) {}
    try {
      if (
        (result.tabID !== undefined && result.tabID.trim() !== tabID.trim()) ||
        result.Result === undefined ||
        result.Result === null ||
        result.Result.length === 0
      ) {
        return false;
      }
    } catch (e) {
      console.log(e);
    }
    if (loading) {
      loading.hide();
    }
    let returnStat = true;
    if (result.Result !== 'erSucceed') {
      const content = 'resultNotification.' + result.Result.replace(/_/g, '');
      this.showNotification(rtl, translate(content));
      returnStat = false;
    }
    result.Result = '';
    return returnStat;
  }

  addedNotification(rtl) {
    this.showNotification(rtl, translate('toast.added'));
  }

  emptyGridNotification(rtl) {
    this.showNotification(rtl, translate('toast.empty'));
  }

  deletedNotification(rtl) {
    this.showNotification(rtl, translate('toast.deleted'));
  }

  showSpecificNotification(rtl, result: string) {
    if (result !== undefined) {
      result = result.replace(/_/g, '');
      result = translate('resultNotification.' + result);
      this.showNotification(rtl, result);
    }
  }

  show(toastObj?: ToastModel) {
    this.toast.show(toastObj);
  }

  setHeight(height: number) {}

  setWidth(width: number) {}

  destroy(): void {
    this.toast.destroy();
  }

  getWidget() {
    return this.toast;
  }

  getElement() {
    return this.toast.element;
  }

  createWidget(element: any): void {
    if (element !== undefined) {
      if (element instanceof HTMLElement) {
        this.toast.appendTo(element);
      } else {
        this.toast.appendTo('#' + element);
        // this.toast.element = $('#' + element).get(0);
      }
    }
  }

  onClick(onclick: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null): void {
    this.toast.element.onclick = onclick;
  }

  onChange(onchange: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null): void {
    this.toast.element.onchange = onchange;
  }

  getLabel(): any {
    return this.toast.content;
  }

  setLabel(label: string) {
    this.toast.content = label;
  }

  setTemplate(template: string) {
    this.toast.template = template;
  }
}
