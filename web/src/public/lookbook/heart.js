const heartIcon = document.querySelector('.heart-icon');

heartIcon.addEventListener('click', function() {
    heartIcon.classList.add('pop');

    // Remove the pop class after the animation ends
    setTimeout(() => {
        heartIcon.classList.remove('pop');
    }, 300);
});