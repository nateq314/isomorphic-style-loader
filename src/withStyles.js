/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component } from "react";
import hoistStatics from "hoist-non-react-statics";

function withStyles(stylesContext, ...styles) {
  return function wrapWithStyles(ComposedComponent) {
    class WithStyles extends Component {
      componentWillMount() {
        this.removeCss = this.context.insertCss(...styles);
      }

      componentWillUnmount() {
        if (this.removeCss) {
          setTimeout(this.removeCss, 0);
        }
      }

      render() {
        return <ComposedComponent {...this.props} />;
      }
    }

    const displayName =
      ComposedComponent.displayName || ComposedComponent.name || "Component";

    WithStyles.displayName = `WithStyles(${displayName})`;
    WithStyles.contextType = stylesContext;
    WithStyles.ComposedComponent = ComposedComponent;

    return hoistStatics(WithStyles, ComposedComponent);
  };
}

export default withStyles;
