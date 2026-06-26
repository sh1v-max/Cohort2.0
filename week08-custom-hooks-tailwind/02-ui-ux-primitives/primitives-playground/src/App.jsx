import { useState } from 'react'
import { SpacingSystem }   from './sections/SpacingSystem'
import { TypographyScale } from './sections/TypographyScale'
import { ColorTheory }     from './sections/ColorTheory'
import { VisualHierarchy } from './sections/VisualHierarchy'
import { WhiteSpace }      from './sections/WhiteSpace'
import { Consistency }     from './sections/Consistency'
import { FeedbackStates }  from './sections/FeedbackStates'
import { LayoutPatterns }  from './sections/LayoutPatterns'
import './App.css'

const SECTIONS = [
  { id: 'spacing',    label: '01 Spacing',    Component: SpacingSystem },
  { id: 'type',       label: '02 Typography', Component: TypographyScale },
  { id: 'color',      label: '03 Color',      Component: ColorTheory },
  { id: 'hierarchy',  label: '04 Hierarchy',  Component: VisualHierarchy },
  { id: 'whitespace', label: '05 Whitespace', Component: WhiteSpace },
  { id: 'consistency',label: '06 Consistency',Component: Consistency },
  { id: 'states',     label: '07 States',     Component: FeedbackStates },
  { id: 'layout',     label: '08 Layout',     Component: LayoutPatterns },
]

export default function App() {
  const [dark, setDark]     = useState(false)
  const [active, setActive] = useState(null) // null = show all

  return (
    <div className={`app ${dark ? 'dark' : 'light'}`}>

      {/* ── Sticky sidebar nav ─────────────────────────────── */}
      <nav className="sidenav">
        <div className="sidenav-brand">
          <span>UI/UX</span>
          <span className="sidenav-sub">Primitives</span>
        </div>

        <button className="dark-toggle" onClick={() => setDark(d => !d)}>
          {dark ? '☀️' : '🌙'}
        </button>

        <ul className="sidenav-list">
          <li>
            <button
              className={`sidenav-item ${active === null ? 'active' : ''}`}
              onClick={() => setActive(null)}
            >
              All Primitives
            </button>
          </li>
          {SECTIONS.map(s => (
            <li key={s.id}>
              <button
                className={`sidenav-item ${active === s.id ? 'active' : ''}`}
                onClick={() => setActive(s.id)}
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Main content ───────────────────────────────────── */}
      <main className="main-content">
        <div className="page-header">
          <h1 className="page-title">UI/UX Primitives</h1>
          <p className="page-subtitle">
            8 design fundamentals every frontend developer must know.
            Each section shows the principle, a bad example, and a good example — side by side.
          </p>
        </div>

        <div className="sections-container">
          {SECTIONS
            .filter(s => active === null || s.id === active)
            .map(({ id, Component }) => <Component key={id} />)
          }
        </div>
      </main>
    </div>
  )
}
