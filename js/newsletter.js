document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form.newsletter-inner');
    if (form) {
      form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const email = form.querySelector('input[name="email"]').value;
        
        try {
          const response = await fetch('/api/subscribe-newsletter', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
          });
          
          if (response.ok) {
            alert('Thank you for subscribing to our newsletter!');
            form.reset();
          } else {
            const data = await response.json();
            alert(data.message || 'Failed to subscribe. Please try again.');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('An error occurred. Please try again later.');
        }
      });
    }
  });