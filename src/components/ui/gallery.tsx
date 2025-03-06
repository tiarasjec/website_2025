import HorizontalScrollComponent from "./horizontal-scroll";

export default function Home() {
  return (
    <main className="p-4">
      <h1 className="text-2xl mb-4">Horizontal Scroll Example</h1>
      <HorizontalScrollComponent>
        
        <div className="block block-1">Block 1</div>
        <div className="block block-2">Block 1</div>
        <div className="block block-3">Block 1</div>
        <div className="block block-4">Block 1</div>
    
      </HorizontalScrollComponent>
    </main>
  );
}