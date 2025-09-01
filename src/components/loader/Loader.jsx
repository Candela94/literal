import './loader.css';




export const LoaderDots = ({ label = 'Cargando productos…' }) => (
  <div className="loader" role="status" aria-live="polite" aria-label={label}>
    <span className="sr-only">{label}</span>
    <span className="dot" />
    <span className="dot" />
    <span className="dot" />
  </div>
);
