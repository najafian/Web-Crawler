import { ChangedEventArgs, FocusInEventArgs, TextBox } from '@syncfusion/ej2-inputs';
import $ from 'jquery';
import { EmitType } from '@syncfusion/ej2-base';
import {IWidgetCommon} from "app/utils/widget/common/common";

export class Input implements IWidgetCommon<TextBox> {
  private readonly textBox: TextBox;
  permissionID: boolean;

  applyPermission(elementPermissionID: string, userPermissions: string[]): void {
  }

  constructor(element?: string | HTMLElement, placeHolder?: string, isRtl?: boolean) {
    this.textBox = new TextBox();
    this.setPlaceHolder(placeHolder);
    this.setFloatLabelType('Auto');
    this.setWidgetDirection(isRtl);
    this.createWidget(element);
  }

  setWidgetDirection(isRtl: any): void {
    this.textBox.enableRtl = isRtl;
  }

  setEnable(stat: boolean) {
    this.textBox.enabled = stat;
  }

  setType(type: string) {
    this.textBox.type = type;
  }

  addAttributes(attributes: Array<{ [key: string]: string }>) {
    attributes.forEach(a => this.textBox.addAttributes(a));
  }

  render() {
    this.textBox.refresh();
  }

  setHeight(height: number) {}

  setWidth(width: number) {}

  setValue(value: string) {
    this.textBox.value = value;
  }

  getValue() {
    return this.textBox.value !== null && this.textBox.value.length > 0 ? this.textBox.value : '';
  }

  getValueOrNull() {
    return this.textBox.value;
  }

  destroy(): void {
    this.textBox.destroy();
  }

  getWidget() {
    return this.textBox;
  }

  getElement() {
    return this.textBox.element;
  }

  setMaxLength(maxNumber: number) {
    this.textBox.element.onkeypress = e => {
      console.log(this.textBox.value);
      if (this.textBox.value.length <= maxNumber) {
        return false;
      }
    };
  }

  createWidget(element: any): void {
    if (element !== undefined) {
      if (element instanceof HTMLElement) {
        this.textBox.appendTo(element);
      } else {
        this.textBox.appendTo('#' + element);
      }
      $(this.textBox.element).css('padding', '0px');
      $(this.textBox.element).css('margin-top', '8px');
      $(this.textBox.element).css('position', 'relative');
    }
  }

  setColorOnTextBox() {
    $(this.textBox.element).addClass('e-input-group e-warning');
  }

  onChange(change: EmitType<ChangedEventArgs>) {
    this.textBox.change = change;
  }
  onKeyPress(listener: EventListenerOrEventListenerObject) {
    this.textBox.element.addEventListener('keypress', listener);
  }
  onFocus(focus: EmitType<FocusInEventArgs>) {
    this.textBox.focus = focus;
  }

  setFloatLabelType(floatLabelType: any): void {
    this.textBox.floatLabelType = floatLabelType;
  }

  getPlaceHolder(): string {
    return this.textBox.placeholder;
  }

  setPlaceHolder(label: string) {
    this.textBox.placeholder = label;
  }

  getLabel(): string {
    return this.textBox.placeholder;
  }

  setLabel(label: string) {
    this.textBox.placeholder = label;
  }
}
