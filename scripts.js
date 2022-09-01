function selectTab (tabsContainer, newId) {
    const activeTab = tabsContainer.querySelector('.section__tab_active');

    const newTab = tabsContainer.querySelector(`.section__tab[data-id=${newId}]`);
    const newPanel = tabsContainer.parentElement.parentElement.querySelector(`.section__panel[data-id=${newId}]`);
    const oldPanel = tabsContainer.parentElement.parentElement.querySelector('.section__panel:not(.section__panel_hidden)');

    activeTab.classList.remove('section__tab_active');
    activeTab.setAttribute('aria-selected', 'false');
    activeTab.removeAttribute('tabindex');
    newTab.classList.add('section__tab_active');
    newTab.setAttribute('aria-selected', 'true');
    newTab.setAttribute('tabindex', '0');
    newTab.focus({
        preventScroll: true
    });

    oldPanel.classList.add('section__panel_hidden');
    oldPanel.setAttribute('aria-hidden', 'true');
    newPanel.classList.remove('section__panel_hidden');
    newPanel.setAttribute('aria-hidden', 'false');
}

function handleTabClick(event) {
    if (!event.target.classList.contains('section__tab')) {
        return;
    }

    const tabNode = event.target;
    const tabsContainer = event.currentTarget;

    const newId = tabNode.dataset.id;

    selectTab(tabsContainer, newId);
}

function handleTabKeyDown(event) {
    if (!event.target.classList.contains('section__tab') || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
        return;
    }

    const activeTab = event.currentTarget.querySelector('.section__tab_active');
    const tabs = Array.from(event.currentTarget.querySelectorAll('.section__tab'));
    let index = tabs.indexOf(activeTab);

    if (event.keyCode === 37) {
        if (--index < 0){
            index = tabs.length - 1;
        }
    } else if (event.keyCode === 39) {
        if (++index >= tabs.length) {
            index = 0;
        }
    } else if (event.keyCode === 36) {
        index = 0;
    } else if (event.keyCode === 35) {
        index = tabs.length - 1;
    } else {
        return;
    }

    selectTab(event.currentTarget, tabs[index].dataset.id);
}

function onBurgerClick(event) {
    const headerMenu = event.currentTarget;
    const menuTextNode = headerMenu.querySelector('.header__menu-text');
    const links = headerMenu.parentElement.querySelector('.header__links');

    const isExpandedNow = links.classList.contains("header__links_opened");
    const willExpand = !isExpandedNow;

    headerMenu.setAttribute('aria-expanded', String(willExpand));
    menuTextNode.textContent = willExpand ? 'Закрыть меню' : 'Открыть меню';
    if (isExpandedNow) {
        links.classList.remove('header__links_opened');
    } else {
        links.classList.add('header__links_opened');
    }
    links.classList.add('header__links-toggled');
}
