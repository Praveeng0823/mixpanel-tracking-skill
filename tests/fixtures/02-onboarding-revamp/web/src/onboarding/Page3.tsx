export function Page3({ next }: { next: () => void }) {
  return (
    <div>
      <h1>Invite your team</h1>
      <input placeholder="Teammate email" /><input placeholder="Another email" />
      <button onClick={() => next()}>Send invites</button>
    </div>
  );
}
