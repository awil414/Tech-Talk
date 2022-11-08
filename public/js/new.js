const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value.trim();
  const post_body = document
    .querySelector('input[name="post-body"]')
    .value.trim();

  // Send a POST request to the API endpoint
  const response = await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({ title, post_body }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
};

document.querySelector('.new-form').addEventListener('submit', newFormHandler);
