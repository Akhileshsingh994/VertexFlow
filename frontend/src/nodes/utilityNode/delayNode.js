import { Position } from 'reactflow';
import { BaseNode } from '../baseNode';

export const DelayNode = ({ id }) => {
  return (
    <BaseNode
      title="Delay"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-in` },
        { type: 'source', position: Position.Right, id: `${id}-out` },
      ]}
    >
      <span>Adds delay</span>
    </BaseNode>
  );
};