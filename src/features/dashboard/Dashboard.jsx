import React from 'react'
import { useSelector } from 'react-redux'
import AgentDashboard from './AgentDashboard';
import ManagerDashboard from './ManagerDashboard';

function Dashboard() {
    const { role } = useSelector(state => state.auth);
    console.log(role)
  return (
    <div className='p-3'>
      <h4>DASHBOARD:{role}</h4>
      { role === 'Agent' && (<AgentDashboard/>) }
      { role === 'Manager' && (<ManagerDashboard/>) }
    </div>
  )
}

export default Dashboard
