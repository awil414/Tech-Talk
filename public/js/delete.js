// Delete Post
const deleteFormHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
  // event.preventDefault();

  // Selects ONE post to delete
  // const id = window.location.toString().split('/')[
  //   window.location.toString().split('/').length - 1
  // ];

  // Send a PUT request to the API endpoint
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
      // body: JSON.stringify({ post_id }),
      // headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the dashboard page
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('#delete-post-btn')
  .addEventListener('click', deleteFormHandler);
