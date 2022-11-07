const commentFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the comment
    const comment_text = document.querySelector('input[name="comment_text"]').value.trim();
  
    // Selects ONE comment
    const post_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    // If there are comments, shows the text with the post
    if (comment_text) { 
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ comment_text, post_id }),
            headers: { 'Content-Type': 'application/json' },
        })
    };
    
    // If successful, reload the browser to show the added comment
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  };
  
  document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);
