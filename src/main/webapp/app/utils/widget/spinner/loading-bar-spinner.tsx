import React from 'react';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

export class LoadingBarSpinner extends React.Component<{ isLoading: boolean }, { isLoading: boolean }> {
  constructor(props) {
    super(props);
    this.state = { isLoading: this.props.isLoading };
  }

  render() {
    return (
      <div style={this.state.isLoading ? { backgroundColor: 'lightskyblue', opacity: 0.5, width: '100%', height: '100%', position: 'absolute', zIndex: 1 } : {}}>
        <ClipLoader
          css={override}
          sizeUnit={'px'}
          size={150}
          color={'#123abc'}
          loading={this.state.isLoading}
        />
      </div>
    );
  }
}
