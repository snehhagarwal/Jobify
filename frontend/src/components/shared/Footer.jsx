import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className="bg-[#4682B4] text-white py-8 border-t border-blue-300">
  <div className="container mx-auto px-4">
    <div className="flex flex-col md:flex-row justify-between items-center">
      <div className="mb-4 md:mb-0 text-center md:text-left">
        <h2 className="text-xl font-bold">Jobify</h2>
        <p className="text-blue-100 text-sm mt-1">
          © {new Date().getFullYear()} Jobify. All rights reserved.
        </p>
      </div>
      
      <div className="flex flex-col items-center md:items-end space-y-2">
        <p className="text-blue-100 text-sm font-bold">
          Made by :
          <a 
            href="https://github.com/snehhagarwal" 
            className="text-white hover:text-blue-200 ml-1 font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sneha Agarwal
          </a>
        </p>
      </div>
    </div>
  </div>
</footer>
    </div>
  )
}

export default Footer
