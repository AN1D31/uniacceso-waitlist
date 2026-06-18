import React, { useState } from 'react'
import { supabase } from './supabaseClient'
import './App.css'

function App() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' })

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatusMessage({ type: '', text: '' })

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ nombre, email }])

      if (error) {
        // Capturar si el correo ya existe por la restricción UNIQUE
        if (error.code === '23505') {
          throw new Error('Este correo ya está registrado para el acceso anticipado.')
        }
        throw error
      }

      setStatusMessage({
        type: 'success',
        text: '¡Registro exitoso! Te avisaremos en cuanto la app esté lista.'
      })
      setNombre('')
      setEmail('')
    } catch (error) {
      setStatusMessage({
        type: 'error',
        text: error.message || 'Hubo un problema al registrarte. Inténtalo de nuevo.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="landing-container">
      {/* Fondo con gradientes sutiles */}
      <div className="blur-gradient purple"></div>
      <div className="blur-gradient green"></div>

      <header className="header">
        <div className="logo-container">
          {/* Reemplaza con la ruta de tu SVG/PNG del logo */}
          <span className="logo-text">Uni<span className="accent-text">Acceso</span></span>
        </div>
        <span className="badge">Próximamente App Móvil</span>
      </header>

      <main className="main-content">
        <div className="hero-text-section">
          <h1>Democratizando el <br /> accessos a la <span className="gradient-title">educación</span></h1>
          <p className="subtitle">
            Estamos construyendo la herramienta definitiva para centralizar oportunidades de educación superior, becas y orientación con IA. Únete a la lista de espera exclusiva y obtén acceso anticipado antes que nadie.
          </p>

          <form onSubmit={handleRegister} className="waitlist-form">
            <div className="input-group">
              <input
                type="text"
                placeholder="Tu nombre completo"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Asegurando lugar...' : 'Asegurar mi acceso anticipado'}
            </button>
          </form>

          {statusMessage.text && (
            <div className={`status-alert ${statusMessage.type}`}>
              {statusMessage.text}
            </div>
          )}
        </div>

        <div className="image-preview-section">
          <div className="mockup-wrapper">
            {/* Aquí pones la imagen PNG sin fondo que me mostraste */}
            <img 
              src="/mockup-phone.png" 
              alt="UniAcceso App Mockup" 
              className="main-mockup"
            />
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} UniAcceso — Proyecto de Investigación y Desarrollo</p>
      </footer>
    </div>
  )
}

export default App