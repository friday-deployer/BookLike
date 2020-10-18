import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import Timeline from './Timeline'
import Users from './Users'
import ScrollTop from './ScrollTop'
import Loading from './Loading'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

const UserPageTab = () => {

    const [loginUser, setLoginUser] = useState({})
    const [userReviews, setUserReviews] = useState([])
    const [favoriteReviews, setFavoriteReviews] = useState([])
    const [followingUsers, setFollowingUsers] = useState([])
    const [followedUsers, setFollowedUsers] = useState([])
    const [loading, setLoading] = useState(false)

    const url = window.location.pathname

    useEffect(() => {
        const loadTab = async () => {
            setLoading(true)
            await axios
                .get(`/api${url}`)
                .then(res => {
                    console.log(res)
                    setLoginUser(res.data.loginUser)
                    setUserReviews(res.data.userReviews)
                    setFavoriteReviews(res.data.favoriteReviews)
                    setFollowingUsers(res.data.followingUsers)
                    setFollowedUsers(res.data.followedUsers)

                })
                .catch(err => {
                    console.log(err)
                })
        }
        loadTab()
        setLoading(false)
    }, [])

    return (
        <>
            <Tabs>
                <TabList>
                    <Tab><div className="text-center small px-0">投稿</div></Tab>
                    <Tab><div className="text-center small px-0">いいねした投稿</div></Tab>
                    <Tab><div className="text-center small px-0">フォロー</div></Tab>
                    <Tab><div className="text-center small px-0">フォロワー</div></Tab>
                </TabList>
                <TabPanel>
                    {
                        userReviews.length !== 0 ?
                            <Timeline timelines={userReviews} loginUser={loginUser} />
                            : <div className="pb-5 my-5">投稿はまだありません</div>
                    }
                </TabPanel>
                <TabPanel>
                    {
                        favoriteReviews.length !== 0 ?
                            <Timeline timelines={favoriteReviews} loginUser={loginUser} />
                            : <div className="pb-5 my-5">いいねした投稿はまだありません</div>
                    }
                </TabPanel>
                <TabPanel>
                    {
                        followingUsers.length !== 0 ?
                            <Users users={followingUsers} loginUser={loginUser} />
                            : <div className="pb-5 my-5">フォローしているユーザーはまだいません</div>
                    }
                </TabPanel>
                <TabPanel>
                    {
                        followedUsers.length !== 0 ?
                            <Users users={followedUsers} loginUser={loginUser} />
                            : <div className="pb-5 my-5">フォロワーはまだいません</div>
                    }
                </TabPanel>
                {loading ? <Loading /> : <ScrollTop />}
            </Tabs>
        </>
    )
}

export default UserPageTab

if (document.getElementById('userPageTab')) {
    ReactDOM.render(<UserPageTab />, document.getElementById('userPageTab'))
}
