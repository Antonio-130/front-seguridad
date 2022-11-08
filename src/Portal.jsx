import {useEffect} from 'react'
import ReactDOM from 'react-dom';

const portalRoot = document.getElementById('portal');

export default function Portal(props) {
  const el = document.createElement('div');

  useEffect(() => {
    portalRoot.appendChild(el);
    return () => {
      portalRoot.removeChild(el);
    }
  }, [el])

  const { children } = props;

  return ReactDOM.createPortal(children, el);
}