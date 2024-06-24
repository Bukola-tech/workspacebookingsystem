import React, { useState } from 'react';
import Desk from './Desk';
import BookingForm from './BookingForm';
import Dashboard from '../pages/Dashboard';

interface DeskInfo {
  id: number;
  type: 'individual' | 'team';
  booked: boolean;
}

type Membership = 'basic' | 'premium' | 'executive';
type Revenue = Record<Membership | 'team', number>;

const BookingSystem: React.FC = () => {
  const [desks, setDesks] = useState<DeskInfo[]>([
    ...Array(10).fill(0).map((_, i) => ({ id: i + 1, type: 'individual' as 'individual', booked: false })),
    ...Array(5).fill(0).map((_, i) => ({ id: i + 11, type: 'team' as 'team', booked: false }))
  ]);
  const [selectedDesk, setSelectedDesk] = useState<DeskInfo | null>(null);
  const [totalCharge, setTotalCharge] = useState(0);
  const [revenue, setRevenue] = useState<Revenue>({
    basic: 0,
    premium: 0,
    executive: 0,
    team: 0,
  });

  const handleBook = (id: number) => {
    const desk = desks.find(d => d.id === id);
    if (desk && !desk.booked) {
      setSelectedDesk(desk);
    }
  }

  const calculatePrice = (membership: string, hours: number) => {
    let pricePerHour = 0;
    if (selectedDesk?.type === 'individual') {
      switch (membership) {
        case 'Basic': pricePerHour = 10; break;
        case 'Premium': pricePerHour = 15; break;
        case 'Executive': pricePerHour = 20; break;
      }
    } else if (selectedDesk?.type === 'team') {
      pricePerHour = 25;
    }

    let total = pricePerHour * hours;
    if (hours > 3) {
      total *= 0.9;
    }

    return total;
  }

  const handleConfirmBooking = (membership: string, hours: number) => {
    if (selectedDesk) {
      const price = calculatePrice(membership, hours);
      const updatedDesks = desks.map(desk =>
        desk.id === selectedDesk.id ? { ...desk, booked: true } : desk
      );
      setDesks(updatedDesks);
      setTotalCharge(price);
      setSelectedDesk(null);
      
      setRevenue(prevRevenue => {
        const newRevenue = { ...prevRevenue };
        if (selectedDesk.type === 'individual') {
          newRevenue[membership.toLowerCase() as Membership] += price;
        } else if (selectedDesk.type === 'team') {
          newRevenue.team += price;
        }
        return newRevenue;
      });
    }
  }

  return (
    <div className="booking-system">
      <div className="desks">
        {desks.map(desk => (
          <Desk 
            key={desk.id} 
            id={desk.id} 
            type={desk.type} 
            booked={desk.booked} 
            onBook={() => handleBook(desk.id)} 
          />
        ))}
      </div>
      {selectedDesk && (
        <BookingForm 
          deskType={selectedDesk.type} 
          onBook={handleConfirmBooking} 
        />
      )}
      <div className="total-charge">
        {totalCharge > 0 && <p>Total Charge: ${totalCharge.toFixed(2)}</p>}
      </div>
      <Dashboard revenue={revenue} />
    </div>
  );
}

export default BookingSystem;
