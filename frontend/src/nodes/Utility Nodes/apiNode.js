import { Position } from 'reactflow';
import { BaseNode } from '../baseNode';

export const APINode = ({ id }) => {
  return (
    <BaseNode
      title="API"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-request` },
        { type: 'source', position: Position.Right, id: `${id}-response` },
      ]}
    >
      <span>Calls external API</span>
    </BaseNode>
  );
};