import {
  Add,
  PlayArrow,
  ThumbDownAltOutlined,
  ThumbUpAltOutlined,
} from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import './listItem.scss'
import axios from 'axios'
import { Link } from 'react-router-dom'

const ListItem = ({ index, item }) => {
  const [isHover, setIsHover] = useState(false)
  const [movie, setMovie] = useState([])

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_API_URL + 'movies/find/' + item,
          {
            headers: {
              token:
                'Bearer ' +
                JSON.parse(localStorage.getItem('user')).accessToken,
            },
          }
        )
        setMovie(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getMovie()
  }, [item])

  return (
    <Link to={{ pathname: '/watch', movie: movie }}>
      <div
        className='listItem'
        style={{ left: isHover && index * 255 - 50 - index * 25 }}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <img src={movie?.imgSm} alt='' />
        {isHover && (
          <>
            <video src={movie?.trailer} autoPlay={true} loop />
            <div className='itemInfo'>
              <div className='icons'>
                <PlayArrow className='icon' />
                <Add className='icon' />
                <ThumbUpAltOutlined className='icon' />
                <ThumbDownAltOutlined className='icon' />
              </div>
              <div className='itemInfoTop'>
                <span>1 hour 14 mins</span>
                <span className='limit'>+{movie?.limit}</span>
                <span>{movie?.year}</span>
              </div>
              <div className='desc'>{movie?.desc}</div>
              <div className='genre'>{movie?.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  )
}

export default ListItem
