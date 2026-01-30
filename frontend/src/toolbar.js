// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = ({ showUtilityNodes }) => {

    return (
        <>
        <div className="pipeline-toolbar" >
            <div className="pipeline-toolbar-row">
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                {showUtilityNodes && (
                    <>
                        <DraggableNode type='delay' label='Delay' />
                        <DraggableNode type='math' label='Math' />
                        <DraggableNode type='api' label='API' />
                        <DraggableNode type='condition' label='Condition' />
                        <DraggableNode type='debug' label='Debug' />
                    </>
                )}
            </div>        
        </div>
        
        <style>{`
        .pipeline-toolbar {
            padding: 10px 20px;
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
            display: flex;
        }
        .pipeline-toolbar-row {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            gap: 12px;
        }

        @media (max-width: 768px) {
            .pipeline-toolbar {
                padding: 10px;
                overflow-x: auto;
                max-width: 100%;
                /* Hide scrollbar for cleaner look */
                -ms-overflow-style: none;  /* IE and Edge */
                scrollbar-width: none;  /* Firefox */
            }
            .pipeline-toolbar::-webkit-scrollbar {
                display: none;
            }
            .pipeline-toolbar-row {
                flex-wrap: nowrap;
                justify-content: flex-start;
                min-width: max-content;
            }
        }
      `}</style>
        </>
    );
};
