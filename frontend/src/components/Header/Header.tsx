import React from 'react'
import s from './Header.module.scss'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className={s.header}>
      <div className={`container ${s.content}`}>
        <Link to="/" className={s.logo}>
          ⚡ Quiz Builder
        </Link>
        <nav className={s.nav}>
          <Link to="/">All quizes</Link>
          <Link to="/create" className="btn btnPrimary" style={{ color: '#fff' }}>
            + Create quiz
          </Link>
        </nav>
      </div>
    </header>
  );
}
