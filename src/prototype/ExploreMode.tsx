import { useState, useEffect } from 'react';

const nodes = [
  { id: 'naman', type: 'identity', label: 'Naman Jain', x: 50, y: 50 },
  { id: 'rbac', type: 'project', label: 'RBAC Backend', x: 30, y: 35 },
  { id: 'snap', type: 'project', label: 'Snap Attend', x: 70, y: 35 },
  { id: 'welth', type: 'project', label: 'Welth', x: 25, y: 65 },
  { id: 'meetai', type: 'project', label: 'MeetAI', x: 75, y: 65 },
  { id: 'cliflow', type: 'project', label: 'cliflow', x: 50, y: 25 },
  
  { id: 'nodejs', type: 'tech', label: 'Node.js', x: 15, y: 25 },
  { id: 'redis', type: 'tech', label: 'Redis', x: 35, y: 20 },
  { id: 'nextjs', type: 'tech', label: 'Next.js', x: 85, y: 25 },
  { id: 'fastapi', type: 'tech', label: 'FastAPI', x: 90, y: 45 },
  { id: 'prisma', type: 'tech', label: 'Prisma', x: 10, y: 60 },
  { id: 'webrtc', type: 'tech', label: 'WebRTC', x: 85, y: 80 },
  { id: 'cpp', type: 'tech', label: 'C++', x: 50, y: 10 },
  
  { id: 'devops', type: 'exploring', label: 'DevOps', x: 50, y: 85 },
  { id: 'aws', type: 'exploring', label: 'AWS', x: 35, y: 85 },
  { id: 'cicd', type: 'exploring', label: 'CI/CD', x: 65, y: 85 },
];

const edges = [
  { source: 'naman', target: 'rbac' },
  { source: 'naman', target: 'snap' },
  { source: 'naman', target: 'welth' },
  { source: 'naman', target: 'meetai' },
  { source: 'naman', target: 'cliflow' },
  { source: 'rbac', target: 'nodejs' },
  { source: 'rbac', target: 'redis' },
  { source: 'snap', target: 'nextjs' },
  { source: 'snap', target: 'fastapi' },
  { source: 'welth', target: 'nextjs' },
  { source: 'welth', target: 'prisma' },
  { source: 'meetai', target: 'nextjs' },
  { source: 'meetai', target: 'webrtc' },
  { source: 'cliflow', target: 'cpp' },
];

export default function ExploreMode({ onProjectSelect }: { onProjectSelect: (id: string) => void }) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Determine which nodes/edges are active based on hover
  const getActiveElements = () => {
    if (!hoveredNode) return { activeNodes: new Set(nodes.map(n => n.id)), activeEdges: new Set(edges.map((_, i) => i)) };
    
    const activeNodes = new Set([hoveredNode]);
    const activeEdges = new Set<number>();
    
    edges.forEach((edge, i) => {
      if (edge.source === hoveredNode || edge.target === hoveredNode) {
        activeEdges.add(i);
        activeNodes.add(edge.source);
        activeNodes.add(edge.target);
      }
    });
    
    return { activeNodes, activeEdges };
  };

  const { activeNodes, activeEdges } = getActiveElements();

  if (isMobile) {
    return (
      <div className="px-6 py-12">
        <h2 className="text-2xl font-bold mb-8 text-[#0F172A]">Explore Connections</h2>
        <p className="text-[#64748B] mb-8">Tap a project to view its deep dive.</p>
        
        <div className="space-y-8">
          {nodes.filter(n => n.type === 'project').map(project => {
            const relatedTech = edges
              .filter(e => e.source === project.id)
              .map(e => nodes.find(n => n.id === e.target))
              .filter(Boolean);
              
            return (
              <div 
                key={project.id} 
                className="bg-white p-6 rounded-2xl border border-[#0F172A]/10 shadow-sm cursor-pointer"
                onClick={() => onProjectSelect(project.id)}
              >
                <h3 className="font-bold text-lg mb-4 text-[#0F172A]">{project.label}</h3>
                <div className="flex flex-wrap gap-2">
                  {relatedTech.map(tech => (
                    <span key={tech?.id} className="px-3 py-1 bg-[#F4F0EB] text-[#0F172A] text-xs font-mono rounded-full border border-[#0F172A]/10">
                      {tech?.label}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Desktop Spatial Graph
  return (
    <div className="relative w-full h-full overflow-hidden bg-[#F4F0EB]">
      {/* Edges */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {edges.map((edge, i) => {
          const sourceNode = nodes.find(n => n.id === edge.source);
          const targetNode = nodes.find(n => n.id === edge.target);
          if (!sourceNode || !targetNode) return null;
          
          const isActive = activeEdges.has(i);
          const isHovered = hoveredNode !== null;
          
          return (
            <path
              key={i}
              d={`M ${sourceNode.x}% ${sourceNode.y}% Q ${(sourceNode.x + targetNode.x) / 2}% ${(sourceNode.y + targetNode.y) / 2 - 5}% ${targetNode.x}% ${targetNode.y}%`}
              fill="none"
              stroke={isActive ? '#0F172A' : (isHovered ? 'rgba(15, 23, 42, 0.05)' : 'rgba(15, 23, 42, 0.1)')}
              strokeWidth={isActive ? 2 : 1}
              className="transition-all duration-300"
              strokeDasharray={isActive && hoveredNode ? "4, 4" : "none"}
            />
          );
        })}
      </svg>

      {/* Nodes */}
      {nodes.map((node) => {
        const isActive = activeNodes.has(node.id);
        const isHovered = hoveredNode !== null;
        
        let nodeClasses = "absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 cursor-pointer ";
        
        if (!isActive && isHovered) {
          nodeClasses += "opacity-20 scale-95";
        } else if (isActive && isHovered) {
          nodeClasses += "opacity-100 scale-105 z-10 shadow-lg";
        } else {
          nodeClasses += "opacity-100 shadow-sm hover:shadow-md hover:scale-105 z-10";
        }
        
        return (
          <div
            key={node.id}
            className={nodeClasses}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            onClick={() => node.type === 'project' ? onProjectSelect(node.id) : null}
          >
            {node.type === 'identity' && (
              <div className="bg-[#0F172A] text-white px-6 py-3 rounded-full font-bold shadow-md border-2 border-[#0F172A]">
                {node.label}
              </div>
            )}
            
            {node.type === 'project' && (
              <div className="bg-white text-[#0F172A] px-5 py-2 rounded-2xl font-medium border border-[#0F172A]/10">
                {node.label}
              </div>
            )}
            
            {node.type === 'tech' && (
              <div className="bg-[#F4F0EB] text-[#64748B] px-3 py-1 rounded-full font-mono text-xs border border-[#0F172A]/20">
                {node.label}
              </div>
            )}
            
            {node.type === 'exploring' && (
              <div className="bg-white text-[#4F46E5] px-4 py-2 rounded-2xl font-medium border-2 border-[#4F46E5]/20 animate-pulse">
                {node.label}
              </div>
            )}
          </div>
        );
      })}
      
      {/* Legend / Helper */}
      <div className="absolute bottom-8 right-8 text-sm text-[#64748B] bg-white/80 p-4 rounded-xl backdrop-blur-sm border border-[#0F172A]/5">
        Hover nodes to reveal relationships.<br/>
        Click projects for deep dives.
      </div>
    </div>
  );
}
