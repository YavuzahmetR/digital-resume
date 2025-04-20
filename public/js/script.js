$(document).ready(function () {
  $('#contactForm').on('submit', function (e) {
    e.preventDefault();  // Formun sayfayı yenilemesini engelle

    const formData = {
      name: $('input[name="name"]').val(),
      email: $('input[name="email"]').val(),
      subject: $('input[name="subject"]').val(),
      message: $('textarea[name="message"]').val(),
    };

    $.ajax({
      url: '/send',
      method: 'POST',
      data: formData,
      success: function (response) {
        alert('Message sent successfully!');
        $('#contactForm')[0].reset();  // Formu sıfırla
      },
      error: function (error) {
        alert('An error occurred. Please try again.');
      },
    });
  });
});