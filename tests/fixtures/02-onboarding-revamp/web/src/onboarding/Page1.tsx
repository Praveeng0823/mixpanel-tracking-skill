export function Page1({ next }: { next: () => void }) {
  return (
    <div>
      <h1>Create your account</h1>
      <input placeholder="Name" /><input placeholder="Email" /><input placeholder="Mobile number" />
      <button onClick={() => next()}>Register</button>
    </div>
  );
}
