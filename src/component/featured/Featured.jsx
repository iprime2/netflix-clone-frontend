import React, { useEffect, useState } from 'react'
import './featured.scss'
import { PlayArrow, InfoOutlined } from '@mui/icons-material'
import axios from 'axios'

const Featured = ({ type }) => {
  const [content, setContent] = useState({})

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_API_URL + `movies/random?type=${type}`,
          {
            headers: {
              token:
                'Bearer ' +
                JSON.parse(localStorage.getItem('user')).accessToken,
            },
          }
        )
        console.log(res)
        setContent(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getRandomContent()
  }, [type])

  console.log(content)
  return (
    <div className='featured'>
      {type && (
        <div className='category'>
          <span>{type === 'movies' ? 'Movies' : 'Series'}</span>
          <select name='genre' id='genre'>
            <option>Genre</option>
            <option value='adventure'>Adventure</option>
            <option value='comedy'>Comedy</option>
            <option value='crime'>Crime</option>
            <option value='fantasy'>Fantasy</option>
            <option value='historical'>Historical</option>
            <option value='horror'>Horror</option>
            <option value='romance'>Romance</option>
            <option value='sci-fi'>Sci-fi</option>
            <option value='thriller'>Thriller</option>
            <option value='western'>Western</option>
            <option value='animation'>Animation</option>
            <option value='drama'>Drama</option>
            <option value='documentary'>Documentary</option>
          </select>
        </div>
      )}
      <img width='100%' src={content[0]?.img} alt='' />
      <div className='info'>
        <span className='title'>{content[0]?.title}</span>
        <span className='desc'>{content[0]?.desc}</span>
        <div className='buttons'>
          <button className='play'>
            <PlayArrow />
            <span>Play</span>
          </button>
          <button className='more'>
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Featured
