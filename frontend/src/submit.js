// submit.js
import { useStore } from './store';

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const handleSubmit = async () => {
    const pipeline = {
      nodes: nodes.map((node) => ({
        id: node.id,
        type: node.type,
      })),
      edges: edges.map((edge) => ({
        source: edge.source,
        target: edge.target,
      })),
    };

    const formData = new FormData();
    formData.append('pipeline', JSON.stringify(pipeline));

    const baseUrl = process.env.REACT_APP_API_URL ;
    
    try {
      const res = await fetch(`${baseUrl}pipelines/parse`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      alert(
        `Pipeline Analysis\n\n` +
        `Nodes: ${data.num_nodes}\n` +
        `Edges: ${data.num_edges}\n` +
        `Is DAG: ${data.is_dag ? 'Yes' : 'No'}`
      );
    } catch (err) {
      alert('Failed to analyze pipeline');
      console.error(err);
    }
  };

  return (
    <div className="submit-wrapper">
      <button className="submit-button" type="button" onClick={handleSubmit}>
        Validate Pipeline
      </button>

      <style>{`
        .submit-wrapper {
          display: flex;
          justify-content: center;
          pointer-events: auto;
        }
        .submit-button {
          height: 48px;
          padding: 0 34px;
          border-radius: 9999px;
          background:
          radial-gradient(120% 120% at 30% 30%,#C084FC 0%,#A855F7 35%,#7C3AED 70%,#5B21B6 100%);
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.2px;
          border: none;
          outline: none;
          cursor: pointer;
          box-shadow:
            0 0 0 rgba(168, 85, 247, 0),
            0 10px 30px rgba(124, 58, 237, 0.35);
          transition:
            background 0.25s ease,
            box-shadow 0.25s ease,
            filter 0.25s ease;
        }
        .submit-button:hover {
          filter: brightness(1.08);
          box-shadow:
            0 0 20px rgba(168, 85, 247, 0.45),
            0 14px 40px rgba(124, 58, 237, 0.45);
        }
      `}</style>
    </div>
  );
};