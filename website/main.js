function renderPage(divName, menuItem) {
    // hide any visible content divs
    var contentDivs = document.getElementsByClassName('content');
    for (var i = 0; i < contentDivs.length; i++) {
        if (!contentDivs[i].classList.contains('hidden')) {
            contentDivs[i].classList.add('hidden');
        }
    }

    // make desired div visible
    var target = document.getElementById(divName);
    target.classList.remove('hidden');

    // change menu item background to reflect current selection
    var menuItems = document.getElementsByClassName('menu-item');
    for (var i = 0; i < menuItems.length; i++) {
        menuItems[i].classList.remove('active-task');
    }
    menuItems[menuItem].classList.add('active-task');
}
