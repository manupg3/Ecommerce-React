import React from 'react'
import '../assets/css/stylesTextAnimation.css'
import '../assets/css/stylesTextKemi.css'


function TextAnimation({classText,text}) {
  console.log("classtext",classText)
  
  return (
    <div>
   <div class="container-text">
  <div class="row">
    <div class="col-md-12 text-center">
      <h3 className={classText}>{text}</h3>
    </div>
  </div>
</div>

    </div>
  )
}

export default TextAnimation