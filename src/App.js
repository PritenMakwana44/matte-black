import styles from './App.module.css'
import './api/axiosDefaults'
import PostCreateForm from './pages/posts/PostCreateForm'
import PostPage from './pages/posts/PostPage'
import PostsPage from './pages/posts/PostsPage'
import { useCurrentUser } from './contexts/CurrentUserContext'
import PostEditForm from './pages/posts/PostEditForm'
import GalleryPostCreateForm from './pages/galleryposts/GalleryPostCreateForm'
import GalleryPostPage from './pages/galleryposts/GalleryPostPage'
import GalleryPostsPage from './pages/galleryposts/GalleryPostsPage'
import GalleryPostEditForm from './pages/galleryposts/GalleryPostEditForm'
import ProfilePage from './pages/profiles/ProfilePage'
import UsernameForm from './pages/profiles/UsernameForm'
import UserPasswordForm from './pages/profiles/UserPasswordForm'
import ProfileEditForm from './pages/profiles/ProfileEditForm'
import NotFound from './components/NotFound'
import ContactForm from './pages/contact/ContactForm'
import Confirmation from './pages/contact/Confirmation'

function App () {
  const currentUser = useCurrentUser()
  const profile_id = currentUser?.profile_id || ''

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <PostsPage message="No results found. Adjust the search keyword." />
            )}
          />
          <Route
            exact
            path="/galleryposts"
            render={() => (
              <GalleryPostsPage message="No results found. Adjust the search keyword." />
            )}
          />
          <Route
            exact
            path="/feed"
            render={() => (
              <PostsPage
                message="No results found. Adjust the search keyword or follow a user."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route
            exact
            path="/saved"
            render={() => (
              <PostsPage
                message="No results found. Adjust the search keyword or save a post."
                filter={`saved__owner__profile=${profile_id}&ordering=-saved__created_at&`}
              />
            )}
          />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/posts/create" render={() => <PostCreateForm />} />
          <Route exact path="/posts/:id" render={() => <PostPage />} />
          <Route exact path="/posts/:id/edit" render={() => <PostEditForm />} />
          <Route exact path="/galleryposts/create" render={() => <GalleryPostCreateForm />} />
          <Route exact path="/galleryposts/:id" render={() => <GalleryPostPage />} />
          <Route exact path="/galleryposts/:id/edit" render={() => <GalleryPostEditForm />} />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <UsernameForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <UserPasswordForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />
          <Route exact path="/contact" render={() => <ContactForm />} />
					<Route exact path="/confirmation" render={() => <Confirmation />} />
          <Route render={() => <NotFound />} />

        </Switch>
      </Container>
    </div>
  )
}

export default App
