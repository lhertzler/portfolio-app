export default function Logo() {
  return (
    <div className="relative w-full h-full">
      {/* Rectangle 1: Left vertical bar (full height) */}
      <div className="absolute left-0 top-0 bottom-0 bg-primary" style={{ width: '20%' }} />
      
      {/* Rectangle 2: Bottom horizontal bar */}
      <div className="absolute left-[20%] bottom-0 bg-primary" style={{ width: '35%', height: '20%' }} />
      
      {/* Rectangle 3: Middle vertical bar */}
      <div className="absolute left-[20%] bg-primary" style={{ width: '20%', height: '60%', bottom: '20%' }} />
      
      {/* Rectangle 4: Top horizontal bar */}
      <div className="absolute left-[40%] top-0 bg-primary" style={{ width: '25%', height: '20%' }} />
      
      {/* Rectangle 5: Right vertical bar (full height) */}
      <div className="absolute right-0 top-0 bottom-0 bg-primary" style={{ width: '20%' }} />
    </div>
  );
}