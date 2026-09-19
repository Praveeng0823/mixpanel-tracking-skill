export function Page4({ next }: { next: () => void }) {
  return (
    <div>
      <h1>Choose a plan</h1>
      <select><option>Free</option><option>Pro</option></select>
      <button onClick={() => next()}>Finish</button>
    </div>
  );
}
