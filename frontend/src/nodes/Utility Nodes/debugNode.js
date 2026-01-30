import { Position } from 'reactflow';
import { BaseNode } from '../baseNode';

export const DebugNode = ({ id }) => {
  return (
    <BaseNode
      title="Debug"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-in` },
      ]}
    >
      <span>Logs data</span>
    </BaseNode>
  );
};