import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import GalleryPost from "./GalleryPost";
import GalleryComment from "../gallerycomments/GalleryComment";

import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";

function GalleryPostPage() {
  const { id } = useParams();
  const [gallerypost, setGalleryPost] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [gallerycomments, setGalleryComments] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: gallerypost }, { data: gallerycomments }] = await Promise.all([
          axiosReq.get(`/galleryposts/${id}`),
          axiosReq.get(`/gallery_comments/?gallerypost=${id}`),
        ]);
        setGalleryPost({ results: [gallerypost] });
        setGalleryComments(gallerycomments);
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <GalleryPost {...gallerypost.results[0]} setGalleryPosts={setGalleryPost} GalleryPostPage />
        <Container className={appStyles.Content}>
          {currentUser ? (
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              gallerypost={id}
              setGalleryPost={setGalleryPost}
              setGalleryComments={setGalleryComments}
            />
          ) : gallerycomments.results.length ? (
            "GalleryComments"
          ) : null}
          {gallerycomments.results.length ? (
            <InfiniteScroll
              children={gallerycomments.results.map((gallerycomment) => (
                <GalleryComment
                  key={gallerycomment.id}
                  {...gallerycomment}
                  setPost={setGalleryPost}
                  setGalleryComments={setGalleryComments}
                />
              ))}
              dataLength={gallerycomments.results.length}
              loader={<Asset spinner />}
              hasMore={!!gallerycomments.next}
              next={() => fetchMoreData(gallerycomments, setGalleryComments)}
            />
          ) : currentUser ? (
            <span>No comments yet, be the first to comment!</span>
          ) : (
            <span>No comments... yet</span>
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default GalleryPostPage;