// outputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');


  return (
    <BaseNode
    title="Output"
    autoHeight={true}
    handles={[
      {
        type: 'target',
        position: Position.Left,
        id: `${id}-value`,
      },
    ]}
  >
    <label>
      Name:
      <input value={currName} onChange={(e) => setCurrName(e.target.value)} />
    </label>

    <label>
      Type:
      <select value={outputType} onChange={(e) => setOutputType(e.target.value)}>
        <option value="Text">Text</option>
        <option value="File">Image</option>
      </select>
    </label>
  </BaseNode>
  );
}
