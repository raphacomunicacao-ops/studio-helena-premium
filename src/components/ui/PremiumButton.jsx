import { motion } from 'framer-motion';

const styles = {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px 32px',
    borderRadius: '8px',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '700',
    fontSize: '13px',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: 'none',
    whiteSpace: 'nowrap',
  },
  primary: {
    backgroundColor: '#c9b99a',
    color: '#0a0d14',
    boxShadow: '0 8px 24px rgba(201,185,154,0.25)',
  },
  secondary: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    color: '#ffffff',
    border: '2px solid rgba(255,255,255,0.45)',
  },
};

function PremiumButton({ href, children, variant = 'primary', target, rel, onClick }) {
  const combinedStyle = { ...styles.base, ...styles[variant] };

  const hoverProps =
    variant === 'primary'
      ? { scale: 1.02, boxShadow: '0 12px 32px rgba(201,185,154,0.4)' }
      : { scale: 1.02, borderColor: 'rgba(255,255,255,0.9)', backgroundColor: 'rgba(255,255,255,0.14)' };

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        style={combinedStyle}
        whileHover={hoverProps}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      style={combinedStyle}
      whileHover={hoverProps}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}

export { PremiumButton };
