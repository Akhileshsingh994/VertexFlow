// draggableNode.js

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={{
          cursor: 'grab',
          minWidth: '90px',
          height: '44px',
          background: 'linear-gradient(180deg, #3B1C7A 0%, #2A145E 100%)',
          borderRadius: '10px',
          border: '1px solid rgba(168, 85, 247, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#F5D0FE',
          fontSize: '13px',
          fontWeight: 500,
          boxShadow: '0 0 12px rgba(168, 85, 247, 0.2)',
        }} 
        draggable
      >
          <span style={{ color: ' #E9D5FF' }}>{label}</span>
      </div>
    );
  };
  