import { useState } from 'react';
import { PipelineUI } from './ui';
import { UIOverlay } from './UIOverlay';

function App() {
  const [showUtilityNodes, setShowUtilityNodes] = useState(false);

  return (
    <>
     <UIOverlay 
        showUtilityNodes={showUtilityNodes} 
        onToggleUtility={() => setShowUtilityNodes((prev) => !prev)} 
      />
      <PipelineUI />
    </>
  );
}

export default App;
