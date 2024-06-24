import React from 'react';

interface DeskProps {
  id: number;
  type: 'individual' | 'team';
  booked: boolean;
  onBook: () => void;
}

const Desk: React.FC<DeskProps> = ({ id, type, booked, onBook }) => {
  return (
    <div 
      className={`desk ${type} ${booked ? 'booked' : ''}`}
      onClick={!booked ? onBook : undefined}
    >
      Desk {id} ({type})
    </div>
  );
}

export default Desk;
