// BaseNode.js
import { Handle } from 'reactflow';

export const BaseNode = ({
  title,
  width = 200,
  height = 130,
  autoHeight = false,
  handles = [],
  children,
}) => {

  return (
    <>
    <div className="base-node"
      style={{
        width,
        height: autoHeight ? 'auto' : height,
      }}>
        <div className="base-node-title">
          {title}
        </div>

        <div className="base-node-content">
            {children}
        </div>

      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={handle.style}
          className="base-node-handle"
        />
      ))}
    </div>
    <style>{`
      .base-node {
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        box-sizing: border-box;
        color: var(--text-main);
        font-family: var(--font-family);
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        overflow: hidden;
        transition: all 0.2s ease;
      }
      .base-node:hover {
        border-color: var(--primary);
        box-shadow: 0 6px 15px rgba(168, 85, 247, 0.15);
      }
      .base-node-title {
        height: 38px;
        display: flex;
        align-items: center;
        padding: 0 12px;
        font-size: 13px;
        font-weight: 600;
        background: var(--bg-card-hover);
        color: var(--text-main);
        letter-spacing: 0.3px;
        border-bottom: 1px solid var(--border-color);
      }
      .base-node-content {
        padding: 12px 16px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .base-node-content label {
        display: flex;
        flex-direction: column;
        gap: 6px;
        font-size: 12px;
        font-weight: 500;
        color: var(--text-secondary);
      }
      .base-node-handle {
        width: 10px;
        height: 10px;
        background: var(--primary);
        border: 2px solid var(--bg-card);
        transform: translate(0%, 0%); 
        transition: transform 0.2s ease, background 0.2s ease;
        z-index: 10;
        border-radius: 50%;
      } 
      .base-node-handle:hover {
        transform: scale(1.3);
        background: var(--primary-glow);
        border-color: #fff;
      }
      .base-node-content input,
      .base-node-content select,
      .base-node-content textarea {
        width: 100%;
        padding: 8px 10px;
        background: var(--bg-dark);
        border: 1px solid var(--border-color);
        border-radius: 6px;
        color: var(--text-main);
        font-size: 12px;
        outline: none;
        box-sizing: border-box;
        font-family: var(--font-family);
        transition: border-color 0.2s;
      }
      .base-node-content input:focus,
      .base-node-content select:focus,
      .base-node-content textarea:focus {
        border-color: var(--primary);
        box-shadow: 0 0 0 2px rgba(168, 85, 247, 0.2);
        }
      .react-flow__handle-left {
        left: -5px;
      }
      .react-flow__handle-right {
        right: -5px;
      }
    `}</style>
    </>
  );
};