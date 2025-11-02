export default function Footer() {
  return (
    <footer className="footer">
      <div className="d-flex justify-content-between align-items-center" style={{ padding: '0 15px' }}>
        <div>
          <small>
            © {new Date().getFullYear()} <strong>SCAN360</strong> - Strategic Corporate Analysis Navigator
          </small>
        </div>
        <div>
          <small>
            Powered by{' '}
            <a href="https://kitzanoslab.com" target="_blank" rel="noopener noreferrer">
              <img src="/kitzanos_logo_scuro.png" alt="Kitzanos Lab" style={{ maxHeight: '18px', marginLeft: '5px' }} />
            </a>
          </small>
        </div>
      </div>
    </footer>
  )
}
