// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { APINode } from './nodes/utilityNode/apiNode';
import { DelayNode } from './nodes/utilityNode/delayNode';
import { MathNode } from './nodes/utilityNode/mathNode';
import { DebugNode } from './nodes/utilityNode/debugNode';
import { ConditionNode } from './nodes/utilityNode/conditionalNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  delay: DelayNode,
  math: MathNode,
  api: APINode,
  condition: ConditionNode,
  debug: DebugNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance, addNode, getNodeID]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <>
        <div ref={reactFlowWrapper} style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
            >
              
                <Background color="#9ca3af" 
                  gap={gridSize} 
                  size={1} 
                  style={{ opacity: 0.1 }} /> {/* Reduced opacity for cleaner look */}
                <Controls className="custom-controls"/>
                <MiniMap className="custom-minimap"
                nodeColor="#430A89" 
                maskColor="rgba(30, 12, 67, 0.6)"/>
                {nodes.length === 0 && (
                  <div className="empty-state">
                    <h3>Start Building</h3>
                    <p>Drag and drop a node from the toolbar.</p>
                  </div>
                )}
            </ReactFlow>
        </div>
        <style>{`
          .react-flow__controls {
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
            border-radius: 8px;
            overflow: hidden;
          }
          .react-flow__controls-button {
            border-bottom: 1px solid var(--border-color);
            background: transparent;
            fill: var(--text-main);
            transition: all 0.2s;
          }
          .react-flow__controls-button:hover {
            background: var(--bg-card-hover);
            fill: #fff;
          }
          .react-flow__controls-button:last-child {
            border-bottom: none;
          }
          .react-flow__minimap {
            background: var(--bg-dark);
            border: 1px solid var(--border-color);
            border-radius: 12px;
          }
          .react-flow__minimap-mask {
            fill: var(--glass-bg); 
          }
          .empty-state {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            pointer-events: none;
            user-select: none;
          }
          .empty-state h3 {
            margin: 0;
            color: var(--text-main);
            font-size: 20px;
            font-family: var(--font-family);
          }
          .empty-state p {
            margin: 8px 0 0;
            color: var(--text-secondary);
            font-size: 14px;
            font-family: var(--font-family);
            opacity: 0.7;
          }
        `}</style>
        </>
    )
}
