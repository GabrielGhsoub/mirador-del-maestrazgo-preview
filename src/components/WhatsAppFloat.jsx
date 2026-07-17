import './whatsappfloat.css'

/** Floating WhatsApp bubble, bottom right, like the Joinchat widget on their
 *  current site. Desktop only: the mobile bottom CTA bar already has WhatsApp. */
export default function WhatsAppFloat() {
  return (
    <a
      className="wa-float"
      href="https://wa.me/34626298002"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" aria-hidden="true">
        <path d="M12 3.2a8.7 8.7 0 0 0-7.5 13.1L3.2 20.8l4.6-1.2A8.7 8.7 0 1 0 12 3.2Z" stroke="#fff" strokeWidth="1.6" />
        <path d="M8.9 9.4c.1-.5.6-1 1-1 .4 0 .6 0 .8.4l.7 1.4c.1.3 0 .5-.1.7l-.6.6c-.1.2-.1.4 0 .6.5.9 1.6 2 2.5 2.5.2.1.4.1.6 0l.6-.6c.2-.1.4-.2.7-.1l1.4.7c.4.2.4.4.4.8-.1.4-.5.9-1 1-1 .3-1.9.1-3.7-.9-1.5-.8-2.6-1.9-3.4-3.4-1-1.8-1.2-2.7-.9-3.7Z" fill="#fff" />
      </svg>
    </a>
  )
}
