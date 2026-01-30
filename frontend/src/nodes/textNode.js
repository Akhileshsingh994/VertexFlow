import { useState, useEffect, useRef ,useMemo} from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';
import { useUpdateNodeInternals } from 'reactflow';

const extractVariables = (text) => {
  const regex = /{{\s*([\w]+)\s*}}/g;
  const vars = new Set();
  let match;

  while ((match = regex.exec(text)) !== null) {
    vars.add(match[1]);
  }

  return Array.from(vars);
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 'px';
        updateNodeInternals(id);
    }
  }, [currText, id, updateNodeInternals]);

  const variables = useMemo(
    () => extractVariables(currText),
    [currText]
  );

  const inputHandles = variables.map((variable, index) => ({
    type: 'target',
    position: Position.Left,
    id: `${id}-var-${variable}`,
    style: {
      top: `${((index + 1) * 100) / (variables.length + 1)}%`,
    },
  }));

  const handles = [
    ...inputHandles,
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-output`,
    },
  ];

  return (
    <BaseNode
      title="Text"
      width={200}
      height={130}
      autoHeight={true}
      handles={handles}
    >
      <label style={{ width: '100%' }}>
        Text:
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          style={{
            width: '100%',
            resize: 'none',
            overflow: 'hidden',
            boxSizing: 'border-box',
          }}
        />
      </label>
    </BaseNode>
  );
};