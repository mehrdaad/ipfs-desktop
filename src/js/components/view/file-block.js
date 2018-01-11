import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import fileExtension from 'file-extension'
import {ipcRenderer, clipboard} from 'electron'

import Button from './button'
import Icon from './icon'

/**
 * Is a File Block.
 *
 * @param {Object} props
 *
 * @prop {String} name - file name
 * @prop {String} date - date when the file was modified/uploaded
 * @prop {String} hash - file's hash in IPFS system
 *
 * @return {ReactElement}
 */
export default function FileBlock (props) {
  const extension = fileExtension(props.name)
  let icon = 'file'
  if (fileTypes[extension]) {
    icon = fileTypes[extension]
  }

  const url = `https://ipfs.io/ipfs/${props.hash}`

  const open = () => {
    ipcRenderer.send('open-url', url)
  }

  const copy = (event) => {
    event.stopPropagation()
    event.preventDefault()
    clipboard.writeText(url)
  }

  return (
    <div className='info-block clickable file' onClick={open}>
      <div className='wrapper'>
        <div className='icon'>
          <Icon name={icon} />
        </div>
        <div>
          <p className='label'>{props.name}</p>
          <p className='info'>{moment(props.date).fromNow()}</p>
        </div>
        { props.uploading &&
          <div className='right'>
            <Icon name='reload' />
          </div>
        }
      </div>

      <div className='button-overlay'>
        <Button text='Copy Link' onClick={copy} />
      </div>
    </div>
  )
}

FileBlock.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
  uploading: PropTypes.bool
}

const fileTypes = {
  png: 'image',
  jpg: 'image',
  tif: 'image',
  tiff: 'image',
  bmp: 'image',
  gif: 'image',
  eps: 'image',
  raw: 'image',
  cr2: 'image',
  nef: 'image',
  orf: 'image',
  sr2: 'image',
  jpeg: 'image',
  mp3: 'music-alt',
  flac: 'music-alt',
  ogg: 'music-alt',
  oga: 'music-alt',
  aa: 'music-alt',
  aac: 'music-alt',
  m4p: 'music-alt',
  webm: 'music-alt',
  mp4: 'video-clapper',
  mkv: 'video-clapper',
  avi: 'video-clapper',
  asf: 'video-clapper',
  flv: 'video-clapper'
}
