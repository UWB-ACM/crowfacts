function renderPage(divName) {
    // hide any visible content divs
    var contentDivs = document.getElementsByClassName('content');
    for (var i = 0; i < contentDivs.length; i++) {
        if (!contentDivs[i].classList.contains('hidden')) {
            contentDivs[i].classList.add('hidden');
            // DEBUG ONLY
            console.log('Added hidden: ' + contentDivs[i].outerHTML);
        }
    }
    var target = document.getElementById(divName);
    target.classList.remove('hidden');
}
