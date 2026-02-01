// UIOverlay.js
import { PipelineToolbar } from './toolbar';
import { SubmitButton } from './submit';
import { UtilityToggleButton } from './UitlityToggleButton';

export const UIOverlay = ({ showUtilityNodes, onToggleUtility }) => {
  
  return (
    <>
      <div className="pipeline-ui-layer">
        <div className="ui-element ui-toolbar">
          <PipelineToolbar showUtilityNodes={showUtilityNodes} />
        </div>
        <div className="ui-element ui-toggle">
          <UtilityToggleButton 
            showUtilityNodes={showUtilityNodes}
            onToggle={onToggleUtility}
          />            
        </div>
        <div className="ui-element ui-submit">
          <SubmitButton />
        </div>
      </div>

      <style>{`
        .pipeline-ui-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 100;
          padding: 20px;
          box-sizing: border-box;
        }
        .ui-element {
          pointer-events: auto;
          position: absolute; 
        }
        .ui-toolbar {
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          max-width: calc(100vw - 400px); 
          width: max-content;
        }
        .ui-toggle {
          top: 20px;
          right: 20px;
          padding-bottom: 14px;
        }
        .ui-toggle button {
          backdrop-filter: blur(6px);
        }
        .ui-submit {
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
        }

        @media (max-width: 768px) {
          .pipeline-ui-layer {
            padding: 10px;
          }
          .ui-toolbar {
            top: 10px;
            max-width: calc(100vw - 190px);
            left: 10px;
            transform: none;
          }
          .ui-toggle {
            top: 10px;
            right: 10px;
          }
          .ui-submit {
            bottom: 10px;
          }
        }`}</style>
    </>
  );
};