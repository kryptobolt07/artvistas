import { useEffect } from 'react';
import ExhibitWalkthrough from '../components/virtual-tour/ExhibitWalkthrough';

export default function VirtualTourPage() {
  // Set page title
  useEffect(() => {
    document.title = "Virtual Tour | ArtVistas";
  }, []);

  return (
    <div className="virtual-tour-container">
      <ExhibitWalkthrough />
    </div>
  );
} 