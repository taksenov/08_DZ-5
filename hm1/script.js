// Дз 1:
//
// Переделать тестовое задание (аккордеон) с применением делегирования.
//
// Первоначальное тестовое задание:
// http://codepen.io/anon/pen/LRBLgL
//
//
// обработка события клик на заголовок аккордиона
var mainAccordion = document.getElementById('main_accordion')
mainAccordion.addEventListener('click', clickOnHeaderBtn );
// ====

// функция скрывающая или отображающая контент аккордиона, делегирование от родительского mainAccordion
function clickOnHeaderBtn (e) {

    // Закешируем таргет в перменную
    var _this = e.target;

    // Условие учитывающее клик на заголоке аккордиона и смещающее таргет на родительский DIV
    if ( _this.className === 'item_title_block' ) {
        _this = _this.parentNode;
    }
    if ( _this.className === 'accordion__list_item_title--text'
        || _this.className === 'accordion__list_item_title--icon' ) {
        _this = _this.parentNode.parentNode;
    } // ====

    // Основное условие при котором отработает аккордион
    if ( _this.className === 'accordion__list_item_title' ) {
        var computedStyleThisElem = getComputedStyle(_this.nextElementSibling);
        // скрываем весь контент
        var accordionListInners = document.getElementsByClassName('accordion__list_inner');
        function hideAllContent() {
            for(var i = 0; i < accordionListInners.length; i++) {
                accordionListInners[i].style.display = 'none';
            }
        } // ====
        // обработка данных под текущим заголовком
        if ( computedStyleThisElem.display === 'block' ) {
            hideAllContent();
            _this.nextElementSibling.style.display = 'none';
        } else if ( computedStyleThisElem.display === 'none' ) {
            hideAllContent();
            _this.nextElementSibling.style.display = 'block';
        } // ====
    } // ====

};
// ====
