const editFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the post
    const title = document.querySelector('input[name="title"]').value.trim();
    const post_body = document.querySelector('input[name="post_body"]').value.trim();
    
    // Selects ONE post
    const id = window.location.toString().split('/') [
        window.location.toString().split('/').length - 1 ];
    
      // Send a PUT request to the API endpoint
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, post_body }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the dashboard page
        document.location.replace('/dashboard/');
      } else {
        alert(response.statusText);
      }
    }

document
.querySelector('.edit-form')
.addEventListener('submit', editFormHandler);

  
  