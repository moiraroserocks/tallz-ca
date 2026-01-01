export default function Microcopy({ children, className = "" }) {
  return (
    <p className={`text-sm text-neutral-500 ${className}`.trim()}>
      {children}
    </p>
  );
}
