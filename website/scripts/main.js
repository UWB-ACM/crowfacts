function renderPage(divName, menuItem) {
    // hide any visible content divs
    var contentDivs = document.getElementsByClassName('content');
    Array.from(contentDivs).forEach(contentDiv => {
        if (!contentDiv.classList.contains('hidden')) {
            contentDiv.classList.add('hidden');
        }
    });

    // make desired div visible
    var target = document.getElementById(divName);
    target.classList.remove('hidden');

    // change menu item background to reflect current selection
    var menuItems = document.getElementsByClassName('menu-item');
    Array.from(menuItems).forEach(menuItem => {
        menuItem.classList.remove('active-task');
    });
    menuItems[menuItem].classList.add('active-task');
}
