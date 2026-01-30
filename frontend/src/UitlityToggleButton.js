// UtilityToggleButton.js

export const UtilityToggleButton = ({ showUtilityNodes, onToggle }) => {
  return (
    <button className="utility-toggle-fixed" onClick={onToggle}>
      {showUtilityNodes ? 'Hide Utility Nodes' : 'Show Utility Nodes'}

      <style>
        {`  
          .utility-toggle-fixed {
            width: 160px; 
            height: 42px;           
            background: rgba(30, 12, 67, 0.7);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(168, 85, 247, 0.4);
            color: #E9D5FF;
            border-radius: 12px;
            cursor: pointer;
            font-family: 'Inter', sans-serif;
            font-weight: 500;
            font-size: 13px;
            transition: all 0.2s ease;
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);            
            display: flex;
            align-items: center;
            justify-content: center;
            white-space: nowrap;
            outline: none;
          }
          .utility-toggle-fixed:hover {
            background: rgba(67, 10, 137, 0.8);
            color: #fff;
            transform: translateY(-1px);
            box-shadow: 0 6px 15px rgba(168, 85, 247, 0.2);
          }          
          .utility-toggle-fixed:active {
            transform: translateY(0);
          }
        `}
      </style>
    </button>
  );
};