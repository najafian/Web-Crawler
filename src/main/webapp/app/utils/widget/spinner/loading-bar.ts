import $ from 'jquery';
import {IWidgetCommon} from "app/utils/widget/common/common";

export class LoadingBar implements IWidgetCommon<HTMLElement> {
  bodyElement: HTMLElement;
  loadingElement: HTMLElement;
  loadingElementTitle: HTMLElement;
  loadingContainerElement: HTMLElement;
  subBody: HTMLElement;
  showStyle =
    'width:100%;height:100%;opacity:.5;background-color:#575858;z-index:999999;position:absolute;top:0px;display:table;cursor:progress;';
  hideStyle = 'width:0px;height:0px;display:none;';

  constructor(element?: string | HTMLElement) {
    this.bodyElement = document.createElement('div');
    this.bodyElement.setAttribute('class', 'loadingPanelTag');
    this.loadingElement = document.createElement('div');
    this.loadingElement.innerText='...Crawling the selected URI...';
    this.loadingElement.setAttribute('style','text-align: center;font-size: 30px;')
    this.loadingElementTitle = document.createElement('div');
    this.loadingElementTitle.innerText='...Please wait...';
    this.loadingElementTitle.setAttribute('style','text-align: center;font-size: 40px;')

    this.subBody = document.createElement('div');
    this.subBody.setAttribute('style', 'display: table-cell;vertical-align: middle;');
    this.loadingContainerElement = document.createElement('div');
    this.loadingContainerElement.appendChild(this.loadingElement);
    this.loadingContainerElement.appendChild(this.loadingElementTitle);

    this.subBody.appendChild(this.loadingContainerElement);
    this.bodyElement.appendChild(this.subBody);
    this.setLoadingElement(element);
    this.hideLoading();
    this.loadingContainerElement.setAttribute('class', 'app-loading');
    // this.loadingElement.setAttribute('class', 'loader');
  }

  setLoadingElement(element: string | HTMLElement) {
    if (element !== undefined) {
      if (element instanceof HTMLElement) {
        $(element).append(this.bodyElement);
      } else {
        $('#' + element).append(this.bodyElement);
      }
    }
  }

  hideLoading() {
    this.bodyElement.setAttribute('style', this.hideStyle);
  }

  hideAndDestroy() {
    this.bodyElement.remove();
  }

  showLoading() {
    this.bodyElement.setAttribute('style', this.showStyle);
  }

  createWidget(element: any): void {}

  destroy(): void {}

  getLabel(): string {
    return '';
  }

  getWidget(): HTMLElement {
    return undefined;
  }

  setHeight(height: number | string) {}

  setLabel(label: string) {}

  setWidgetDirection(isRtl: boolean): void {}

  setWidth(width: number | string) {}

  applyPermission(elementPermissionID: string, userPermissions: string[]): void {}
}
