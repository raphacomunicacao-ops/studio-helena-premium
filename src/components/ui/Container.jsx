function Container({ children, className = '' }) {
  return (
    <div className={`max-w-[1200px] mx-auto px-6 md:px-12 ${className}`}>
      {children}
    </div>
  );
}

export { Container };
