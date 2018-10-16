import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class SwipeContainer extends Component {
  static propTypes = {
    onSwipe: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      touchStart: null,
      touchEnd: null,
    };
  }

  touchStart(e) {
    this.setState({
      touchStart: {
        x: e.touches[0].pageX,
        y: e.touches[0].pageY,
      },
    });
  }

  touchMove(e) {
    this.setState({
      touchEnd: {
        x: e.touches[0].pageX,
        y: e.touches[0].pageY,
      },
    });
  }

  touchEnd() {
    const start = this.state.touchStart;
    const end = this.state.touchEnd;
    if (start === null || end === null) {
      return;
    }
    const angle = (Math.atan2(end.y - start.y, end.x - start.x) * 180) / Math.PI;
    const distance = Math.sqrt(((start.x - end.x) ** 2) + ((start.y - end.y) ** 2));
    this.props.onSwipe(angle, distance, start, end);

    this.setState({
      touchStart: null,
      touchEnd: null,
    });
  }

  render() {
    return (
      <div
        onTouchStart={evt => this.touchStart(evt)}
        onTouchMove={evt => this.touchMove(evt)}
        onTouchEnd={evt => this.touchEnd(evt)}
      >
        {this.props.children}
      </div>
    );
  }
}


export default connect()(SwipeContainer);
