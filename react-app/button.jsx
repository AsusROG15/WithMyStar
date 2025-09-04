
import React from 'react';

/**
 * A reusable Button component.
 *
 * @param {Object} props
 * @param {string} props.label - The button text.
 * @param {function} [props.onClick] - Optional click handler.
 * @returns {JSX.Element}
 */
function Button({ label = 'Click me', onClick }) {
  return (
    <button type="button" onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;
