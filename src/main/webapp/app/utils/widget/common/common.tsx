import React, { CSSProperties } from 'react';
import { FloatLabelType } from '@syncfusion/ej2-inputs';
import $ from 'jquery';
import { ComboBox } from '@syncfusion/ej2-dropdowns';
import UniqueID from "app/utils/uniqueKey";

export interface IWidgetCommon<T> extends IWidgetLabel {
  setHeight(height: number | string);

  setWidth(width: number | string);

  destroy(): void;

  getWidget(): T;

  createWidget(element: any): void;

  setWidgetDirection(isRtl: boolean): void;

  applyPermission(elementPermissionID: string, userPermissions: string[]): void;
}

export const TextToElement = (text: string, tagName: string): HTMLElement => {
  const htmlElement = document.createElement(tagName);
  $(htmlElement).append(text);
  return htmlElement;
};

interface IWidgetLabel {
  getLabel(): string;

  setLabel(label: string);
}

export enum LabelPosition {
  Left,
  Right,
  Top,
  None
}

export enum TosanDefaultIcon {
  USERCLASS = '<i class="far fa-users-class tosan-btnIconStyle"></i>',
  UserMinus = '<i class="fal fa-user-minus  tosan-btnIconStyle"></i>',
  FILEMINUS = '<i class="far fa-file-minus tosan-btnIconStyle"></i>',
  VIEW = '<i class="far fa-eye tosan-btnIconStyle"></i>',
  SEARCH = '<i  class="far fa-print-search tosan-btnIconStyle"></i>',
  ADD = '<i  class="far fa-plus-circle tosan-btnIconStyle"></i>',
  DELETE = '<i  class="far fa-minus-circle tosan-btnIconStyle"></i>',
  EDIT = '<i  class="far fa-edit tosan-btnIconStyle"></i>',
  EVENT = '<i  class="far fa-calendar-exclamation tosan-btnIconStyle"></i>',
  PRINTER = '<i  class="far fa-shredder tosan-btnIconStyle"></i>',
  STATUS = '<i  class="far fa-exchange tosan-btnIconStyle"></i>',
  INFO = '<i  class="far fa-info-circle tosan-btnIconStyle"></i>',
  CALENDAR1 = '<i class="far fa-calendar-day tosan-btnIconStyle"></i>',
  CONFIRM = '<i class="far fa-check-circle tosan-btnIconStyle"></i>',
  CANCEL = '<i class="far fa-ban tosan-btnIconStyle"></i>',
  SETTING1 = '<i class="far fa-sliders-v-square tosan-btnIconStyle"></i>',
  SETTING2 = '<i class="far fa-sliders-h tosan-btnIconStyle"></i>',
  UserGroup = '<i class="fas fa-user-tag tosan-btnIconStyle"></i>',
  Address = '<i class="far fa-address-book tosan-btnIconStyle"></i>',
  StepForward = '<i class="far fa-step-forward tosan-btnIconStyle directionIcon"></i>',
  FastForward = '<i class="far fa-fast-forward tosan-btnIconStyle directionIcon"></i>',
  StepBackward = '<i class="far fa-step-backward tosan-btnIconStyle directionIcon"></i>',
  FastBackward = '<i class="far fa-fast-backward tosan-btnIconStyle directionIcon"></i>',
  ChevronRight = '<i class="far fa-chevron-right tosan-btnIconStyle directionIcon"></i>',
  ChevronDoubleRight = '<i class="far fa-chevron-double-right tosan-btnIconStyle directionIcon"></i>',
  ChevronLeft = '<i class="far fa-chevron-left tosan-btnIconStyle directionIcon"></i>',
  ChevronDoubleLeft = '<i class="far fa-chevron-double-left tosan-btnIconStyle directionIcon"></i>',
  Login = '<i class="far fa-sign-in-alt  tosan-btnIconStyle directionIcon"></i>',
  Folder = '<i class="far fa-folder-open  tosan-btnIconStyle flipIconDirection"></i>',
  Ballot1 = '<i class="fal fa-ballot tosan-btnIconStyle directionIcon"></i>',
  Ballot2 = '<i class="fad fa-ballot tosan-btnIconStyle directionIcon"></i>',
  CheckDouble = '<i class="far fa-check-double tosan-btnIconStyle directionIcon"></i>',
  CheckSquare = '<i class="fal fa-check-square tosan-btnIconStyle directionIcon"></i>',
  Task = '<i class="fal fa-tasks tosan-btnIconStyle directionIcon"></i>',
  TasksAlt = '<i class="fal fa-tasks-alt tosan-btnIconStyle directionIcon"></i>',
  // TasksAlt = '<i class="fal fa-tasks-alt tosan-btnIconStyle directionIcon"></i>',
  UnCheckAll = '<i class="far fa-align tosan-btnIconStyle directionIcon"></i>',
  UnCheck = '<i class="fal fa-stop tosan-btnIconStyle directionIcon"></i>',
  Check = '<i class="far fa-check-square tosan-btnIconStyle directionIcon"></i>',
  NOIcon = ''
}
export interface IWidgetOps<T> {
  setLabel?(label: string): void;

