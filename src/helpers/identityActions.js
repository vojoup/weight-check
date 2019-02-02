import netlifyIdentity from 'netlify-identity-widget';

export function loginUser() {
  if (netlifyIdentity && netlifyIdentity.currentUser()) {
    const {
      app_metadata: appMetadata,
      created_at: createdAt,
      confirmed_at: confirmedAt,
      email,
      id,
      user_metadata: userMetadata,
    } = netlifyIdentity.currentUser();

    localStorage.setItem(
      'currentUser',
      JSON.stringify({
        ...appMetadata,
        createdAt,
        confirmedAt,
        email,
        id,
        ...userMetadata,
      })
    );
  }
}

export function logoutUser() {
  localStorage.removeItem('currentUser');
}
