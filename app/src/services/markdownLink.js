import React from 'react'

function prepareMarkdownLink(text: string, target = '_blank') {
  const matcher = text.match(/(?:__|[(*#)])|\[(.*?)\]\((.*)?\)/)

  if(!matcher) return text

  return (
    <a 
      href={matcher[2]} 
      target={target}
    >
      {matcher[1]}
    </a>
  )
}

export default prepareMarkdownLink
