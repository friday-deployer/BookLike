import React, { useState, useCallback } from 'react'
import isFollowed from '../functions/isFollowed'

const FollowButton = (props) => {

    const InitialFollowState = isFollowed(props.user, props.loginUser)
    const userId = props.user.id

    const [following, setFollowing] = useState(InitialFollowState)
    const toggleFollow = useCallback(() => setFollowing((prev) => !prev), [setFollowing])

    const PostFollow = (e) => {
        console.log('FollowButton Clicked!')
        e.preventDefault()
        toggleFollow()

        return axios.post(`http://127.0.0.1:8000/api/users/${userId}/follow`)
            .then(res => {
                console.log('Success!')
                console.log(userId)
            })
            .catch(err => {
                console.log('Failure!')
            })
    }

    const DeleteFollow = (e) => {
        console.log('UnFollowButton Clicked!')
        e.preventDefault()
        toggleFollow()

        return axios.post(`http://127.0.0.1:8000/api/users/${userId}/unfollow`)
            .then(res => {
                console.log('Success!')
                console.log(userId)
            })
            .catch(err => {
                console.log('Failure!')
                console.log(err)
                console.log(userId)

            })
    }

    return (
        <>
            {
                following ?
                    <div onClick={DeleteFollow} className="btn-sm btn-blog rounded-pill shadow-sm border-0">フォロー中</div>
                    : <div onClick={PostFollow} className="btn-sm btn-outline-blog rounded-pill shadow-sm border-0">フォローする</div>
            }
        </>
    )
}

export default FollowButton
