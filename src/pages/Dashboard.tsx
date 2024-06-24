import React from 'react';

interface DashboardProps {
  revenue: {
    basic: number;
    premium: number;
    executive: number;
    team: number;
  };
}

const Dashboard: React.FC<DashboardProps> = ({ revenue }) => {
  return (
    <div className="dashboard">
      <h2>Revenue Dashboard</h2>
      <p>Basic: ${revenue.basic.toFixed(2)}</p>
      <p>Premium: ${revenue.premium.toFixed(2)}</p>
      <p>Executive: ${revenue.executive.toFixed(2)}</p>
      <p>Team: ${revenue.team.toFixed(2)}</p>
      <p>Total: ${(revenue.basic + revenue.premium + revenue.executive + revenue.team).toFixed(2)}</p>
    </div>
  );
}

export default Dashboard;
