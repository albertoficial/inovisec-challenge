export default function ValidationMessage({ message }) {
  if (!message) return null;
  return <div className="validation-message">{message}</div>;
}
