import React from 'react'
import { Dimmer, Loader, Image } from 'semantic-ui-react'

const Loading = () => (
  <div>
      <Dimmer active inverted>
        <Loader size='large' inverted content='Loading' />
      </Dimmer>
      <Image src='/images/wireframe/short-paragraph.png' />
  </div>
)

export default Loading