var Calculator = /** @class */ (function () {
    function Calculator(rootElement) {
        this.rootElement = rootElement;
        this.KEYS = [
            ['AC', '÷'],
            [7, 8, 9, '×'],
            [4, 5, 6, '-'],
            [1, 2, 3, '+'],
            [0, '.', '=']
        ];
        this.NUMERI = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
        this.OPERATORI = ['÷', '×', '+', '-'];
        this.UGUALE = '=';
        this.CANCELLA = 'AC';
        this.x = '';
        this.y = '';
        this.operatoreSelezionato = '';
        this.risultatoDaMostrare = '';
    }
    Calculator.prototype.create = function () {
        this.createCalculatorContainer();
        this.createDecorator();
        this.createResultDisplayContainer();
        this.createResultDisplayElement();
        this.createButtons();
        this.addEventListener();
    };
    Calculator.prototype.createCalculatorContainer = function () {
        this.calcolatrice = this.createElement('div');
        this.addClass(this.calcolatrice, 'calculator');
        this.rootElement.prepend(this.calcolatrice);
    };
    Calculator.prototype.createDecorator = function () {
        var dot = this.createElement('div');
        var container = this.createElement('div');
        this.addClass(dot, 'dot');
        this.addClass(container, 'decorator');
        container.appendChild(dot);
        this.calcolatrice.appendChild(container);
    };
    Calculator.prototype.createResultDisplayContainer = function () {
        this.mostraCont = this.createElement('div');
        this.addClass(this.mostraCont, 'display');
        this.calcolatrice.appendChild(this.mostraCont);
    };
    Calculator.prototype.createResultDisplayElement = function () {
        this.risultato = this.createElement('div');
        this.addClass(this.risultato, 'result');
        this.risultato.textContent = '0';
        this.mostraCont.appendChild(this.risultato);
    };
    Calculator.prototype.createButtons = function () {
        var _this = this;
        this.KEYS.forEach(function (rowKeys) {
            var row = _this.createElement('div');
            _this.addClass(row, 'row');
            _this.calcolatrice.appendChild(row);
            rowKeys.forEach(function (key) {
                var button = _this.createElement('div');
                _this.addClass(button, 'button');
                button.textContent = "".concat(key);
                row.appendChild(button);
            });
        });
    };
    Calculator.prototype.addEventListener = function () {
        var _this = this;
        this.calcolatrice.addEventListener('click', function (event) {
            var target = event.target;
            var className = target.className;
            if (className === 'button') {
                var key = target.textContent;
                if (_this.NUMERI.indexOf(key) > -1) {
                    if (!_this.operatoreSelezionato) {
                        _this.x += key;
                        _this.updateResult(_this.x);
                    }
                    else {
                        _this.y += key;
                        _this.updateResult(_this.y);
                    }
                }
                else if (_this.OPERATORI.indexOf(key) > -1) {
                    if (_this.x === '' && _this.y === '') {
                        _this.x = '0';
                        _this.operatoreSelezionato = key;
                    }
                    else if (_this.x !== '' && _this.y === '') {
                        _this.operatoreSelezionato = key;
                    }
                    else if (_this.x !== '' && _this.y !== '') {
                        _this.risultatoDaMostrare = _this.excuteAlgorithm();
                        _this.updateResult(_this.risultatoDaMostrare);
                        _this.x = _this.risultatoDaMostrare;
                        _this.y = '';
                        _this.operatoreSelezionato = key;
                    }
                }
                else if (_this.UGUALE === key) {
                    if (_this.x !== '' && _this.y === '') {
                        _this.risultatoDaMostrare = _this.x;
                        _this.updateResult(_this.risultatoDaMostrare);
                    }
                    else if (_this.x === '' && _this.y === '') {
                        _this.risultatoDaMostrare = '0';
                        _this.updateResult(_this.risultatoDaMostrare);
                    }
                    else if (_this.x !== '' && _this.y !== '') {
                        _this.risultatoDaMostrare = _this.excuteAlgorithm();
                        _this.updateResult(_this.risultatoDaMostrare);
                        _this.x = _this.risultatoDaMostrare;
                        _this.y = '';
                        _this.operatoreSelezionato = '';
                    }
                }
                else if (_this.CANCELLA === key) {
                    _this.x = '';
                    _this.y = '';
                    _this.operatoreSelezionato = '';
                    _this.risultatoDaMostrare = '';
                    _this.updateResult('0');
                }
            }
        });
    };
    Calculator.prototype.updateResult = function (result) {
        this.risultato.textContent = result;
    };
    Calculator.prototype.excuteAlgorithm = function () {
        switch (this.operatoreSelezionato) {
            case '+':
                return "".concat(Number(this.x) + Number(this.y));
            case '-':
                return "".concat(Number(this.x) - Number(this.y));
            case '×':
                return "".concat(Number(this.x) * Number(this.y));
            case '÷':
                return "".concat(Number(this.x) / Number(this.y));
        }
    };
    Calculator.prototype.createElement = function (tag) {
        return document.createElement(tag);
    };
    Calculator.prototype.addClass = function (target, className) {
        target.classList.add(className);
    };
    return Calculator;
}());
