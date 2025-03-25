import React, { useState } from 'react'
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react'

const ArtVistasPage = () => {
  const [email, setEmail] = useState('')
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleContactFormChange = (e) => {
    const { name, value } = e.target
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add form submission logic here
    console.log('Form submitted', contactForm)
  }

  return (
    <div className="bg-white text-black">
      {/* Visitor Information Section */}
      <section className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Visitor Information</h1>
        <p className="mb-8">Everything you need to know about experiencing ArtVistas, whether virtually or at our physical locations.</p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Virtual Access */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              </svg>
              Virtual Access
            </h2>
            <h3 className="font-bold">Virtual Tour Hours</h3>
            <p>Our virtual exhibits are accessible 24/7 from anywhere in the world.</p>
            
            <h3 className="font-bold mt-4">System Requirements</h3>
            <ul className="list-disc pl-5">
              <li>Modern web browser (Chrome, Firefox, Safari, Edge)</li>
              <li>Stable internet connection (minimum 5 Mbps)</li>
              <li>Desktop, laptop, tablet, or smartphone</li>
              <li>For VR experiences: Compatible headset (Oculus, HTC Vive)</li>
            </ul>
            
            <h3 className="font-bold mt-4">Membership Benefits</h3>
            <ul className="list-disc pl-5">
              <li>Exclusive access to limited exhibitions</li>
              <li>Private virtual curator tours</li>
              <li>Artist interview archives</li>
              <li>High-resolution downloads of select artworks</li>
            </ul>
            
            <button className="mt-6 w-full bg-black text-white py-2 rounded hover:bg-gray-800">
              Join Our Digital Membership
            </button>
          </div>
          
          {/* Physical Locations */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              Physical Locations
            </h2>
            
            <div className="mb-4">
              <h3 className="font-bold">New York Gallery</h3>
              <p>525 West 22nd Street, New York, NY 10011</p>
              <p>Tuesday - Sunday: 10 AM - 6 PM</p>
            </div>
            
            <div className="mb-4">
              <h3 className="font-bold">London Exhibition Center</h3>
              <p>12 Regent Street, London, W1 5TF</p>
              <p>Monday - Saturday: 9 AM - 5 PM</p>
            </div>
            
            <div>
              <h3 className="font-bold">Tokyo Experience Lab</h3>
              <p>3-chome 10-11 Nagama, Minato City, Tokyo</p>
              <p>Wednesday - Monday: 11 AM - 7 PM</p>
            </div>
            
            <button className="mt-6 w-full bg-black text-white py-2 rounded hover:bg-gray-800">
              Plan Your Visit
            </button>
          </div>
          
          {/* FAQ Section */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-bold">How do I access the virtual exhibitions?</h3>
                <p>Simply create a free account and log in to explore our virtual galleries from any device with an internet connection.</p>
              </div>
              
              <div>
                <h3 className="font-bold">Can I download the artwork images?</h3>
                <p>Digital members can download selected high-resolution images for personal, non-commercial use.</p>
              </div>
              
              <div>
                <h3 className="font-bold">Are guided tours available?</h3>
                <p>Yes! We offer both scheduled and on-demand virtual guided tours with our expert curators.</p>
              </div>
              
              <div>
                <h3 className="font-bold">How do I set up VR for the best experience?</h3>
                <p>Connect your compatible VR headset and select the VR Mode option in our navigation menu.</p>
              </div>
            </div>
            
            <button className="mt-6 w-full bg-black text-white py-2 rounded hover:bg-gray-800">
              View All FAQs
            </button>
          </div>
        </div>
      </section>
      
      {/* Interactive Map and Contact Section */}
      <section className="container mx-auto px-4 py-12 grid md:grid-cols-2 gap-8">
        <div className="bg-gray-200 h-96 flex items-center justify-center">
          <span className="text-gray-500">Interactive Map</span>
          <button className="absolute bg-black text-white px-4 py-2 rounded">
            Explore Interactive Map
          </button>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={contactForm.name}
              onChange={handleContactFormChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              value={contactForm.email}
              onChange={handleContactFormChange}
              className="w-full p-2 border rounded"
            />
            <select
              name="subject"
              value={contactForm.subject}
              onChange={handleContactFormChange}
              className="w-full p-2 border rounded"
            >
              <option>Select a subject</option>
              <option>General Inquiry</option>
              <option>Technical Support</option>
              <option>Membership</option>
            </select>
            <textarea
              name="message"
              placeholder="Your message"
              value={contactForm.message}
              onChange={handleContactFormChange}
              className="w-full p-2 border rounded h-32"
            ></textarea>
            <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
              Send Message
            </button>
          </form>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="bg-black text-white py-12">
        <div className="container mx-auto px-4 grid md:grid-cols-2 items-center gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Stay Connected</h2>
            <p>Subscribe to our newsletter for exhibition updates, artist features, and exclusive virtual events.</p>
            <div className="mt-6 flex">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow p-2 text-black"
              />
              <button className="bg-white text-black px-4 py-2 ml-2">
                Subscribe
              </button>
            </div>
          </div>
          <div className="bg-gray-700 h-64 flex items-center justify-center">
            <span className="text-gray-400">Newsletter Image</span>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">ArtVistas</h3>
            <p>Bringing art and culture to global audiences through immersive virtual experiences that transcend physical boundaries.</p>
            <div className="flex space-x-4 mt-4">
              <Facebook size={24} />
              <Twitter size={24} />
              <Instagram size={24} />
              <Linkedin size={24} />
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Collections', 'Virtual Tour', 'Artists', 'Exhibitions', 'Gallery', 'Visit'].map(link => (
                <li key={link}>{link}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              {['Help Center', 'System Requirements', 'Technical Support', 'Privacy Policy', 'Terms of Service', 'Cookie Settings'].map(link => (
                <li key={link}>{link}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Contact Us</h3>
            <p>525 West 22nd Street</p>
            <p>New York, NY 10011</p>
            <p>+1 (212) 555-9876</p>
            <p>info@artvistas.com</p>
            
            <div className="mt-4">
              <h4 className="font-bold mb-2">Subscribe to our Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-grow p-2 text-black"
                />
                <button className="bg-white text-black px-4 py-2 ml-2">
                  Sign Up
                </button>
              </div>
            </div>
            
            <div className="flex space-x-4 mt-4">
              <Instagram size={24} />
              <Youtube size={24} />
              <Facebook size={24} />
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 mt-8 text-center border-t border-gray-800 pt-4">
          <p>© 2023 ArtVistas. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="text-sm">Privacy Policy</a>
            <a href="#" className="text-sm">Terms of Service</a>
            <a href="#" className="text-sm">Cookie Policy</a>
            <a href="#" className="text-sm">Accessibility</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ArtVistasPage