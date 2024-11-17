import React from 'react'

const Footer = () => {
  return (

<footer className='mt-5' style={{  padding: '40px 20px' }}>
  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
    {/* Column 1 */}
    <div style={{ flex: '1', margin: '10px' }}>
      <h5>About Us</h5>
      <p>Learn more about our company and team.</p>
    </div>
    {/* Column 2 */}
    <div style={{ flex: '1', margin: '10px' }}>
      <h5>Contact</h5>
      <p>Email: contact@company.com</p>
      <p>Phone: +1 234 567 890</p>
    </div>
    {/* Column 3 */}
    <div className='text-light' style={{ flex: '1', margin: '10px' }}>
      <h5>Follow Us</h5>
      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
        <i className="fa-brands fa-facebook me-4 text-body fa-lg"></i>
      </a>
      <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
        <i className="fa-brands fa-twitter me-4 text-body fa-lg"></i>
      </a>
      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
        <i className="fa-brands fa-instagram text-body fa-lg"></i>
      </a>
    </div>
    {/* Column 4 */}
    <div style={{ flex: '1', margin: '10px' }}>
      <h5>Search</h5>
      <form>
        <input
          type="text"
          placeholder="Search..."
          style={{ padding: '8px', width: '70%', marginRight: '10px', borderRadius: '4px', border: '1px solid #ced4da' }}/>
        <button className='bg-info'
          type="submit"
          style={{ padding: '8px 15px', color: 'white', border: 'none', borderRadius: '4px' }}>
          Search
        </button>
      </form>
    </div>
  </div>
  <hr className='ms-auto me-auto' style={{width:'90%'}} />
  {/* Footer Bottom */}
  <div style={{ marginTop: '20px', textAlign: 'center' }}>
    <p>© 2024 Media Player. All Rights Reserved.</p>
  </div>
</footer>

  )
}

export default Footer