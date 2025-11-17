export default function LabPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Lab</h1>
        <p className="text-muted-foreground">
          Random experiments, components, and dev toys.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Component Gallery</h2>
          <p className="text-muted-foreground">Coming soon...</p>
        </div>
      </div>
    </div>
  );
}

