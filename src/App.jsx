import { useState } from 'react'
import { PAINTINGS } from './paintings'
import PaintingImage from './PaintingImage'

// ─── Shared styles ────────────────────────────────────────────────────────────

const S = {
  // Layout
  page: { paddingTop: '60px', minHeight: '100vh', background: '#f5f1eb' },
  section: { maxWidth: '1100px', margin: '0 auto', padding: '5rem 2rem' },

  // Typography
  displayMark: {
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 300,
    letterSpacing: '0.2em',
    color: '#1c1b19',
  },
  sectionTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '2rem',
    fontWeight: 300,
    letterSpacing: '0.04em',
    marginBottom: '3rem',
    color: '#1c1b19',
  },
  mutedLabel: {
    fontSize: '0.62rem',
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    color: '#7a7068',
  },

  // Buttons
  btn: {
    padding: '0.7rem 2.5rem',
    border: '1px solid rgba(28,27,25,0.3)',
    fontSize: '0.7rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    color: '#1c1b19',
    background: 'transparent',
    fontWeight: 300,
    transition: 'all 0.25s',
  },
  btnSm: {
    padding: '0.6rem 1.5rem',
    border: '1px solid rgba(28,27,25,0.3)',
    fontSize: '0.68rem',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    color: '#1c1b19',
    background: 'transparent',
    fontWeight: 300,
  },

  // Form fields
  fieldLabel: {
    display: 'block',
    fontSize: '0.62rem',
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    color: '#7a7068',
    marginBottom: '0.5rem',
  },
  fieldInput: {
    width: '100%',
    padding: '0.65rem 0',
    border: 'none',
    borderBottom: '1px solid rgba(28,27,25,0.18)',
    background: 'transparent',
    fontSize: '0.9rem',
    color: '#1c1b19',
    fontWeight: 300,
    outline: 'none',
  },
}

// ─── Header ───────────────────────────────────────────────────────────────────

function Header({ page, setPage }) {
  const links = ['gallery', 'about', 'contact']
  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: '#f5f1eb',
      borderBottom: '1px solid rgba(28,27,25,0.1)',
      height: '60px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 2.5rem',
    }}>
      <span
        onClick={() => setPage('home')}
        style={{ ...S.displayMark, fontSize: '1.6rem', cursor: 'pointer' }}
      >
        DG
      </span>
      <nav style={{ display: 'flex', gap: '2rem' }}>
        {links.map(l => (
          <button
            key={l}
            onClick={() => setPage(l)}
            style={{
              fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase',
              cursor: 'pointer',
              color: page === l ? '#1c1b19' : '#7a7068',
              background: 'none', border: 'none',
              borderBottom: page === l ? '1px solid #1c1b19' : '1px solid transparent',
              paddingBottom: '2px',
              transition: 'color 0.2s',
              fontWeight: 300,
            }}
          >
            {l}
          </button>
        ))}
      </nav>
    </header>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(28,27,25,0.1)',
      padding: '3rem 2rem',
      textAlign: 'center',
    }}>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', letterSpacing: '0.25em', marginBottom: '0.4rem' }}>DG</p>
      <p style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: '#a0988e' }}>Original paintings by Dave Grainger</p>
    </footer>
  )
}

// ─── Home ─────────────────────────────────────────────────────────────────────

function Home({ setPage }) {
  const [hover, setHover] = useState(false)
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      minHeight: 'calc(100vh - 60px)',
      textAlign: 'center', padding: '4rem 2rem',
    }}>
      <div style={{
        ...S.displayMark,
        fontSize: 'clamp(4.5rem, 14vw, 9rem)',
        lineHeight: 1,
        marginBottom: '1.5rem',
      }}>
        DG
      </div>
      <p style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: '0.9rem', letterSpacing: '0.35em', textTransform: 'uppercase',
        color: '#7a7068', marginBottom: '0.4rem',
      }}>
        Dave Grainger
      </p>
      <p style={{ fontSize: '0.75rem', letterSpacing: '0.1em', color: '#a0988e', marginBottom: '3.5rem' }}>
        Original paintings — watercolour &amp; oil
      </p>
      <button
        onClick={() => setPage('gallery')}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          ...S.btn,
          background: hover ? '#1c1b19' : 'transparent',
          color: hover ? '#f5f1eb' : '#1c1b19',
        }}
      >
        View the collection
      </button>
    </div>
  )
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

