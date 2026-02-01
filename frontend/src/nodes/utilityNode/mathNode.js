import { Position } from 'reactflow';
import { BaseNode } from '../baseNode';

export const MathNode = ({ id }) => {
  return (
    <BaseNode
      title="Math"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-a`, style: { top: `${100/3}%` }, },
        { type: 'target', position: Position.Left, id: `${id}-b`, style: { top: `${200/3}%` },},
        { type: 'source', position: Position.Right, id: `${id}-result` },
      ]}
    >
      <span>Performs calculation</span>
    </BaseNode>
  );
};