import Portal from 'Portal'
import 'styles/Modal.css'

export default function Modal({ children, active }) {
  return (
    <Portal>
      {active && (
        <div className='modal-wrapper'>
          <div className='modal-window'>
            <div>
              {children}
            </div>
          </div>
          <div className='modal-background'></div>
        </div>
      )}
    </Portal>
  )
}