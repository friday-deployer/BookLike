import React, { useCallback } from 'react'
import FollowButton from './FollowButton'
import FollowerCount from './FollowerCount'
import TotalFavoritesCount from './TotalFavoritesCount'
import ReviewsCount from './ReviewsCount'
import { isFollowed } from '../../functions/isFollowed'
import { omittedText } from '../../functions/omittedText'
import { STORAGE } from '../../constants'

const Users = (props) => {

    const { users, loginUser, maxTextLength } = props
    const isFollowedClassName = "text-secondary mr-1 mr-sm-2 mr-md-3 mr-lg-4"
    const notLoginUser = useCallback(() => (user.id === loginUser) ? false : true)

    return (
        <>
            {maxTextLength && (users.map((user) =>
                <div className="card mb-3 shadow-sm" key={user.id}>
                    <div className="card-haeder pt-3 px-3 pb-0 d-flex flex-row justify-content-end">
                        {/* フォローされているかどうか */}
                        {isFollowed(loginUser, user) && <div className={isFollowedClassName}><i className="far fa-laugh"></i>フォローされています</div>}
                        {/* フォローボタン */}
                        {notLoginUser && <FollowButton user={user} loginUser={loginUser} />}
                    </div>
                    <div className="mx-3 pt-2 pb-3 d-flex border-bottom">
                        <a href={`/users/${user.id}`}>
                            <img src={`${STORAGE}/${user.profile_image}`} className="rounded-circle shadow-sm" width="48" height="48" />
                        </a>
                        <div className="ml-2 px-0 flex-column">
                            <p className="mb-0">{user.name || user.screen_name}</p>
                            <span className="text-secondary small font-weight-lighter">{user.screen_name}</span>
                        </div>
                        <div className="px-0 d-sm-inline-flex ml-auto text-right">
                            <div className="mt-1 count">
                                <ReviewsCount user={user} />
                            </div>
                            <div className="mt-1 ml-sm-4 count">
                                <FollowerCount user={user} />
                            </div>
                            <div className="mt-1 ml-sm-4 count">
                                <TotalFavoritesCount user={user} favorites_count={user.favorites_count} />
                            </div>
                        </div>
                    </div>
                    <div className="px-3 pt-3 flex-column">
                        <a href={`/users/${user.id}`} className="text-reset internal-link">
                            <div className="flex-column">
                                <span className="font-weight-bold">好きなジャンル</span>
                                <p>{user.category}</p>
                            </div>
                            <div className="flex-column">
                                <span className="font-weight-bold">自己紹介</span>
                                <p>{omittedText(user.description, maxTextLength)}</p>
                            </div>
                        </a>
                    </div>
                </div>
            ))
            }
        </>
    )
}

export default Users
