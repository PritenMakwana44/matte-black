import React from 'react'
import styles from '../../styles/GalleryPost.module.css'
import { useCurrentUser } from '../../contexts/CurrentUserContext'

import Card from 'react-bootstrap/Card'
import Media from 'react-bootstrap/Media'

import { Link, useHistory } from 'react-router-dom'
import Avatar from '../../components/Avatar'
import { axiosRes } from '../../api/axiosDefaults'
import { MoreDropdown } from '../../components/MoreDropdown'

const GalleryPost = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    gallerycomments_count,
    title,
    item_list,
    image,
    updated_at,
    GalleryPostPage
  } = props

  const currentUser = useCurrentUser()
  const is_owner = currentUser?.username === owner
  const history = useHistory()

  const handleEdit = () => {
    history.push(`/galleryposts/${id}/edit`)
  }

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/galleryposts/${id}/`)
      history.goBack()
    } catch (err) {
      // console.log(err);
    }
  }

  return (
    <Card className={styles.GalleryPost}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && GalleryPostPage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/galleryposts/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {item_list && <Card.Text>{item_list}</Card.Text>}
        <div className={styles.GalleryPostBar}>
          <Link to={`/galleryposts/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {gallerycomments_count}

        </div>
      </Card.Body>
    </Card>
  )
}

export default GalleryPost
