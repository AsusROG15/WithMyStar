import PropTypes from 'prop-types';
Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  ariaLabel: PropTypes.string,
  icon: PropTypes.node,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['primary', 'secondary']),
  tooltip: PropTypes.string,
  fullWidth: PropTypes.bool,
};

Button.defaultProps = {
  label: 'Click me',
  loading: false,
  size: 'medium',
  variant: 'primary',
  fullWidth: false,
};
customization 
/**
 * Cyberpunk-styled, accessible, and interactive Button component.
 *
 * @param {Object} props
 * @param {string} props.label - The button text.
 * @param {function} [props.onClick] - Optional click handler.
 * @param {boolean} [props.loading] - Show loading spinner if true.
 * @param {string} [props.ariaLabel] - Accessibility label.
 * @param {React.ReactNode} [props.icon] - Optional icon to display.
 * @param {'small'|'medium'|'large'} [props.size] - Button size.
 * @param {'primary'|'secondary'} [props.variant] - Button color variant.
 * @returns {JSX.Element}
 */
function Button({ label = 'Click me', onClick, loading = false, ariaLabel, icon, size = 'medium', variant = 'primary', tooltip, fullWidth = false }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e) => {
    if (loading) return;
    if (onClick) {
      setIsLoading(true);
      await onClick(e);
      setIsLoading(false);
    }
  };

  // Size styles
  const sizeStyles = {
    small: { fontSize: '0.9em', padding: '0.5em 1.2em' },
    medium: { fontSize: '1.2em', padding: '0.75em 2em' },
    large: { fontSize: '1.5em', padding: '1em 2.5em' },
  };

  // Variant styles
  const variantStyles = {
    primary: {
      background: 'linear-gradient(90deg, #ff00cc 0%, #00fff7 100%)',
      color: '#232526',
    },
    secondary: {
      background: 'linear-gradient(90deg, #232526 0%, #00fff7 100%)',
      color: '#ff00cc',
    },
  };

  return (
    <button
      type="button"
      className="cyberpunk-btn"
      onClick={handleClick}
      aria-label={ariaLabel || label}
      disabled={loading || isLoading}
      title={tooltip}
      style={{
        ...sizeStyles[size],
        ...variantStyles[variant],
        border: 'none',
        borderRadius: '8px',
        fontFamily: 'Orbitron, Share Tech Mono, monospace',
        boxShadow: '0 0 10px #ff00cc, 0 0 20px #00fff7',
        cursor: loading || isLoading ? 'not-allowed' : 'pointer',
        transition: 'background 0.2s, color 0.2s',
        opacity: loading || isLoading ? 0.7 : 1,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5em',
        width: fullWidth ? '100%' : undefined,
      }}
    >
      {icon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>}
      {isLoading || loading ? (
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
          <span className="spinner" style={{
            width: '1em',
            height: '1em',
            border: '2px solid #00fff7',
            borderTop: '2px solid #ff00cc',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            display: 'inline-block',
          }} />
          Loading...
        </span>
      ) : (
        label
      )}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
}

export default Button;
