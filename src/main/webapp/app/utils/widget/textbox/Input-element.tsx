import React from 'react';
import {TosanWidgetCommonElement} from "app/utils/widget/common/common";
import {Input} from "app/utils/widget/textbox/Input";

export class InputElement extends TosanWidgetCommonElement<Input> {
  textBox: Input;

  constructor(prop) {
    super(prop);
    this.textBox = new Input();
    this.widget = this.textBox;
    this.initialProps(this.props.widgetProp);
  }

  initialProps(props) {
    super.initialProps(props);
    props.getValue = () => (this.textBox.getValue() !== undefined && this.textBox.getValue() !== null ? this.textBox.getValue() : '');
    props.setValue = (value: string) => {
      this.textBox.setValue(value);
    };
    props.setEnable = stat => this.textBox.setEnable(stat);
    props.setVisibility = isVisible => (document.getElementById(this.widgetPanelID).style.display = isVisible ? 'flex' : 'none');
    props.getElement = () => this.textBox.getElement();
  }

  componentDidMount(): void {
    this.widget.createWidget(this.widgetID);
  }

  render(): React.ReactElement | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (
      <div id={this.widgetPanelID} style={{
        width: this.props.width,
        height: this.height,
        display: 'flex',
        fontSize: '11px', ...this.props.panelStyle
      }}>
        <label style={{fontSize: '11px'}}/>
        <div style={{padding: '0 5px 0', width: this.props.width}}>
          <input style={{height: this.height}} id={this.widgetID}/>
        </div>
      </div>
    );
  }

  destroy(): void {
    this.widget.destroy();
  }
}