function Gallery() {
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const [enquire, setEnquire] = useState(null)

  const filtered = PAINTINGS.filter(p => {
    if (filter === 'available') return p.available
    if (filter === 'sold') return !p.available
    return true
  })

  const filterOptions = [
    { key: 'all', label: 'All works' },
    { key: 'available', label: 'Available' },
    { key: 'sold', label: 'Sold' },
  ]

  return (
    <div style={S.section}>
      <h1 style={S.sectionTitle}>The Collection</h1>

      {/* Filter bar */}
      <div style={{
        display: 'flex', gap: '2rem', marginBottom: '3rem',
        borderBottom: '1px solid rgba(28,27,25,0.1)', paddingBottom: '1rem',
      }}>
        {filterOptions.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            style={{
              fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase',
              cursor: 'pointer',
              color: filter === key ? '#1c1b19' : '#7a7068',
              background: 'none', border: 'none',
              borderBottom: filter === key ? '1px solid #1c1b19' : '1px solid transparent',
              paddingBottom: '3px',
              fontWeight: 300,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '2.5rem',
      }}>
        {filtered.map(p => (
          <PaintingCard key={p.id} painting={p} onClick={() => setSelected(p)} />
        ))}
      </div>

      {/* Detail modal */}
      {selected && (
        <DetailModal
          painting={selected}
          onClose={() => setSelected(null)}
          onEnquire={p => { setEnquire(p); setSelected(null) }}
        />
      )}

      {/* Enquire modal */}
      {enquire && (
        <EnquireModal painting={enquire} onClose={() => setEnquire(null)} />
      )}
    </div>
  )
}

function PaintingCard({ painting, onClick }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ cursor: 'pointer' }}
    >
      <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', marginBottom: '0.9rem' }}>
        <div style={{
          position: 'absolute', inset: 0,
          transform: hover ? 'scale(1.04)' : 'scale(1)',
          transition: 'transform 0.4s ease',
        }}>
          <PaintingImage painting={painting} sold={!painting.available} />
        </div>
      </div>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', fontWeight: 400, marginBottom: '0.2rem' }}>
        {painting.title}
      </p>
      <p style={{ fontSize: '0.72rem', color: '#7a7068' }}>
        {painting.medium} · {painting.dimensions}
      </p>
    </div>
  )
}

// ─── Detail Modal ─────────────────────────────────────────────────────────────

