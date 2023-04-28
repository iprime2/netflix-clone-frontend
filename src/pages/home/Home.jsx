import React, { useEffect, useState } from 'react'
import './home.scss'
import Navbar from '../../component/navbar/Navbar'
import Featured from '../../component/featured/Featured'
import List from '../../component/list/List'
import axios from 'axios'

const Home = ({ type }) => {
  const [lists, setLists] = useState([])
  const [genre, setGenre] = useState(null)

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_API_URL +
            `lists${type ? '?type' + type : ''}${
              genre ? '&genre=' + genre : ''
            }`,
          {
            headers: {
              token: JSON.parse(localStorage.getItem('user')).accessToken,
            },
          }
        )
        setLists(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    getRandomLists()
  }, [type, genre])

  return (
    <div className='home'>
      <Navbar />
      <Featured type={type} />
      {lists?.map((list) => (
        <List key={list._id} list={list} />
      ))}
    </div>
  )
}

export default Home
