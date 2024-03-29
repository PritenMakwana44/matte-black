import React, { useState } from 'react'
import Media from 'react-bootstrap/Media'
import { Link } from 'react-router-dom'
import Avatar from '../../components/Avatar'
import { MoreDropdown } from '../../components/MoreDropdown'
import GalleryCommentEditForm from './GalleryCommentEditForm'
import styles from '../../styles/GalleryComment.module.css'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import { axiosRes } from '../../api/axiosDefaults'

const GalleryComment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    id,
    setGalleryPost,
    setGalleryComments
  } = props

  const [showEditForm, setShowEditForm] = useState(false)
  const currentUser = useCurrentUser()
  const is_owner = currentUser?.username === owner

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/gallerycomments/${id}/`)
      setGalleryPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            gallery_comments_count: prevPost.results[0].gallery_comments_count - 1
          }
        ]
      }))

      setGalleryComments((prevGalleryComments) => ({
        ...prevGalleryComments,
        results: prevGalleryComments.results.filter((gallerycomment) => gallerycomment.id !== id)
      }))
    /*eslint no-empty: "error"*/
    } catch (err) {
      // empty
    }
  }

  return (
    <>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
          {showEditForm
            ? (
            <GalleryCommentEditForm
              id={id}
              profile_id={profile_id}
              content={content}
              profileImage={profile_image}
              setGalleryComments={setGalleryComments}
              setShowEditForm={setShowEditForm}
            />
              )
            : (
            <p>{content}</p>
              )}
        </Media.Body>
        {is_owner && !showEditForm && (
          <MoreDropdown
            handleEdit={() => setShowEditForm(true)}
            handleDelete={handleDelete}
          />
        )}
      </Media>
    </>
  )
}

export default GalleryComment
