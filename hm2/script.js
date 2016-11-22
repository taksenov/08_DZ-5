// Дз 2:
//
// Создать страницу с кнопкой. При клике на кнопку,
//  на странице должен создаваться div
//  произвольных размеров, в произвольном месте.
// Цвет фона div'а должен быть каждый раз случайным.
// Созданные div'ы можно перетаскивать мышкой (drag & drop)

var addNewDivBtn = document.getElementById('add_new_div_btn');
var parentDndBlock = document.getElementById('workspace__board_id');
var minWidth = 50;
var maxWidth = 250;
var minHeigth = 50;
var maxHeigth = 250;

// support functions
function getCoords(elem) {
    // (1)
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    // (2)
    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    // (3)
    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    // (4)
    var top = box.top + scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return {
        top: top,
        left: left
    };
}; // getCoords

/**
 * Ищет нужный класс для выбранного таргета
 * @param  { DOMTokenList collection of the class attributes} classList коллекция всех классов элемента
 * @param  {string} findedClass искомый класс
 * @return {boolean}             если класс найден то true иначе false
 */
function findNeedClassName(classList, findedClass) {
    if ( classList.length !== 0 ) {
        for (let i=0; i < classList.length; i++ ) {
            if (classList[i] === findedClass ) {
                return true;
            }
        }
    }
    return false;
} //findNeedClassName

// Возвращает случайное целое число между min (включительно) и max (не включая max)
// Использование метода Math.round() даст вам неравномерное распределение!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
} // getRandomInt
function getRandomHexColor() {
  return '#'+Math.floor(Math.random()*16777215).toString(16);
} // getRandomHexColor
// support functions

// handler functions
function showShadows(e) {
    // var _this = this;
    var _this = e.target;
    var needClassName = false;
    needClassName = findNeedClassName(_this.classList, 'dnd_block');
    if ( needClassName && _this.tagName === 'DIV' ) {
        _this.style.WebkitBoxShadow = '0px 0px 44px 10px rgba(71,70,71,0.5)';
        _this.style.MozBoxShadow = '0px 0px 44px 10px rgba(71,70,71,0.5)';
        _this.style.boxShadow = '0px 0px 44px 10px rgba(71,70,71,0.5)';
    }
} // showShadows

function unShowShadows(e) {
    // var _this = this;
    var _this = e.target;
    var needClassName = false;
    needClassName = findNeedClassName(_this.classList, 'dnd_block');
    // console.log('tagName',_this.tagName);
    // console.log('className',_this.className);

    if ( needClassName && _this.tagName === 'DIV' ) {
        _this.style.WebkitBoxShadow = '';
        _this.style.MozBoxShadow = '';
        _this.style.boxShadow = '';
    }
} // unShowShadows

function dragAndDropBlock(e, parent) {

    // Закешируем таргет в перменную
    var _this = e.target;
    var needClassName = false;
    needClassName = findNeedClassName(_this.classList, 'dnd_block');

    // Основное условие при котором отработает аккордион
    if ( needClassName && _this.tagName === 'DIV' ) {
        var coords = getCoords(_this);
        var shiftX = e.pageX - coords.left;
        var shiftY = e.pageY - coords.top;

        _this.style.position = 'absolute';

        parent.appendChild(_this);
        // moveAt(e);
        moveAt(_this);

        _this.style.zIndex = 1000; // над другими элементами

        function moveAt(e) {
            _this.style.left = e.pageX - shiftX + 'px';
            _this.style.top = e.pageY - shiftY + 'px';
        }

        document.onmousemove = function(e) {
            moveAt(e);
        };

        _this.onmouseup = function() {
            document.onmousemove = null;
            _this.onmouseup = null;
        };
        _this.ondragstart = function() {
            return false;
        };
    }


} //dragAndDropBlock

function addNewDiv(e, parent) {
    var _this = this;
    var newDiv = document.createElement('div');
    newDiv.className = 'dnd_block';
    newDiv.style.height = getRandomInt(minHeigth, maxHeigth) + 'px';
    newDiv.style.width = getRandomInt(minWidth, maxWidth) + 'px';
    newDiv.style.top = getRandomInt(50, 600) + 'px';
    newDiv.style.left = getRandomInt(50, 1200) + 'px';
    newDiv.style.backgroundColor = getRandomHexColor();
    newDiv.style.zIndex = 20;
    parent.appendChild(newDiv);
} // addNewDiv

// handler functions

// event listeners
parentDndBlock.addEventListener('mousedown',function(e) { dragAndDropBlock(e, parentDndBlock) } );
parentDndBlock.addEventListener('mouseover',showShadows);
parentDndBlock.addEventListener('mouseout',unShowShadows);
addNewDivBtn.addEventListener('click',function(e) { addNewDiv(e, parentDndBlock) });
// event listeners
