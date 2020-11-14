import React, { CSSProperties } from 'react';
import $ from 'jquery';
import {IWidgetOps, TosanWidgetCommonElement} from "app/utils/widget/common/common";
import {Gridview} from "app/utils/widget/gridview/gridview";
import UniqueID from "app/utils/uniqueKey";

export class GridviewElement extends TosanWidgetCommonElement<Gridview> {
  gridview: Gridview;
  attrs: CSSProperties;

  constructor(prop) {
    super(prop);
    this.gridview = new Gridview();
    this.widget = this.gridview;
    this.widgetID = UniqueID();
    this.widgetPanelID = UniqueID();
    this.initialProps(this.props.widgetProp);
    this.attrs = { width: this.props.width, height: this.height, display: 'flex', fontSize: this.fontSize };
  }

  initialProps(props: IWidgetOps<Gridview>) {
    super.initialProps(props);
    props.getValue = () => this.gridview.getWidget().getSelectedRecords();
    props.setValue = (value: []) => {
      this.gridview.getWidget().selectRows(value);
    };
    props.setAttributeToMainElement = (attrs: Array<{ key: string; value: string }>) => {
      setTimeout(() => {
        attrs.forEach(a => $('#' + this.widgetPanelID).css(a.key, a.value));
      }, 100);
    };
  }

  componentDidMount(): void {
    this.widget.createWidget(this.widgetID);
  }

  render(): React.ReactElement | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (
      <div id={this.widgetPanelID} style={this.attrs}>
        <label />
        <div style={{ padding: '0 4px 0', width: this.props.width, ...this.props.panelStyle }}>
          <div style={{ height: this.height, fontSize: this.fontSize, padding: '0', width: this.props.width }} id={this.widgetID} />
        </div>
      </div>
    );
  }

  destroy(): void {
    this.widget.destroy();
  }
}