  getValue?(): string | boolean | number | any;

  setValue?(label: string | any): void;

  setDirection?(isRTL: boolean): void;

  setHeight?(height: string): void;

  setWidth?(width: string): void;

  setFontSize?(size: string): void;

  getElement?(): HTMLElement;

  setFloatPlaceholderType?(floatLabelType: FloatLabelType): void;

  setLabelPosition?(labelPosition: LabelPosition): void;

  getWidget?(): T;

  setEnable?(isEnabled: boolean);

  setVisibility?(isVisible: any);

  setAttributeToMainElement?(attrs: Array<{ key: string; value: string }>);
}

export interface IWidgetProps {
  widgetProp: IWidgetOps<any>;
  width?: string;
  panelStyle?: CSSProperties;
  widgetStyle?: CSSProperties;
}

export class TosanWidgetCommonElement<T> extends React.Component<IWidgetProps> {
  widgetPanelID = UniqueID();
  widgetID = UniqueID();
  fontSize: string;
  height: string;
  width: string;
  widget: T;

  initialProps(widgetProp: IWidgetOps<any>) {
    widgetProp.setDirection = (isRtl: boolean): void => {
      widgetProp.getWidget().setWidgetDirection(isRtl);
    };
    widgetProp.setAttributeToMainElement = (attrs: Array<{ key: string; value: string }>) => {
      setTimeout(() => {
        attrs.forEach(a => $('#' + this.widgetPanelID).css(a.key, a.value));
      }, 20);
    };
    widgetProp.setLabelPosition = (labelPosition: LabelPosition) => {
      const widget = widgetProp.getWidget();
      const label = $('#' + this.widgetPanelID + '>label');
      const labelStyle =
        'width: fit-content;margin:0;display: inline-block;' + 'white-space: nowrap;text-overflow: ellipsis;padding:10px 0 0 0;';
      switch (labelPosition) {
        case LabelPosition.Left:
          if (widget.getPlaceHolder() !== undefined) {
            label.text(widget.getPlaceHolder());
          }
          // $('#' + this.inputID).css('direction', 'ltr');
          label.attr('style', labelStyle + 'direction:ltr;');
          widget.setPlaceHolder('');
          widget.setWidgetDirection(false);
          break;
        case LabelPosition.Right:
          if (widget.getPlaceHolder() !== undefined) {
            label.text(widget.getPlaceHolder());
          }
          // $('#' + this.inputID).css('direction', 'rtl');
          label.attr('style', labelStyle + 'direction:rtl;');
          widget.setPlaceHolder('');
          widget.setWidgetDirection(true);
          break;
        case LabelPosition.Top:
          if (widget.getPlaceHolder() !== undefined) {
            label.text(widget.getPlaceHolder());
          }
          label.attr('style', labelStyle + 'direction:rtl;');
          widget.setPlaceHolder('');
          widget.setWidgetDirection(true);
          break;
        default:
          break;
      }
      if (this.width === undefined) {
        setTimeout(() => {
          $('#' + this.widgetPanelID + '>div').css('width', 'calc(100% - ' + label.width() + 'px)');
        }, 100);
      }
    };
    widgetProp.setLabel = (label: string): void => {
      if (widgetProp.getWidget().setPlaceHolder !== undefined) {
        widgetProp.getWidget().setPlaceHolder(label);
      }
    };

    widgetProp.setHeight = (height: string): void => {
      $('#' + this.widgetPanelID + '>div').css('height', height);
      this.height = height;
    };
    widgetProp.setWidth = (width: string): void => {
      $('#' + this.widgetPanelID + '>div').css('width', width);
      this.width = width;
    };
    widgetProp.setFontSize = (size: string): void => {
      $('#' + this.widgetPanelID).css('font-size', size);
      this.fontSize = size;
    };
    widgetProp.setFloatPlaceholderType = (floatLabelType: FloatLabelType) => {
      try {
        const widget1 = widgetProp.getWidget();
        if (widget1 instanceof ComboBox) {
          return (widget1.floatLabelType = floatLabelType);
        } else if (widget1 instanceof ComboBox) {
          return (widget1.floatLabelType = floatLabelType);
        }
      } catch {}
    };
    widgetProp.getElement = () => widgetProp.getWidget().element;
    widgetProp.getWidget = () => this.widget as any;
  }
}

// const mapStateToProps = ({ locale }: IRootState) => ({
//   locale: locale.currentLocale
// });
// type StateProps = ReturnType<typeof mapStateToProps>;
// export default connect(
//   mapStateToProps
// )(TosanDatePickerElement);
