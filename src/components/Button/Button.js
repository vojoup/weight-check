import React from 'react';
import PropTypes from 'prop-types';

const Button = props => {
  const { title } = props;
  return (
    <button type="button" {...props}>
      {title}
    </button>
  );
};

Button.propTypes = {
  title: PropTypes.string,
};

export default Button;
