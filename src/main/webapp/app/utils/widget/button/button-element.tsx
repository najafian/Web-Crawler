import React from 'react';
import $ from 'jquery';
import {ButtonWidget} from "app/utils/widget/button/button-widget";
import UniqueID from "app/utils/uniqueKey";
import {IWidgetOps, TosanWidgetCommonElement} from "app/utils/widget/common/common";

export class ButtonElement extends TosanWidgetCommonElement<ButtonWidget> {
  constructor(prop) {
    super(prop);
    this.widget = new ButtonWidget();
    this.widgetID = UniqueID();
    this.initialProps(this.props.widgetProp);
  }

  initialProps(props: IWidgetOps<ButtonWidget>) {
    super.initialProps(props);
    props.setLabel = (label: string) => {
      this.widget.setLabel(label);
    };
    props.setEnable = enable => this.widget.setDisability(!enable);
    props.setDirection = (isRtl: boolean): void => {
      this.widget.setWidgetDirection(isRtl);
      if (isRtl) {
        $('#' + this.widgetPanelID).css('direction', 'rtl');
      } else {
        $('#' + this.widgetPanelID).css('direction', 'ltr');
      }
    };
    props.setVisibility = isVisible => {
      this.widget.setVisibility(isVisible);
    };
  }

  componentDidMount(): void {
    const button = $('#' + this.widgetID);
    button.css('width', this.props.width);
    button.css('padding', '5px');
    this.widget.createWidget(this.widgetID);
  }

  render(): React.ReactElement | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (
      <div style={{ width: this.props.width, height: this.height, ...this.props.panelStyle }} id={this.widgetPanelID}>
        <button style={{ height: this.height, fontSize: this.fontSize, ...this.props.widgetStyle }} id={this.widgetID} />
      </div>
    );
  }

  destroy(): void {
    this.widget.destroy();
  }
}
