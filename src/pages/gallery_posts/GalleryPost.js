import React from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";

const GalleryPost = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    gallery_comments_count,
    gallery_saves_count,
    gallery_save_id,
    title,
    item_list,
    image,
    updated_at,
    GalleryPostPage,
    setGalleryPosts,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/gallery-posts/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/gallery-posts/${id}/`);
      history.goBack();
    } catch (err) {
      // console.log(err);
    }
  };

  const handleSave = async () => {
    try {
      const { data } = await axiosRes.post("/gallery_saves/", { gallery_post: id });
      setGalleryPosts((prevGalleryPosts) => ({
        ...prevGalleryPosts,
        results: prevGalleryPosts.results.map((gallery_post) => {
          return gallery_post.id === id
            ? { ...gallery_post, gallery_saves_count: gallery_post.gallery_saves_count + 1, gallery_save_id: data.id }
            : gallerypost;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  const handleUnsave = async () => {
    try {
      await axiosRes.delete(`/gallery_saves/${gallery_save_id}/`);
      setGalleryPosts((prevGalleryPosts) => ({
        ...prevGalleryPosts,
        results: prevGalleryPosts.results.map((gallerypost) => {
          return gallerypost.id === id
            ? { ...gallerypost, gallery_saves_count: gallerypost.gallery_saves_count - 1, gallery_save_id: null }
            : gallerypost;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

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
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't save your own post!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : gallery_save_id ? (
            <span onClick={handleUnsave}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleSave}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to save posts!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          {saves_count}
          <Link to={`/galleryposts/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {gallery_comments_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default GalleryPost;