function DetailModal({ painting: p, onClose, onEnquire }) {
  const [btnHover, setBtnHover] = useState(false)
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(20,19,17,0.75)',
        zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#f5f1eb',
          maxWidth: '780px', width: '100%',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          maxHeight: '88vh', overflow: 'hidden',
        }}
      >
        {/* Image panel */}
        <div style={{ position: 'relative', aspectRatio: '1/1' }}>
          <PaintingImage painting={p} sold={!p.available} style={{ height: '100%' }} />
        </div>

        {/* Info panel */}
        <div style={{
          padding: '2.5rem',
          display: 'flex', flexDirection: 'column',
          overflowY: 'auto',
        }}>
          <button
            onClick={onClose}
            style={{
              alignSelf: 'flex-end', background: 'none', border: 'none',
              color: '#7a7068', fontSize: '1.3rem', marginBottom: '1rem',
              lineHeight: 1, cursor: 'pointer',
            }}
          >
            ×
          </button>

          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 300, marginBottom: '0.4rem' }}>
            {p.title}
          </h2>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.08em', color: '#7a7068', marginBottom: '1.8rem', fontStyle: 'italic' }}>
            {p.medium}
          </p>

          <p style={{ fontSize: '0.78rem', color: '#5a5048', marginBottom: '0.4rem' }}>Size: {p.dimensions}</p>
          <p style={{ fontSize: '0.78rem', color: '#5a5048', marginBottom: '0.4rem' }}>Medium: {p.medium}</p>
          <p style={{ fontSize: '0.78rem', color: '#5a5048', marginBottom: '0.4rem' }}>Original · Unframed</p>

          {p.available ? (
            <>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', margin: '1.5rem 0 0.5rem' }}>
                £{p.price}
              </p>
              <button
                onClick={() => onEnquire(p)}
                onMouseEnter={() => setBtnHover(true)}
                onMouseLeave={() => setBtnHover(false)}
                style={{
                  ...S.btnSm,
                  marginTop: 'auto',
                  background: btnHover ? '#1c1b19' : 'transparent',
                  color: btnHover ? '#f5f1eb' : '#1c1b19',
                  transition: 'all 0.25s',
                }}
              >
                Enquire
              </button>
            </>
          ) : (
            <p style={{ fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9a9088', margin: '1.5rem 0' }}>
              Sold
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Enquire Modal ────────────────────────────────────────────────────────────

function EnquireModal({ painting: p, onClose }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: `I am interested in "${p.title}" and would like more information.`,
  })
  const [sent, setSent] = useState(false)
  const [btnHover, setBtnHover] = useState(false)

  const update = key => e => setForm({ ...form, [key]: e.target.value })

  if (sent) {
    return (
      <ModalOverlay onClose={onClose}>
        <div style={{ background: '#f5f1eb', maxWidth: '480px', width: '100%', padding: '3rem', textAlign: 'center' }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 300, marginBottom: '1rem' }}>
            Thank you
          </p>
          <p style={{ fontSize: '0.85rem', color: '#5a5048', lineHeight: 1.7, marginBottom: '2rem' }}>
            Dave will be in touch shortly.
          </p>
          <button onClick={onClose} style={{ ...S.btnSm }}>Close</button>
        </div>
      </ModalOverlay>
    )
  }

  return (
    <ModalOverlay onClose={onClose}>
      <div style={{ background: '#f5f1eb', maxWidth: '480px', width: '100%', padding: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 300 }}>Enquire</p>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#7a7068', fontSize: '1.2rem', cursor: 'pointer', lineHeight: 1 }}>×</button>
        </div>
        <p style={{ fontSize: '0.78rem', color: '#7a7068', marginBottom: '2rem', fontStyle: 'italic' }}>{p.title}</p>

        {[
          { key: 'name', label: 'Your name', type: 'text', placeholder: 'Jane Smith' },
          { key: 'email', label: 'Email address', type: 'email', placeholder: 'jane@example.com' },
        ].map(({ key, label, type, placeholder }) => (
          <div key={key} style={{ marginBottom: '1.5rem' }}>
            <label style={S.fieldLabel}>{label}</label>
            <input
              type={type}
              value={form[key]}
              onChange={update(key)}
              placeholder={placeholder}
              style={S.fieldInput}
            />
          </div>
        ))}

        <div style={{ marginBottom: '2rem' }}>
          <label style={S.fieldLabel}>Message</label>
          <textarea
            value={form.message}
            onChange={update('message')}
            rows={4}
            style={{ ...S.fieldInput, resize: 'vertical' }}
          />
        </div>

        <button
          onClick={() => setSent(true)}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          style={{
            ...S.btn,
            background: btnHover ? '#1c1b19' : 'transparent',
            color: btnHover ? '#f5f1eb' : '#1c1b19',
          }}
        >
          Send enquiry
        </button>
      </div>
    </ModalOverlay>
  )
}

// ─── About ────────────────────────────────────────────────────────────────────

function About() {
  return (
    <div style={S.section}>
      <h1 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(2rem, 6vw, 3.2rem)',
        fontWeight: 300, letterSpacing: '0.04em',
        marginBottom: '2.5rem', color: '#1c1b19',
      }}>
        Dave Grainger
      </h1>
      <div style={{ maxWidth: '640px' }}>
        {[
          `Dave Grainger spent decades working with his hands as an electrician. Throughout that time, painting was never far away. Watercolour, oil, landscape — the medium never mattered as much as the compulsion to put something on canvas.`,
          `Now retired, he paints with the freedom that comes from a lifetime of looking — at light on water, at the changing colours of the northern hills, at skies that never quite repeat themselves. Decades of work have quietly accumulated. This is where they finally get seen.`,
          `Each painting is an original. No prints. No editions. When it's gone, it's gone.`,
        ].map((text, i) => (
          <p key={i} style={{ fontSize: '0.98rem', lineHeight: 1.95, color: '#3a3830', marginBottom: '1.5rem' }}>
            {text}
          </p>
        ))}
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 300, letterSpacing: '0.15em', marginTop: '2.5rem', color: '#8b7355' }}>
          — DG
        </p>
      </div>
    </div>
  )
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [btnHover, setBtnHover] = useState(false)

  const update = key => e => setForm({ ...form, [key]: e.target.value })

  if (sent) {
    return (
      <div style={{ ...S.section, maxWidth: '560px' }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 300, marginBottom: '1rem' }}>
          Thank you
        </p>
        <p style={{ fontSize: '0.88rem', color: '#5a5048', lineHeight: 1.7 }}>
          Your message has been received. Dave will be in touch shortly.
        </p>
      </div>
    )
  }

  return (
    <div style={S.section}>
      <h1 style={S.sectionTitle}>Get in touch</h1>
      <p style={{ fontSize: '0.82rem', color: '#7a7068', marginBottom: '3rem' }}>
        For general enquiries, please use the form below.
      </p>
      <div style={{ maxWidth: '520px' }}>
        {[
          { key: 'name', label: 'Your name', type: 'text', placeholder: 'Jane Smith' },
          { key: 'email', label: 'Email address', type: 'email', placeholder: 'jane@example.com' },
        ].map(({ key, label, type, placeholder }) => (
          <div key={key} style={{ marginBottom: '2rem' }}>
            <label style={S.fieldLabel}>{label}</label>
            <input
              type={type}
              value={form[key]}
              onChange={update(key)}
              placeholder={placeholder}
              style={S.fieldInput}
            />
          </div>
        ))}
        <div style={{ marginBottom: '2.5rem' }}>
          <label style={S.fieldLabel}>Message</label>
          <textarea
            value={form.message}
            onChange={update('message')}
            rows={5}
            placeholder="Your message..."
            style={{ ...S.fieldInput, resize: 'vertical' }}
          />
        </div>
        <button
          onClick={() => setSent(true)}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          style={{
            ...S.btn,
            background: btnHover ? '#1c1b19' : 'transparent',
            color: btnHover ? '#f5f1eb' : '#1c1b19',
          }}
        >
          Send message
        </button>
      </div>
    </div>
  )
}

// ─── Modal Overlay helper ─────────────────────────────────────────────────────

function ModalOverlay({ children, onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(20,19,17,0.75)',
        zIndex: 300,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <div onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

// ─── App root ─────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState('home')

  const pages = { home: Home, gallery: Gallery, about: About, contact: Contact }
  const PageComponent = pages[page]

  return (
    <div style={{ background: '#f5f1eb', minHeight: '100vh' }}>
      <Header page={page} setPage={setPage} />
      <div style={S.page}>
        <PageComponent setPage={setPage} />
      </div>
      <Footer />
    </div>
  )
}
