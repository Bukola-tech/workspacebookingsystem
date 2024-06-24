import React, { useState } from 'react';

interface BookingFormProps {
  deskType: 'individual' | 'team';
  onBook: (membership: string, hours: number) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ deskType, onBook }) => {
  const [membership, setMembership] = useState('Basic');
  const [hours, setHours] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onBook(membership, hours);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Membership:
        <select value={membership} onChange={(e) => setMembership(e.target.value)}>
          <option value="Basic">Basic</option>
          <option value="Premium">Premium</option>
          <option value="Executive">Executive</option>
        </select>
      </label>
      <label>
        Hours:
        <input type="number" value={hours} onChange={(e) => setHours(parseInt(e.target.value))} min="1" />
      </label>
      <button type="submit">Confirm Booking</button>
    </form>
  );
}

export default BookingForm;
