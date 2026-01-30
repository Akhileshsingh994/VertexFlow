# VertexFlow

A modern, visual pipeline builder application that enables users to create and manage node-based workflows through an intuitive drag-and-drop interface. Built with React, React Flow, and Zustand, VertexFlow provides a powerful platform for designing complex data processing pipelines.

## Features

- **Drag-and-Drop Interface**: Intuitive visual canvas for building pipelines
- **Extensible Node System**: Create custom nodes with minimal boilerplate using the BaseNode abstraction
- **Dynamic Text Processing**: Text nodes with automatic variable detection and dynamic handle generation
- **Pipeline Validation**: Built-in DAG (Directed Acyclic Graph) validation to ensure valid pipeline structures
- **Modern UI**: Beautiful dark theme with smooth animations and responsive design
- **Real-time Updates**: Live node resizing and dynamic handle management

## Tech Stack

- **Frontend**: React 18, React Flow 11, Zustand
- **Backend**: FastAPI (Python)
- **Styling**: CSS Variables with custom theming

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Python 3.8+
- pip

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd VertexFlow
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../backend
   pip install fastapi uvicorn
   ```

### Running the Application

1. **Start the frontend development server**
   ```bash
   cd frontend
   npm start
   ```
   The app will be available at `http://localhost:3000`

2. **Start the backend server** (in a separate terminal)
   ```bash
   cd backend
   uvicorn main:app --reload
   ```
   The API will be available at `http://localhost:8000`

> **Note**: Both servers must be running for full functionality, including pipeline validation.

## Core Components

### Node Types

#### Core Nodes
- **Input Node**: Entry point for data with configurable name and type
- **LLM Node**: Large Language Model integration with system prompt, user prompt, and response handles
- **Output Node**: Exit point for processed data with configurable name and type
- **Text Node**: Dynamic text processing with variable interpolation using `{{variable}}` syntax

#### Utility Nodes
- **API Node**: HTTP API integration
- **Delay Node**: Add delays to pipeline execution
- **Math Node**: Mathematical operations
- **Condition Node**: Conditional logic branching
- **Debug Node**: Debugging and logging utilities

### Architecture

#### BaseNode Abstraction
All nodes are built using the `BaseNode` component (`src/nodes/baseNode.js`), which provides:
- Consistent card-based UI with title bar and content area
- Configurable sizing (width, height, auto-height)
- Standardized handle positioning and styling
- Shared form control styling

#### State Management
The application uses Zustand (`src/store.js`) for global state management:
- Node and edge storage
- Automatic node ID generation
- React Flow integration for node/edge changes

#### Text Node Features
The Text Node (`src/nodes/textNode.js`) includes:
- **Auto-resizing**: Textarea and node height adjust automatically as content grows
- **Variable Detection**: Automatically detects variables in `{{variableName}}` format
- **Dynamic Handles**: Creates input handles for each detected variable
- **Real-time Updates**: Handles update immediately when variables are added or removed

## Usage

1. **Create Nodes**: Drag nodes from the toolbar at the top of the canvas
2. **Connect Nodes**: Click and drag from output handles (right side) to input handles (left side)
3. **Configure Nodes**: Click on nodes to edit their properties
4. **Use Variables**: In Text nodes, use `{{variableName}}` to create dynamic inputs
5. **Validate Pipeline**: Click the "Validate Pipeline" button at the bottom to check if your pipeline is a valid DAG

### Utility Nodes
Toggle utility nodes on/off using the button in the top-right corner to access additional node types.

## API Endpoints

### `POST /pipelines/parse`
Validates a pipeline structure and checks if it forms a valid DAG.

**Request**: Form data with `pipeline` field (JSON string)
```json
{
  "nodes": [{"id": "node-1", "type": "input"}, ...],
  "edges": [{"source": "node-1", "target": "node-2"}, ...]
}
```

**Response**:
```json
{
  "num_nodes": 3,
  "num_edges": 2,
  "is_dag": true
}
```

## Project Structure

```
VertexFlow/
├── frontend/
│   ├── src/
│   │   ├── App.js              # Main application component
│   │   ├── ui.js                # React Flow canvas configuration
│   │   ├── store.js             # Zustand state management
│   │   ├── UIOverlay.js         # UI overlay positioning
│   │   ├── toolbar.js           # Node toolbar component
│   │   ├── submit.js            # Pipeline validation button
│   │   ├── nodes/
│   │   │   ├── baseNode.js      # Base node abstraction
│   │   │   ├── inputNode.js     # Input node
│   │   │   ├── llmNode.js       # LLM node
│   │   │   ├── outputNode.js    # Output node
│   │   │   ├── textNode.js      # Text node with variables
│   │   │   └── utilityNode/     # Additional utility nodes
│   │   └── ...
│   └── package.json
├── backend/
│   └── main.py                  # FastAPI server with DAG validation
└── README.md
```

## Key Features Explained

### Dynamic Variable Detection
Text nodes automatically detect variables written in double curly braces (e.g., `{{input}}`, `{{userName}}`). For each unique variable, a corresponding input handle is created on the left side of the node, allowing you to connect data from other nodes.

### Pipeline Validation
The validation feature checks if your pipeline forms a valid Directed Acyclic Graph (DAG). This ensures:
- No circular dependencies
- All nodes are reachable
- The pipeline can be executed in a valid order

The backend uses Kahn's algorithm for topological sorting to detect cycles.

## Development

### Adding Custom Nodes
1. Create a new component in `src/nodes/` or `src/nodes/utilityNode/`
2. Use the `BaseNode` component as a wrapper
3. Define your handles (inputs/outputs)
4. Register the node type in `src/ui.js` in the `nodeTypes` object
5. Add a draggable button in `src/toolbar.js`

Example:
```javascript
import { BaseNode } from './baseNode';
import { Position } from 'reactflow';

export const MyCustomNode = ({ id, data }) => {
  const handles = [
    { type: 'target', position: Position.Left, id: 'input' },
    { type: 'source', position: Position.Right, id: 'output' }
  ];

  return (
    <BaseNode title="My Node" handles={handles}>
      {/* Your node content */}
    </BaseNode>
  );
};
```

