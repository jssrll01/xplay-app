import React from 'react';
import { NavLink } from 'react-router-dom';
import { Gamepad2 } from 'lucide-react';

const items = [['/', 'Play Time', Gamepad2]];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon" style={{
          background: 'linear-gradient(135deg,#3B82F6,#7C3AED)', color: '#fff', fontSize: 18, fontWeight: 900,
          display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 11,
          boxShadow: '4px 4px 10px rgba(37,99,235,0.35), -3px -3px 8px rgba(255,255,255,0.9)',
        }}>X</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: -0.3 }}>XPLAY</div>
          <div style={{ fontSize: 10, color: 'var(--text-dim)', fontWeight: 600 }}>Play Time management</div>
        </div>
      </div>
      <nav className="sidebar-nav">
        {items.map(([to, label, Icon]) => (
          <NavLink key={to} to={to} end className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}>
            <Icon size={16} /><span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
