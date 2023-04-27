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
            `list${type ? '?type' + type : ''}${
              genre ? '&genre=' + genre : ''
            }`,
          {
            headers: {
              token:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjdkODcwNGE5MmM1NmFhZmFlM2Y0YyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MDQ1NDk2NiwiZXhwIjoxNjgwODg2OTY2fQ.Ul8EKCreMLd43qpAV9dd1Btu1ZKeTkWXv1v3BkJJ5hY',
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
