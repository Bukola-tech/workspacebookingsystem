import React from 'react';

interface DeskProps {
  id: number;
  type: 'individual' | 'team';
  booked: boolean;
  onBook: () => void;
}

const Desk: React.FC<DeskProps> = ({ id, type, booked, onBook }) => {
  return (
    <div className={`desk ${booked ? 'booked' : ''}`} onClick={!booked ? onBook : undefined}>
      <p>Desk {id}</p>
      <p>Type: {type}</p>
      <p>{booked ? 'Booked' : 'Available'}</p>
    </div>
  );
}

export default Desk;
