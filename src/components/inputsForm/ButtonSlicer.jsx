import React, {useState} from 'react'
import 'styles/Form.css';

export default function ButtonSlicer({fisrtSection, secondSection}) {

  const [textSlicer, setTextSlicer] = useState(`${secondSection} ➡`);

  const handleToggleSection = () => {
    const $ = document.querySelector.bind(document);
    $('.checkboxGroup-container').classList.toggle('active');
    $('.form-container').classList.toggle('active-scale');
    $('.form-container').classList.toggle('inactive');
    if (textSlicer === `${secondSection} ➡`) {
      setTextSlicer(`⬅ ${fisrtSection}`);
    } else {
      setTextSlicer(`${secondSection} ➡`);
    }
  }

  return (
    <button
      type='button'
      onClick={handleToggleSection}
      className='btn-slicer'
    >
      {textSlicer}
    </button>
  )
}
