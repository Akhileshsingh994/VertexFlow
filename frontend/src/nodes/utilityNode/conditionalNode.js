import { Position } from 'reactflow';
import { BaseNode } from '../baseNode';

export const ConditionNode = ({ id }) => {
  return (
    <BaseNode
      title="Condition"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-input` },
        { type: 'source', position: Position.Right, id: `${id}-true`, style: { top: `${100/3}%` },},
        { type: 'source', position: Position.Right, id: `${id}-false`, style: { top: `${200/3}%` },},
      ]}
    >
      <span>Branch logic</span>
    </BaseNode>
  );
};