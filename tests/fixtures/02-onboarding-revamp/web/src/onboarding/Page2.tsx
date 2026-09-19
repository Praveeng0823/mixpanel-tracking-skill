export function Page2({ next }: { next: () => void }) {
  return (
    <div>
      <h1>Set up your workspace</h1>
      <input placeholder="Workspace name" /><input placeholder="Team size" />
      <button onClick={() => next()}>Continue</button>
    </div>
  );
}
