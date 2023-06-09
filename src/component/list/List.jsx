import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from '@mui/icons-material'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import ListItem from '../listItem/ListItem'
import './list.scss'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'

const List = ({ list }) => {
  const [slideNumber, setSlideNumber] = useState(0)
  const [isMoved, setIsMoved] = useState(false)
  const [clickLimit, setClickLimit] = useState(window.innerWidth / 230)

  const listRef = useRef()

  const handleArrow = (direction) => {
    setIsMoved(true)
    let distance = listRef.current.getBoundingClientRect().x - 50
    if (direction === 'left' && slideNumber > 0) {
      setSlideNumber(slideNumber - 1)
      listRef.current.style.transform = `translateX(${230 + distance}px)`
    } else if (direction === 'right' && slideNumber < 10 - clickLimit) {
      setSlideNumber(slideNumber + 1)
      listRef.current.style.transform = `translateX(${-230 + distance}px)`
    }
  }
  return (
    <div className='list'>
      <Skeleton variant='rectangular' width={210} height={60} />
      <span className='listTitle'>{list.title}</span>
      <div className='wrapper'>
        <ArrowBackIosOutlined
          className='sliderArrow left'
          onClick={() => handleArrow('left')}
          style={{ display: !isMoved && 'none' }}
        />
        <div className='container' ref={listRef}>
          {list?.content.map((item, index) => (
            <ListItem key={item._id} index={index} item={item} />
          ))}
        </div>
        <ArrowForwardIosOutlined
          className='sliderArrow right'
          onClick={() => handleArrow('right')}
        />
      </div>
    </div>
  )
}

export default List
