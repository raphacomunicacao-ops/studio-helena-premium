export default function Container({ children, className = '' }) {
  return (
    <div
      className={`mx-auto w-full max-w-[1200px] px-6 md:px-12 ${className}`}
    >
      {children}
    </div>
  )
}
