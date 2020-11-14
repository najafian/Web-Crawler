import { Button } from '@syncfusion/ej2-buttons';
import $ from 'jquery';
import {IWidgetCommon} from "app/utils/widget/common/common";

export class ButtonWidget implements IWidgetCommon<Button> {
  private button: Button;
  private translateLabel: string;
  private placeholder: string;
  isAuthenticated: boolean;
  private iconEl: string;
  private isLeftIcon: boolean;

  applyPermission(elementPermissionID: string, userPermissions: string[]): void {
  }

  constructor(element?: string | HTMLElement, label?: string, isRtl?: boolean) {
    this.isAuthenticated = true;
    this.button = new Button();
    this.createWidget(element);
    this.setWidgetDirection(isRtl);
    this.setLabel(label);
    this.setTranslateLink(label);
    this.button.cssClass = 'e-control e-btn e-lib e-outline e-primary';
  }

  setVisibility(isVisible = true) {
    this.button.cssClass = isVisible ? 'e-control e-btn e-lib e-outline e-primary' : 'tosan-button-invisible';
  }

  setDisability(disable: boolean) {
    this.button.disabled = this.isAuthenticated ? disable : true;
  }

  setWidgetDirection(isRtl: any): void {
    this.button.enableRtl = isRtl;
  }

  setEnable(isEnabled: boolean) {
    this.setDisability(!isEnabled);
  }

  setHeight(height: number) {}

  setWidth(width: number) {}

  destroy(): void {
    this.button.destroy();
  }

  getWidget() {
    return this.button;
  }

  getElement() {
    return this.button.element;
  }

  OnClick(onclick: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null) {
    this.button.element.onclick = onclick;
  }

  createWidget(element: any): void {
    if (element !== undefined) {
      if (element instanceof HTMLElement) {
        this.button.appendTo(element);
      } else {
        this.button.appendTo('#' + element);
      }
    }
  }

  onClick(onclick: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null): void {
    if (this.isAuthenticated && this.button !== null && this.button.element !== undefined && this.button.element !== null) {
      this.button.element.addEventListener('click', onclick);
      // this.button.element.onclick = onclick;
    }
  }

  onChange(onchange: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null): void {
    this.button.element.onchange = onchange;
  }

  setLabel(label: string, isCenter = true) {
    const margin = isCenter ? 'margin:0 auto' : '';
    const wrapWithSpan = label1 => `<span style="${margin};width:max-content;display:flex;">${label1}</span>`;
    const setLabelWithIcon = () => {
      if (this.isLeftIcon) {
        return wrapWithSpan(this.iconEl + label);
      }
      return wrapWithSpan(label + this.iconEl);
    };
    if (label !== undefined) {
      this.button.content = this.iconEl !== undefined && this.iconEl.length > 0 ? setLabelWithIcon() : wrapWithSpan(label);
    }
  }

  setHidden(isHidden: boolean) {
    // TODO should be implemented after demo
  }

  getIcon() {
    return this.iconEl;
  }

  setStyle(style: string) {
    $(this.button.element).css('padding', style);
  }

  addStyle(style: Array<{ key: string; value: string }>) {
    style.forEach(a => $(this.button.element).css(a.key, a.value));
  }

  getLabel() {
    return this.button.content;
  }

  setTranslateLink(translateLabel: string) {
    this.translateLabel = translateLabel;
  }

  getTranslateLink() {
    return this.translateLabel;
  }

  getPlaceHolder() {
    return this.placeholder;
  }

  setPlaceHolder(placeholder: string) {
    this.placeholder = placeholder;
  }
}
