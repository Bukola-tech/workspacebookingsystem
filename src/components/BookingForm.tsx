import React, { useState } from 'react';

interface BookingFormProps {
  onBook: (membership: string, hours: number) => void;
  deskType: 'individual' | 'team';
}

const BookingForm: React.FC<BookingFormProps> = ({ onBook, deskType }) => {
  const [membership, setMembership] = useState('Basic');
  const [hours, setHours] = useState(1);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onBook(membership, hours);
  }

  return (
    <form onSubmit={handleSubmit}>
      {deskType === 'individual' && (
        <>
          <label>
            Membership:
            <select value={membership} onChange={(e) => setMembership(e.target.value)}>
              <option value="Basic">Basic</option>
              <option value="Premium">Premium</option>
              <option value="Executive">Executive</option>
            </select>
          </label>
        </>
      )}
      <label>
        Hours:
        <input 
          type="number" 
          value={hours} 
          onChange={(e) => setHours(parseInt(e.target.value))} 
          min="1"
        />
      </label>
      <button type="submit">Book</button>
    </form>
  );
}

export default BookingForm;
