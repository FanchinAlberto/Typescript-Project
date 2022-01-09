class Calculator {
  constructor(private rootElement: HTMLElement) {}
  private readonly KEYS: Array<Array<number | string>> = [
    ['AC', '÷'],
    [7, 8, 9, '×'],
    [4, 5, 6, '-'],
    [1, 2, 3, '+'],
    [0, '.', '=']
  ];
  private readonly NUMERI: Array<string> = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
  private readonly OPERATORI: Array<string> = ['÷', '×', '+', '-'];
  private readonly UGUALE: string = '=';
  private readonly CANCELLA: string = 'AC';
  private calcolatrice: HTMLElement;
  private mostraCont: HTMLElement;
  private risultato: HTMLElement;
  private x: string = '';
  private y: string = '';
  private operatoreSelezionato: string = '';
  private risultatoDaMostrare: string = '';

  public create(): void {
    this.createCalculatorContainer();
    this.createDecorator();
    this.createResultDisplayContainer();
    this.createResultDisplayElement();
    this.createButtons();
    this.addEventListener();
  }
  private createCalculatorContainer(): void {
    this.calcolatrice = this.createElement('div');
    this.addClass(this.calcolatrice, 'calculator');
    this.rootElement.prepend(this.calcolatrice);
  }
  private createDecorator(): void {
    const dot: HTMLElement = this.createElement('div');
    const container: HTMLElement = this.createElement('div');
    this.addClass(dot, 'dot');
    this.addClass(container, 'decorator');
    container.appendChild(dot);
    this.calcolatrice.appendChild(container);
  }
  private createResultDisplayContainer(): void {
    this.mostraCont = this.createElement('div');
    this.addClass(this.mostraCont, 'display');
    this.calcolatrice.appendChild(this.mostraCont);
  }
  private createResultDisplayElement(): void {
    this.risultato = this.createElement('div');
    this.addClass(this.risultato, 'result');
    this.risultato.textContent = '0';
    this.mostraCont.appendChild(this.risultato);
  }
  private createButtons(): void {
    this.KEYS.forEach((rowKeys: Array<string | number>) => {
      const row: HTMLElement = this.createElement('div');
      this.addClass(row, 'row');
      this.calcolatrice.appendChild(row);
      rowKeys.forEach((key: string | number) => {
        const button: HTMLElement = this.createElement('div');
        this.addClass(button, 'button');
        button.textContent = `${key}`;
        row.appendChild(button);
      });
    });
  }
  private addEventListener(): void {
    this.calcolatrice.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const { className } = target;
      if (className === 'button') {
        const key: string = target.textContent;
        if (this.NUMERI.indexOf(key) > -1) {
          if (!this.operatoreSelezionato) {
            this.x += key;
            this.updateResult(this.x);
          } else {
            this.y += key;
            this.updateResult(this.y);
          }
        } else if (this.OPERATORI.indexOf(key) > -1) {
          if (this.x === '' && this.y === '') {
            this.x = '0';
            this.operatoreSelezionato = key;
          } else if (this.x !== '' && this.y === '') {
            this.operatoreSelezionato = key;
          } else if (this.x !== '' && this.y !== '') {
            this.risultatoDaMostrare = this.excuteAlgorithm();
            this.updateResult(this.risultatoDaMostrare);
            this.x = this.risultatoDaMostrare;
            this.y = '';
            this.operatoreSelezionato = key;
          }
        } else if (this.UGUALE === key) {
          if (this.x !== '' && this.y === '') {
            this.risultatoDaMostrare = this.x;
            this.updateResult(this.risultatoDaMostrare);
          } else if (this.x === '' && this.y === '') {
            this.risultatoDaMostrare = '0';
            this.updateResult(this.risultatoDaMostrare);
          } else if (this.x !== '' && this.y !== '') {
            this.risultatoDaMostrare = this.excuteAlgorithm();
            this.updateResult(this.risultatoDaMostrare);
            this.x = this.risultatoDaMostrare;
            this.y = '';
            this.operatoreSelezionato = '';
          }
        } else if (this.CANCELLA === key) {
          this.x = '';
          this.y = '';
          this.operatoreSelezionato = '';
          this.risultatoDaMostrare = '';
          this.updateResult('0');
        }
      }
    });
  }
  private updateResult(result: string): void {
    this.risultato.textContent = result;
  }
  private excuteAlgorithm(): string {
    switch (this.operatoreSelezionato) {
      case '+':
        return `${Number(this.x) + Number(this.y)}`;
      case '-':
        return `${Number(this.x) - Number(this.y)}`;
      case '×':
        return `${Number(this.x) * Number(this.y)}`;
      case '÷':
        return `${Number(this.x) / Number(this.y)}`;
    }
  }
  private createElement(tag: string): HTMLElement {
    return document.createElement(tag);
  }
  private addClass(target: HTMLElement, className: string): void {
    target.classList.add(className);
  }
}
