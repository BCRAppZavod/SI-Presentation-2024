function goToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function goToBottom() { 
    window.scrollTo(0, document.body.scrollHeight);
}